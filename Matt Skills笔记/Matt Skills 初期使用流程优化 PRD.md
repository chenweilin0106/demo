# Matt Skills 初期使用流程优化 PRD

## Problem Statement

当前笔记把大任务写成 `to-prd -> to-issues -> triage -> implement + tdd`，容易让人误解 `to-issues`、`triage` 和 `implement + tdd` 是三个同级主阶段。

实际目标是：`to-issues + triage` 属于大任务执行前的拆分和二验组合，小任务不进入这个组合。

## Solution

把初期流程统一改成：

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

## User Stories

1. 作为个人笔记使用者，我希望小任务路径清楚，这样可以在 PRD 后直接进入执行。
2. 作为个人笔记使用者，我希望大任务路径把 `to-issues + triage` 写成组合动作，这样不会把它们误认为独立主阶段。
3. 作为个人笔记使用者，我希望 `grill-me / grill-with-docs` 被标成“必要时使用”，这样不会每次机械套流程。
4. 作为个人笔记使用者，我希望 `diagnose` 保持异常旁路，这样正常流程能保持简短。
5. 作为个人笔记使用者，我希望文档继续保持速查风格，这样后续调用 AI 时能快速复制。

## Implementation Decisions

- 保持个人速查笔记风格。
- 保留 `to-prd` 作为判断小任务/大任务前的统一计划步骤。
- 把 `to-issues + triage` 表达为大任务的拆分和二验组合。
- 把 `implement + tdd` 保持为明确任务后的执行动作。
- 轻量本地 PRD 不要求先配置 issue tracker。

## Testing Decisions

- 这是文档任务，不需要写测试文件。
- 通过阅读文档和搜索关键流程文本来验收。
- 验收点：
  - 小任务路径是 `to-prd -> implement + tdd`。
  - 大任务路径是 `to-prd -> to-issues + triage -> implement + tdd`。
  - `to-issues + triage` 被描述为组合动作。
  - `grill-me / grill-with-docs` 是必要时使用。
  - `diagnose` 保持异常旁路。

## Out of Scope

- 不配置 issue tracker。
- 不把文档重写成团队培训文档。
- 不改变 Skill 本身的定义。

## Further Notes

这是一份本地轻量 PRD，只用于本次笔记优化。
