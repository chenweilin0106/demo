# 周报生成：AGENTS.md

适用范围：本目录 `周报生成笔记/` 下的周报生成与维护。

## 目标

基于 Git 提交生成周报，输出：
- 必须：`周报_YYYY_MM_DD_YYYY_MM_DD.html`（用于钉钉日志粘贴）
- 可选：`周报_YYYY_MM_DD_YYYY_MM_DD.md`（详细周报/留痕回溯，含统计口径与参考提交）

格式与内容规范以本目录两份文件为准：
- `周报模板_格式规范.md`
- `周报模板_内容生成规范.md`

## 开始前（必须先做）

1) 先提醒用户更新本地仓库目录（例如 `git fetch` / `git pull` / 公司内部同步流程）。
- 默认只使用本地 `origin/*` 引用，不主动 `fetch`
- 如果用户明确说“已更新/不用更新”，继续

2) 确认时间范围：
- 如果用户未给时间范围：默认取“当天往前推 5 天，共 5 天（含首尾）”
  - `end = 今天（Asia/Shanghai）`
  - `start = end - 4天`
- 开始生成前，把计算出的 `start ~ end` 明确展示给用户并让用户确认

## 默认参数（用户未显式指定时使用）

- 仓库（默认）：
  - Windows：`D:\Project\dandan-activity-web`
  - WSL：`/mnt/d/Project/dandan-activity-web`
  - 用户后续可指定其它仓库，按用户为准
- 基准分支：`origin/trunk`（只用本地引用）
- 分支列表：所有本地分支（仅展示本周有提交的分支）
- 作者：`chenweilin`
- 是否包含 merge：不包含（`--no-merges`）

## Git 提取口径（固定）

对每个分支，提取符合作者与时间范围的提交：
- 非 `trunk` 分支：统计“相对 trunk 待合入差异”范围（`origin/trunk..{branch}`）
- `trunk` 分支：直接统计本周 `trunk` 上的提交

命令模板：

```bash
# 非 trunk：只统计待合入 trunk 的差异
git log origin/trunk..$branch \
  --no-merges \
  --author="chenweilin" \
  --since="YYYY-MM-DD 00:00:00" \
  --until="YYYY-MM-DD 23:59:59" \
  --date=short \
  --pretty=format:"%H|%ad|%s"

# trunk：直接统计 trunk 上本周提交
git log trunk \
  --no-merges \
  --author="chenweilin" \
  --since="YYYY-MM-DD 00:00:00" \
  --until="YYYY-MM-DD 23:59:59" \
  --date=short \
  --pretty=format:"%H|%ad|%s"
```

## 去重规则（避免重复工作项）

按下面顺序去重：
1) 跨分支若出现相同 `commit hash`：只保留一次
2) 若不同 hash 但 `subject` 完全相同：合并为一条（只保留一次）
   - 可在工作项后标注“（N次提交）”

## 归类与层级（生成 1/a/i 多级列表）

### 一级标题（1. / 2. / 3.）

优先使用提交 `subject` 的第一段（`A-B-C` 的 `A`）作为一级标题；无法判断时用分支名兜底。

### 二级标题（a. / b. / c.）

优先使用提交 `subject` 的第二段（`A-B-C` 的 `B`）作为二级标题。

如果 `subject` 只有两段（`A-事项`），则按关键词把“事项”归入少量固定类别（尽量稳定）：
- `资源` / `图片`：资源更新
- `样式` / `UI` / `弹框` / `导航栏` / `位置`：样式/交互优化
- `修复` / `bug`：问题修复
- `CDN` / `外网` / `发布`：性能/发布相关
- 其它：基础建设 或 其他（二选一，保持一致即可）

### 三级及以上（i. / ii. / iii. ...）

三级条目作为最终展示的“工作项”，文案用短句（动词 + 名词/对象），必要时继续拆 4 级以上（按 `1/a/i` 循环）。

## 文案与排版硬规则（HTML/钉钉粘贴必须满足）

- 不带分支名、hash、文件路径
- 不使用 Markdown 标记（反引号等）
- 英文/数字与中文之间不留空格
- 列表项之间无空行
- 编号按 `1/a/i` 循环；每个子列表都是独立有序列表，编号必须从头开始（不能跨父级延续）

说明：MD 留痕文件可包含分支名与 hash（用于回溯），但“工作项列表”本身仍遵守上面文案规则。

## 输出文件（固定命名）

- `周报_YYYY_MM_DD_YYYY_MM_DD.html`：最终产物（打开后点击“复制（不带字体）”，再粘贴钉钉日志）
  - 写入剪贴板的 `text/html` 不携带字体信息（不包含 `font-family`）
  - 写入剪贴板的 `text/html` 为紧凑结构（避免多余空白节点导致平台出现空行）
  - 优先复用本目录最近一次周报 HTML 的复制脚本与结构，只替换标题和列表内容
- `周报_YYYY_MM_DD_YYYY_MM_DD.md`：详细周报/留痕回溯
  - 建议包含：统计口径、归类后的工作项、参考提交（hash + subject）

## 你可以直接这样对我说（推荐）

```text
按默认口径生成周报：
- 时间范围：不写（你按默认 5 天范围算出来并让我确认）
- 仓库：默认（D:\Project\dandan-activity-web）
- 作者：chenweilin
- 分支：所有本地分支
- 不含 merge
输出：HTML + MD
```

