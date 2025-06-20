const fs = require("fs");
const path = require("path");

// 获取命令行参数中的文件路径
const filePath = process.argv[2];

if (!filePath) {
  console.error("请提供文件路径");
  process.exit(1);
}

// 读取文件内容
let content;
try {
  content = fs.readFileSync(filePath, "utf8");
} catch (error) {
  console.error(`读取文件失败: ${error.message}`);
  process.exit(1);
}

// 检测原始文件的换行符类型
const originalLineEnding = content.includes('\r\n') ? '\r\n' : '\n';

// 处理缩进逻辑
function fixIndentation(content, tabSize = 2, initialIndentLevel = 0, lineEnding) {
  const lines = content.split(lineEnding);
  const result = [];

  // 跟踪嵌套级别，从初始级别开始
  let indentLevel = initialIndentLevel;
  // 是否在 style 标签内部
  let inStyle = false;
  // 是否在注释中
  let inComment = false;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // 跳过空行
    if (trimmedLine === "") {
      result.push("");
      continue;
    }

    // 检测是否处于 style 标签内
    if (trimmedLine.match(/<style.*>/)) {
      inStyle = true;
    } else if (trimmedLine === "</style>") {
      inStyle = false;
    }

    // 检测当前行是否是注释
    const isCurrentLineComment = trimmedLine.startsWith("<!--");

    // 检测是否处于多行注释中
    if (isCurrentLineComment && !trimmedLine.includes("-->")) {
      inComment = true;
    } else if (inComment && trimmedLine.includes("-->")) {
      inComment = false;
    }

    // 调整缩进级别 - 减少缩进的情况
    if (
      (trimmedLine.startsWith("}") ||
        trimmedLine.startsWith("</") ||
        trimmedLine === "]" ||
        trimmedLine === ")") &&
      !inComment
    ) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // 应用缩进
    const indent = " ".repeat(indentLevel * tabSize);
    result.push(indent + trimmedLine);

    // 调整缩进级别 - 增加缩进的情况
    // 注意：注释行不应导致缩进增加，但不会阻止下一行的正确缩进
    if (
      !isCurrentLineComment && // 注释本身不增加缩进级别
      (trimmedLine.endsWith("{") ||
        (trimmedLine.includes("<") &&
          !trimmedLine.includes("</") &&
          !trimmedLine.endsWith("/>")) ||
        trimmedLine.endsWith("[") ||
        trimmedLine.endsWith("(")) &&
      !inComment &&
      !trimmedLine.match(/^(if|for|while).*[^{]$/)
    ) {
      indentLevel++;
    }
  }

  return result.join(lineEnding);
}

// 处理不同文件类型
function processFile(filePath, content, lineEnding) {
  const ext = path.extname(filePath);

  // 根据文件类型选择处理方法
  if (ext === ".vue") {
    return fixVueIndentation(content, lineEnding);
  }

  // 默认处理
  return fixIndentation(content, 2, 0, lineEnding);
}

