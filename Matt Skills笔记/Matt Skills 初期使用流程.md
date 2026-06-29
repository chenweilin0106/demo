# Matt Skills 初期使用流程

## 目标

把 Matt Skills 当成工程工具箱：需要时调用，不需要时跳过。

初期只记一条判断主线：

```text
必要时先对齐目标：
grill-me / grill-with-docs

沉淀计划：
to-prd

拆分任务：
to-issues

执行阶段：
tdd

异常时：
diagnose -> tdd
```

`diagnose` 不是固定步骤，只在报错、失败、性能问题、行为不符合预期时切入。

## 初期最简调用模型

```text
必要时先对齐目标：
grill-me
有项目文档作为基础：grill-with-docs

需求变计划：
to-prd

任务拆分：
to-issues

执行阶段：
tdd

执行异常：
diagnose -> tdd
```

## Skill 速查

| Skill | 什么时候用 |
| --- | --- |
| `setup-matt-pocock-skills` | 需要把 PRD 或 issue 接入 tracker 前，初始化 issue tracker、标签、领域文档规则 |
| `grill-me` | 目标不清、范围不清、需要先把问题问准 |
| `grill-with-docs` | 需要结合 `CONTEXT.md`、ADR、项目术语一起讨论方案 |
| `to-prd` | 已经聊清楚目标，需要整理成 PRD 或计划文档 |
| `to-issues` | 把 PRD 或计划拆成可独立执行、可独立验证的任务 |
| `tdd` | 新功能、修 bug、补测试时使用 |
| `diagnose` | bug、报错、失败、性能退化，需要系统排查 |
| `improve-codebase-architecture` | 特殊优化入口：代码难改、难测、结构混乱时使用 |

## 主线拆解

### 1. 先对齐目标：`grill-me` / `grill-with-docs`

需求或范围不清时使用。

作用：

- 明确目标
- 明确范围
- 明确不做什么
- 找出模糊点

选择规则：

- 没有项目文档：用 `grill-me`
- 有 `CONTEXT.md`、ADR、流程文档作为基础：用 `grill-with-docs`

常用提示：

```text
用 $grill-me 先对齐目标，每次只问一个问题，并给推荐答案。
```

### 2. 整理需求：`to-prd`

当目标已经基本清楚，但还需要沉淀成计划时使用。

适合：

- 新功能
- 小项目
- 复杂文档
- 多步骤流程

### 3. 拆分任务：`to-issues`

PRD 完成后，用 `to-issues` 拆成可执行任务。

核心原则：

- 拆成垂直切片
- 每个任务能独立执行
- 每个任务能独立验证

### 4. 正式实现：`tdd`

任务拆分完成后，用 `tdd` 开始正式实现。

```text
grill-me / grill-with-docs -> to-prd -> to-issues -> tdd
```

流程含义：

- `grill-me` 负责在目标不清时对齐需求、范围和不做什么
- `grill-with-docs` 负责结合项目文档、术语和 ADR 对齐方案
- `to-prd` 负责把目标固化成计划
- `to-issues` 负责把 PRD 拆成可执行任务
- `tdd` 负责先定义验收点，再实现，再验证

文档任务里的 `tdd` 不一定写测试文件。

### 5. 排查问题：`diagnose`

任何阶段执行异常时切换到 `diagnose`，定位清楚后再用 `tdd` 修复和验证。

适合：

- bug
- 报错
- 测试失败
- 性能变慢
- 结果和预期不一致

核心流程：

```text
复现 -> 缩小范围 -> 提假设 -> 加探针 -> 修复 -> 回归测试
```

## 常见场景

### 场景 1：执行现有流程文档

推荐流程：

```text
必要时 grill-me -> to-prd -> to-issues -> tdd
异常时 -> diagnose -> tdd
```

使用方式：

1. 先让 AI 读取流程文档。
2. 如果流程清楚，直接执行。
3. 如果目标或边界不清，先用 `grill-me` 对齐。
4. 如果执行失败，切到 `diagnose`。

### 场景 2：开发新功能

推荐流程：

```text
必要时 grill-me / grill-with-docs -> to-prd -> to-issues -> tdd
```

### 场景 3：修复 bug

推荐流程：

```text
diagnose -> tdd
```

大范围修复：

```text
diagnose -> to-prd -> to-issues -> tdd
```

重点：

- 先复现，不先猜原因。
- `diagnose` 已包含复现、分析、定位和修复计划。
- 范围很大时，再补 `to-prd -> to-issues`。
- 能写回归测试就先写。
- 修完后用原复现路径验证。

### 场景 4：优化重构/架构

推荐流程：

```text
improve-codebase-architecture -> grill-with-docs -> to-prd -> to-issues -> tdd
```

适合：

- 代码难理解
- 改一个点影响很多地方
- 测试不好写
- 模块边界不清

小重构可以直接：

```text
必要时 grill-me / grill-with-docs -> to-prd -> to-issues -> tdd
```

### 场景 5：执行测试/验证

推荐流程：

```text
必要时 grill-me / grill-with-docs -> to-prd -> to-issues -> tdd
```

异常时：

```text
diagnose -> tdd
```

使用方式：

1. 必要时用 `grill-me` 确认测试目标和范围。
2. 用 `to-prd` 整理成测试计划/测试文档。
3. 用 `to-issues -> tdd` 推进。
4. 测试失败且原因不清楚时，切到 `diagnose`。

## 初期最佳实践

1. 需求不清时先用 `grill-me`，有项目文档时用 `grill-with-docs`。
2. 需求清楚后走 `to-prd -> to-issues -> tdd`。
3. bug 常规流程走 `diagnose -> tdd`。
