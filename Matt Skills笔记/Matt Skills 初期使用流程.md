# Matt Skills 初期使用流程

## 目标

把 Matt Skills 当成工程工具箱：需要时调用，不需要时跳过。

初期只记一条判断主线：

```text
必要时先对齐目标：
grill-me / grill-with-docs

沉淀计划：
to-prd

执行阶段：
小任务：implement + tdd
大任务：to-issues + triage -> implement + tdd

异常时：
diagnose
```

`diagnose` 不是固定步骤，只在报错、失败、性能问题、行为不符合预期时切入。

## 初期最简调用模型

```text
必要时先对齐目标：
grill-me
有项目文档作为基础：grill-with-docs

需求变计划：
to-prd

判断任务规模：
小任务 -> implement + tdd
大任务 -> to-issues + triage -> implement + tdd

执行异常：
diagnose
```

## Skill 速查

| Skill | 什么时候用 |
| --- | --- |
| `setup-matt-pocock-skills` | 需要把 PRD 或 issue 接入 tracker 前，初始化 issue tracker、标签、领域文档规则 |
| `grill-me` | 目标不清、范围不清、需要先把问题问准 |
| `grill-with-docs` | 需要结合 `CONTEXT.md`、ADR、项目术语一起讨论方案 |
| `to-prd` | 已经聊清楚目标，需要整理成 PRD 或计划文档 |
| `to-issues` | PRD 太大时，和 `triage` 搭配拆成可执行任务 |
| `triage` | `to-issues` 之后的二验，判断任务是否信息足够、能否开工 |
| `implement` | 已有 PRD、issue、流程文档，需要开始执行 |
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

当目标已经基本清楚，但还不适合直接开工时使用。

适合：

- 新功能
- 小项目
- 复杂文档
- 多步骤流程

说明：

- 初期可以统一用 `to-prd` 把需求沉淀成计划
- 先用 `to-prd` 看清任务大小，再决定是否进入 `to-issues + triage`
- 单纯修 bug 优先用 `diagnose`

### 3. 判断规模并执行：小任务 / 大任务

已有明确计划后，根据任务大小选择执行方式。

```text
小任务：implement + tdd
大任务：to-issues + triage -> implement + tdd
```

`to-issues + triage` 是大任务执行前的拆分和二验组合：

- `to-issues` 负责把 PRD 拆成可执行任务
- `triage` 负责二验，判断任务是否信息足够、边界清楚、能否开工
- 核心原则：拆成垂直切片，每个任务都能独立验证

使用 `to-issues + triage` 的判断：

- 适合：完整项目、多模块功能、多阶段文档整理
- 不适合：单文件笔记、一次能完成的小任务

执行说明：

- `implement` 表示开始执行任务
- `tdd` 表示先定义验收点，再实现，再验证
- 文档任务里的 `tdd` 不一定写测试文件

### 4. 排查问题：`diagnose`

任何阶段执行异常时切换到 `diagnose`，定位清楚后再回到当前执行阶段。

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
implement + tdd
异常时 -> diagnose
```

使用方式：

1. 先让 AI 读取流程文档。
2. 如果流程清楚，直接执行。
3. 如果流程有歧义，先用 `grill-me` 问清楚。
4. 如果执行失败，切到 `diagnose`。

### 场景 2：开发新功能

推荐流程：

```text
必要时 grill-me / grill-with-docs -> to-prd -> implement + tdd
```

大型功能：

```text
必要时 grill-me / grill-with-docs -> to-prd -> to-issues + triage -> implement + tdd
```

### 场景 3：修复 bug

推荐流程：

```text
diagnose -> implement + tdd
```

大范围修复：

```text
diagnose -> to-prd -> to-issues + triage -> implement + tdd
```

重点：

- 先复现，不先猜原因。
- `diagnose` 已包含复现、分析、定位和修复计划。
- 范围很大时，再补 `to-prd -> to-issues + triage`。
- 能写回归测试就先写。
- 修完后用原复现路径验证。

### 场景 4：优化重构/架构

推荐流程：

```text
improve-codebase-architecture -> grill-with-docs -> to-prd -> to-issues + triage -> implement + tdd
```

适合：

- 代码难理解
- 改一个点影响很多地方
- 测试不好写
- 模块边界不清

小重构可以直接：

```text
必要时 grill-me / grill-with-docs -> to-prd -> implement + tdd
```

### 场景 5：执行测试/验证

推荐流程：

```text
必要时 grill-me / grill-with-docs -> to-prd -> implement + tdd
```

大型测试：

```text
必要时 grill-me / grill-with-docs -> to-prd -> to-issues + triage -> implement + tdd
```

异常时：

```text
diagnose
```

使用方式：

1. 必要时用 `grill-me` 确认测试目标和范围。
2. 用 `to-prd` 整理成测试计划/测试文档。
3. 根据任务大小选择 `implement + tdd` 或 `to-issues + triage -> implement + tdd`。
4. 测试失败且原因不清楚时，切到 `diagnose`。

## 初期最佳实践

1. 需求不清时先用 `grill-me`，有项目文档时用 `grill-with-docs`。
2. 小任务走 `to-prd -> implement + tdd`，把计划写短即可。
3. bug 优先 `diagnose`，不是 `to-prd`。
4. 大任务走 `to-prd -> to-issues + triage -> implement + tdd`。
5. 只有 PRD 明显无法一次完成时，才使用 `to-issues + triage`。
6. 功能完成后需要验证质量时，用 `tdd` 补测试，失败再切 `diagnose`。