// 特殊处理 Vue 文件中的不同块
function fixVueIndentation(content, lineEnding) {
  let result = content;

  // 使用新方法匹配完整的template块
  // 从<template>开始匹配到<script>之前的所有内容（包括</template>标签）
  const templateToScriptRegex = /(<template>[\s\S]*?)(<script>)/;
  const templateMatch = content.match(templateToScriptRegex);
  
  if (templateMatch && templateMatch[1]) {
    // 提取template内容
    const templateContent = templateMatch[1];
    
    // 对template内容应用缩进修复
    const fixedTemplateContent = fixIndentation(templateContent, 2, 0, lineEnding);
    
    // 替换原内容中的template部分
    result = result.replace(templateContent, fixedTemplateContent);
  }

  // 匹配script块
  const scriptMatch = content.match(/<script>[\s\S]*?<\/script>/);
  if (scriptMatch) {
    // 特殊处理 script 块，使用自定义规则处理 export default {} 内部内容
    const scriptContent = scriptMatch[0];
    const scriptLines = scriptContent.split(lineEnding);

    // 找出 export default { 和结束的 } 的行号
    let exportStartIndex = -1;
    let exportEndIndex = -1;

    for (let i = 0; i < scriptLines.length; i++) {
      const line = scriptLines[i].trim();

      if (line.includes("export default {") || line === "export default {") {
        exportStartIndex = i;
      }

      // 找到与 export default 对应的最后一个 }
      if (exportStartIndex !== -1 && line === "}") {
        exportEndIndex = i;
        // 不立即 break，因为可能有多个结束括号，我们要找最后一个
      }
    }

    // 如果找到了 export default 块
    if (exportStartIndex !== -1 && exportEndIndex !== -1) {
      // 保持 script 开始标签到 export default { 之间内容不变
      const beforeExport = scriptLines
        .slice(0, exportStartIndex + 1)
        .join(lineEnding);

      // 特殊处理 export default {} 内部内容
      const exportInnerLines = scriptLines.slice(
        exportStartIndex + 1,
        exportEndIndex
      );
      const fixedExportInnerLines = fixVueExportDefault(exportInnerLines, lineEnding);

      // 保持 export default {} 之后的内容不变
      const afterExport = scriptLines.slice(exportEndIndex).join(lineEnding);

      // 组合结果
      const fixedScriptContent = `${beforeExport}${lineEnding}${fixedExportInnerLines}${lineEnding}${afterExport}`;
      result = result.replace(scriptContent, fixedScriptContent);
    } else {
      // 如果没找到 export default 块，保持原样
      result = result.replace(scriptContent, scriptContent);
    }
  }

  // 匹配style块
  const styleMatch = content.match(/<style[\s\S]*?<\/style>/);
  if (styleMatch) {
    // 特殊处理 style 块，不缩进第一行内容
    const styleContent = styleMatch[0];
    const styleLines = styleContent.split(lineEnding);

    // 如果只有开始和结束标签，则不需特殊处理
    if (styleLines.length <= 2) {
      const fixed = fixIndentation(styleContent, 2, 0, lineEnding);
      result = result.replace(styleContent, fixed);
    } else {
      // 处理 style 开始标签
      const styleOpenTag = styleLines[0];

      // 处理 style 内容（跳过开始和结束标签）
      const styleInnerContent = styleLines.slice(1, -1).join(lineEnding);
      
      // 对style内容使用fixStyleIndentation函数
      const fixedInnerContent = fixStyleIndentation(styleInnerContent, 2, lineEnding);

      // 处理 style 结束标签
      const styleCloseTag = styleLines[styleLines.length - 1];

      // 组合结果
      const fixedStyleContent = `${styleOpenTag}${lineEnding}${fixedInnerContent}${lineEnding}${styleCloseTag}`;
      result = result.replace(styleContent, fixedStyleContent);
    }
  }

  return result;
}

