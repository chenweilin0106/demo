# Git Commit 消息规范

格式：

```text
<type>(<scope>): <subject>
```

说明：

- `type`：变更类型。
- `scope`：改动目录或模块。
- `subject`：具体修改内容概括。

`type` 可选：

- `feat`：新增功能
- `fix`：修复问题
- `init`：初始化
- `docs`：文档更新
- `style`：格式调整
- `refactor`：代码重构
- `perf`：性能优化
- `test`：测试相关
- `revert`：回退变更
- `build`：构建相关
- `chore`：工程杂项
- `ci`：CI 配置

示例：

```text
feat(publish-svn): 支持选择发布配置
fix(publish-svn): 修复路径包含空格时发布失败
init(project): 初始化项目目录结构
docs(git笔记): 补充提交消息规范
style(components): 调整公共样式格式
refactor(components): 简化公共表格组件逻辑
perf(音乐播放器): 优化列表滚动性能
test(2048): 补充移动合并逻辑测试
revert(publish-svn): 回退发布路径调整
build(拖拽指令): 更新构建配置
chore(root): 移除重复的版本配置
ci(douyin): 调整提交校验流程
```
