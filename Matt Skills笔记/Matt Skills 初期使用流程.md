# Matt Skills 初期使用流程

## 目标

把 Matt Skills 当成工程工具箱：需要时调用，不需要时跳过。

初期主流程：

```text
grill-me -> to-prd -> to-issues -> implement/tdd -> diagnose
```

`diagnose` 不是每次都用，只在报错、失败、性能问题、行为不符合预期时使用。

## Skill 速查

| Skill | 什么时候用 |
| --- | --- |
| `setup-matt-pocock-skills` | 给真实项目初始化 issue tracker、标签、领域文档规则 |
| `grill-me` | 目标不清、范围不清、需要先把问题问准 |
| `grill-with-docs` | 需要结合 `CONTEXT.md`、ADR、项目术语一起讨论方案 |
| `to-prd` | 已经聊清楚目标，需要整理成 PRD |
| `to-issues` | PRD 或计划较大，需要拆成可执行任务 |
| `implement` | 已有 PRD、issue、流程文档，需要开始执行 |
| `tdd` | 新功能、修 bug、补测试时使用 |
| `diagnose` | bug、报错、失败、性能退化，需要系统排查 |
| `triage` | 有 issue 队列，需要判断优先级和状态 |
| `improve-codebase-architecture` | 代码难改、难测、结构混乱，需要找架构改进点 |

## 标准流程

### 1. 先对齐目标：`grill-me`

适合在任务开始时使用。

作用：

- 明确目标
- 明确范围
- 明确不做什么
- 找出模糊点

常用提示：

```text
用 $grill-me 先对齐目标，每次只问一个问题，并给推荐答案。
```

### 2. 整理需求：`to-prd`

当目标已经基本清楚，但还不适合直接开工时使用。

适合：

- 新功能
- 小项目
- 复杂文档
- 多步骤流程

不适合：

- 很小的改动
- 已有明确流程文档
- 单纯修 bug

### 3. 拆执行任务：`to-issues`

当 PRD 太大，不能一次完成时使用。

核心原则：拆成垂直切片，每个任务都能独立验证。

适合：

- 完整项目
- 多模块功能
- 多阶段文档整理

不适合：

- 单文件笔记
- 一次能完成的小任务

### 4. 执行：`implement` / `tdd`

已有明确任务后使用。

规则：

- 有代码行为变化：优先 `tdd`
- 只是文档：直接 `implement`
- 简单修改：可以跳过 `to-prd` 和 `to-issues`

### 5. 排查问题：`diagnose`

出现问题时切换到 `diagnose`。

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

### 场景 1：按现有流程文档执行

推荐流程：

```text
implement -> tdd -> diagnose
```

使用方式：

1. 先让 AI 读取流程文档。
2. 如果流程清楚，直接执行。
3. 如果流程有歧义，先用 `grill-me` 问清楚。
4. 如果执行失败，切到 `diagnose`。

### 场景 2：新功能

推荐流程：

```text
grill-me -> to-prd -> to-issues -> implement/tdd
```

跳过规则：

- 功能很小：`grill-me -> implement/tdd`
- 已经有清晰需求：`to-prd` 可跳过
- 一次能做完：`to-issues` 可跳过

### 场景 3：修 bug

推荐流程：

```text
diagnose -> tdd -> implement
```

重点：

- 先复现，不先猜原因。
- 能写回归测试就先写。
- 修完后用原复现路径验证。

### 场景 4：重构/架构

推荐流程：

```text
improve-codebase-architecture -> grill-with-docs -> to-issues -> implement/tdd
```

适合：

- 代码难理解
- 改一个点影响很多地方
- 测试不好写
- 模块边界不清

小重构可以直接：

```text
grill-me -> implement/tdd
```

### 场景 5：学习/文档沉淀

推荐流程：

```text
grill-me -> implement
```

适合：

- 写学习笔记
- 整理工具使用流程
- 把对话沉淀成文档

只有文档很复杂时，再加：

```text
to-prd -> to-issues
```

### 场景 6：测试/验证

推荐流程：

```text
tdd -> diagnose
```

适合：

- 功能已写完，需要补测试
- 需要跑测试验证质量
- 测试失败，需要定位原因
- 交付前需要确认主要行为没问题

使用方式：

1. 先确认要验证哪些用户可见行为。
2. 用 `tdd` 补最关键的测试。
3. 测试失败且原因不清楚时，切到 `diagnose`。

## 初期最佳实践

1. 先用 `grill-me`，少直接开工。
2. 小任务不要强行走完整流程。
3. bug 优先 `diagnose`，不是 `to-prd`。
4. 大任务先 `to-prd`，再 `to-issues`。
5. 写代码时优先 `tdd`，写文档时直接 `implement`。
6. 功能完成后需要验证质量时，用 `tdd` 补测试，失败再切 `diagnose`。

## 一句话判断

| 你现在遇到的是 | 用 |
| --- | --- |
| 想法模糊 | `grill-me` |
| 想法已清楚但较大 | `to-prd` |
| PRD 太大 | `to-issues` |
| 已有明确任务 | `implement` |
| 需要测试先行 | `tdd` |
| 需要补测试/验证质量 | `tdd` |
| 出问题了 | `diagnose` |
| 代码结构难受 | `improve-codebase-architecture` |
| 术语和文档也要同步 | `grill-with-docs` |