// 特殊处理 Vue export default {} 内部内容的缩进
function fixVueExportDefault(lines, lineEnding) {
  const result = [];
  const baseIndent = "  "; // export default 内部的基础缩进

  // Vue 顶级配置项和生命周期钩子列表
  const topLevelProps = [
    "name",
    "components",
    "props",
    "data",
    "computed",
    "watch",
    "methods",
    "mixins",
    "provide",
    "inject",
    "model",
    "directives",
    "filters",
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "activated",
    "deactivated",
    "beforeDestroy",
    "destroyed",
    "beforeUnmount",
    "unmounted",
    "errorCaptured",
    "renderTracked",
    "renderTriggered",
    "setup",
  ];

  // 当前正在处理的顶级属性
  let currentTopProp = null;
  // 跟踪嵌套级别
  let nestedLevel = 0;
  // 是否在JSDoc注释中
  let inJSDocComment = false;
  // 存储原始行及其索引，用于找回注释行的原始格式
  const originalLines = lines.map((line, index) => ({ line, index }));

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 跳过空行
    if (line === "") {
      result.push("");
      continue;
    }

    // 新增：如果是 // 注释行，保留原始行的缩进
    if (line.startsWith("//")) {
      // 查找原始行的缩进
      const originalLine = lines[i];
      const indentMatch = originalLine.match(/^(\s*)/);
      const originalIndent = indentMatch ? indentMatch[1] : "";
      result.push(originalIndent + line);
      continue; // 跳过后续处理
    }

    // 检测JSDoc注释
    if (line.startsWith("/**")) {
      inJSDocComment = true;
    }

    // 检查是否是顶级配置项
    const propMatch = line.match(/^(\w+):\s*(?:{|\[|function|\(|\)|,|$)/);
    if (propMatch && topLevelProps.includes(propMatch[1])) {
      currentTopProp = propMatch[1];
      nestedLevel = 0;
      // 顶级配置项应用基础缩进
      result.push(baseIndent + line);

      // 如果行尾有 { 或 [，增加嵌套级别
      if (line.endsWith("{") || line.endsWith("[")) {
        nestedLevel++;
      }
    } else {
      // 处理非顶级配置项行
      let indent = baseIndent;

      // 检测是否是结束括号，减少缩进
      if ((line.startsWith("}") || line.startsWith("]")) && nestedLevel > 0) {
        nestedLevel--;
      }

      // 应用当前嵌套级别的缩进
      if (nestedLevel > 0) {
        indent += "  ".repeat(nestedLevel);
      }

      // 特殊处理JSDoc注释
      if (inJSDocComment) {
        if (line.startsWith("/**")) {
          // 第一行JSDoc注释，正常缩进
          result.push(indent + line);
        } else {
          // JSDoc注释的后续行和结束行，额外增加一个空格
          result.push(indent + " " + line);
        }
      } else {
        // 非JSDoc注释行，正常处理
        result.push(indent + line);
      }

      // 检测是否增加嵌套级别
      if (line.endsWith("{") || line.endsWith("[")) {
        nestedLevel++;
      }
    }
    
    // 检测JSDoc注释结束
    if (inJSDocComment && line.endsWith("*/")) {
      inJSDocComment = false;
    }
  }

  return result.join(lineEnding);
}

// 新增：专门处理样式内容的缩进，确保单行注释正确缩进
function fixStyleIndentation(content, tabSize = 2, lineEnding) {
  const lines = content.split(lineEnding);
  const result = [];

  // 跟踪嵌套级别
  let indentLevel = 0;
  // 跟踪是否在注释中
  let inComment = false;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // 跳过空行
    if (trimmedLine === "") {
      result.push("");
      continue;
    }

    // 检测是否是多行注释的开始或结束
    if (trimmedLine.startsWith("/*") && !trimmedLine.includes("*/")) {
      inComment = true;
    } else if (inComment && trimmedLine.includes("*/")) {
      inComment = false;
    }

    // 检测是否是单行注释
    const isSingleLineComment = trimmedLine.startsWith("//");

    // 调整缩进级别 - 减少缩进
    if (
      trimmedLine.startsWith("}") && 
      !inComment && 
      !isSingleLineComment
    ) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // 应用缩进
    const indent = " ".repeat(indentLevel * tabSize);
    result.push(indent + trimmedLine);

    // 调整缩进级别 - 增加缩进
    if (
      trimmedLine.endsWith("{") && 
      !inComment && 
      !isSingleLineComment
    ) {
      indentLevel++;
    }
  }

  return result.join(lineEnding);
}

// 执行缩进修复
const fixedContent = processFile(filePath, content, originalLineEnding);

// 写回文件
try {
  fs.writeFileSync(filePath, fixedContent, "utf8");
  console.log(`成功修复文件缩进: ${filePath}\n时间：${new Date().toLocaleString()}`);
} catch (error) {
  console.error(`写入文件失败: ${error.message}\n时间：${new Date().toLocaleString()}`);
  process.exit(1);
}
