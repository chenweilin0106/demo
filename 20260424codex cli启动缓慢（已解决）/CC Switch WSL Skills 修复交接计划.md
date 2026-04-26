# CC Switch WSL Skills 修复交接计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use `systematic-debugging` for verification and root-cause checks before changing files. Use `verification-before-completion` before claiming success.

**Goal:** 修复 CC Switch 在 Codex 配置目录指向 WSL 时无法把 skills 从软链接切换为文件复制的问题，并验证它是否能降低 Codex CLI 启动期的 `/mnt/c` I/O 成本。

**Architecture:** 先保护现场和可回滚备份，再只清理 `~/.codex/skills` 下由 CC Switch 创建、指向 `/mnt/c/Users/tr135/.cc-switch/skills` 的顶层旧 symlink。之后由 CC Switch 继续管理 skills，在 UI 中重新启用/更新，让它按当前 `skillSyncMethod=copy` 写入真实目录。

**Tech Stack:** WSL Ubuntu、Windows CC Switch v3.14.1、Codex CLI、Bash、PowerShell、CC Switch SQLite/settings、Linux symlink、Windows UNC 路径 `\\wsl.localhost\Ubuntu\...`。

---

## 当前事实

当前目录：

```bash
/home/tr135/demo/20260424codex cli启动缓慢（已解决）
```

CC Switch 设置已经改成 copy：

```json
{
  "codexConfigDir": "\\\\wsl.localhost\\Ubuntu\\home\\tr135\\.codex",
  "skillSyncMethod": "copy",
  "skillStorageLocation": "cc_switch"
}
```

但实际 Codex skills 目录仍有 15 个顶层 symlink 指向 Windows 文件系统：

```text
/home/tr135/.codex/skills/agent-browser -> /mnt/c/Users/tr135/.cc-switch/skills/agent-browser
/home/tr135/.codex/skills/brainstorming -> /mnt/c/Users/tr135/.cc-switch/skills/brainstorming
/home/tr135/.codex/skills/dispatching-parallel-agents -> /mnt/c/Users/tr135/.cc-switch/skills/dispatching-parallel-agents
/home/tr135/.codex/skills/executing-plans -> /mnt/c/Users/tr135/.cc-switch/skills/executing-plans
/home/tr135/.codex/skills/finishing-a-development-branch -> /mnt/c/Users/tr135/.cc-switch/skills/finishing-a-development-branch
/home/tr135/.codex/skills/receiving-code-review -> /mnt/c/Users/tr135/.cc-switch/skills/receiving-code-review
/home/tr135/.codex/skills/requesting-code-review -> /mnt/c/Users/tr135/.cc-switch/skills/requesting-code-review
/home/tr135/.codex/skills/subagent-driven-development -> /mnt/c/Users/tr135/.cc-switch/skills/subagent-driven-development
/home/tr135/.codex/skills/systematic-debugging -> /mnt/c/Users/tr135/.cc-switch/skills/systematic-debugging
/home/tr135/.codex/skills/test-driven-development -> /mnt/c/Users/tr135/.cc-switch/skills/test-driven-development
/home/tr135/.codex/skills/using-git-worktrees -> /mnt/c/Users/tr135/.cc-switch/skills/using-git-worktrees
/home/tr135/.codex/skills/using-superpowers -> /mnt/c/Users/tr135/.cc-switch/skills/using-superpowers
/home/tr135/.codex/skills/verification-before-completion -> /mnt/c/Users/tr135/.cc-switch/skills/verification-before-completion
/home/tr135/.codex/skills/writing-plans -> /mnt/c/Users/tr135/.cc-switch/skills/writing-plans
/home/tr135/.codex/skills/writing-skills -> /mnt/c/Users/tr135/.cc-switch/skills/writing-skills
```

`~/.codex/skills/.system` 是真实目录，不要删除。

另有：

```text
/home/tr135/.agents/skills/superpowers -> /mnt/c/Users/tr135/.codex/superpowers/skills
```

这个不是本轮 CC Switch copy 修复的首要目标，先记录，不在第一步动它。

## 根因判断

用户在 CC Switch UI 中尝试停用 skill 时出现：

```text
目录名称无效。 (os error 267)
```

本轮源码核验基于 CC Switch v3.14.1：

- `get_app_skills_dir()` 会把 Codex 目标目录解析为用户设置的 `codexConfigDir + /skills`。
  - `https://github.com/farion1231/cc-switch/blob/v3.14.1/src-tauri/src/services/skill.rs#L503-L516`
- `toggle_app()` 停用时会走 `remove_from_app()`。
  - `https://github.com/farion1231/cc-switch/blob/v3.14.1/src-tauri/src/services/skill.rs#L1354-L1368`
- copy 模式启用时，会先删除已有目标，再 `copy_dir_recursive()`。
  - `https://github.com/farion1231/cc-switch/blob/v3.14.1/src-tauri/src/services/skill.rs#L1596-L1644`
- Windows 分支删除目录 symlink 时固定使用 `fs::remove_dir(path)`。
  - `https://github.com/farion1231/cc-switch/blob/v3.14.1/src-tauri/src/services/skill.rs#L1655-L1662`

PowerShell 只读检查 WSL 里的 Linux symlink 时，Windows 看到：

```text
Attributes=ReparsePoint
LinkType=
Target=
```

这说明 Windows 能看到它是 reparse point，但不能按标准 Windows symlink 识别 target。CC Switch 再用 Windows API 删除它，容易触发 `os error 267`。

因此当前处理思路是：不要让 CC Switch 删除这些旧 Linux symlink；由 WSL 侧先备份并删除这些旧 symlink，然后让 CC Switch 用 copy 模式重新写入真实目录。

## 风险

- 删除错误路径会影响 Codex 内置/system skills 或用户其它目录。
- CC Switch 重新同步失败时，`~/.codex/skills` 可能暂时缺少用户 skills。
- 即使 skills copy 修好，Codex 启动慢也可能仍有其它原因：
  - TUI 初始光标位置读取超时：`failed to read initial cursor position`
  - 终端能力/颜色查询等待
  - session 初始化早期空档

所以本计划只解决 “Codex skills 仍指向 `/mnt/c`” 这一部分，不承诺完全消除 10 秒启动等待。

## Task 1: 现场确认

**Files:**

- Read: `/mnt/c/Users/tr135/.cc-switch/settings.json`
- Read: `/home/tr135/.codex/skills`
- Read: `/home/tr135/.agents/skills`
- Read: `/mnt/c/Users/tr135/.cc-switch/cc-switch.db`

- [ ] **Step 1: 确认 CC Switch 设置仍为 copy**

Run:

```bash
sed -n '1,220p' /mnt/c/Users/tr135/.cc-switch/settings.json
```

Expected:

```text
"codexConfigDir": "\\\\wsl.localhost\\Ubuntu\\home\\tr135\\.codex"
"skillSyncMethod": "copy"
"skillStorageLocation": "cc_switch"
```

- [ ] **Step 2: 确认当前 symlink 状态**

Run:

```bash
find /home/tr135/.codex/skills -maxdepth 1 -mindepth 1 -printf '%y %p -> %l\n' 2>/dev/null | sort
find /home/tr135/.codex/skills -maxdepth 1 -type l -printf '%p -> %l\n' 2>/dev/null | sort
```

Expected:

```text
15 个顶层 symlink 指向 /mnt/c/Users/tr135/.cc-switch/skills/...
.system 是真实目录
```

- [ ] **Step 3: 确认 CC Switch 数据库里 Codex 启用的 skills**

Run:

```bash
python3 - <<'PY'
import sqlite3
from pathlib import Path
p = Path('/mnt/c/Users/tr135/.cc-switch/cc-switch.db')
con = sqlite3.connect(f'file:{p}?mode=ro', uri=True)
cur = con.cursor()
print('directory\tenabled_codex\tinstalled_at')
for row in cur.execute('select directory, enabled_codex, installed_at from skills order by directory'):
    print('\t'.join(map(str, row)))
PY
```

Expected:

```text
agent-browser 等 15 个常用 skills enabled_codex=1
docx/frontend-design/pptx/web-design-guidelines 等可能 enabled_codex=0
```

## Task 2: 创建备份

**Files:**

- Create: `/home/tr135/demo/20260424codex cli启动缓慢（已解决）/cc-switch-skills-backup-YYYYMMDD-HHMMSS/`
- Read: `/home/tr135/.codex/skills`
- Read: `/mnt/c/Users/tr135/.cc-switch/settings.json`
- Read: `/mnt/c/Users/tr135/.cc-switch/cc-switch.db`

- [ ] **Step 1: 创建备份目录**

Run:

```bash
ts=$(date +%Y%m%d-%H%M%S)
backup="/home/tr135/demo/20260424codex cli启动缓慢（已解决）/cc-switch-skills-backup-$ts"
mkdir -p "$backup"
printf '%s\n' "$backup"
```

Expected:

```text
输出一个 cc-switch-skills-backup-YYYYMMDD-HHMMSS 目录路径
```

- [ ] **Step 2: 保存目录清单和配置快照**

Run:

```bash
find /home/tr135/.codex/skills -maxdepth 3 -printf '%M %y %p -> %l\n' 2>/dev/null | sort > "$backup/codex-skills-before.manifest.txt"
find /home/tr135/.agents/skills -maxdepth 3 -printf '%M %y %p -> %l\n' 2>/dev/null | sort > "$backup/agents-skills-before.manifest.txt"
cp -a /mnt/c/Users/tr135/.cc-switch/settings.json "$backup/cc-switch-settings.json"
cp -a /mnt/c/Users/tr135/.cc-switch/cc-switch.db "$backup/cc-switch.db"
```

Expected:

```text
命令退出码为 0
```

- [ ] **Step 3: 保存 `~/.codex/skills` 结构备份**

Run:

```bash
cp -a /home/tr135/.codex/skills "$backup/codex-skills-copy-a"
```

Expected:

```text
备份目录存在，顶层 symlink 在备份中仍是 symlink，不跟随到 /mnt/c
```

Verify:

```bash
find "$backup/codex-skills-copy-a" -maxdepth 1 -mindepth 1 -printf '%y %p -> %l\n' | sort
```

## Task 3: 只删除 CC Switch 指向 `/mnt/c` 的旧 symlink

**Files:**

- Modify: `/home/tr135/.codex/skills/*`

必须只删除满足以下条件的路径：

- 位于 `/home/tr135/.codex/skills` 顶层
- 类型是 symlink
- symlink target 以 `/mnt/c/Users/tr135/.cc-switch/skills/` 开头

不要删除：

- `/home/tr135/.codex/skills/.system`
- 任何真实目录
- `/home/tr135/.agents/skills/superpowers`

- [ ] **Step 1: 生成待删除列表并人工核对**

Run:

```bash
find /home/tr135/.codex/skills -maxdepth 1 -type l -printf '%p -> %l\n' \
  | awk -F' -> ' '$2 ~ "^/mnt/c/Users/tr135/.cc-switch/skills/" {print $1}' \
  | sort \
  | tee "$backup/codex-skills-symlinks-to-remove.txt"
```

Expected:

```text
只列出 15 个 /home/tr135/.codex/skills/<name>
不包含 .system
不包含 /home/tr135/.agents/skills/superpowers
```

- [ ] **Step 2: 删除这些 symlink**

Run:

```bash
while IFS= read -r p; do
  if [ -L "$p" ]; then
    rm -- "$p"
  else
    printf 'SKIP not symlink: %s\n' "$p" >&2
  fi
done < "$backup/codex-skills-symlinks-to-remove.txt"
```

Expected:

```text
无错误输出
```

- [ ] **Step 3: 验证旧 `/mnt/c/.cc-switch/skills` symlink 已清掉**

Run:

```bash
find /home/tr135/.codex/skills -maxdepth 1 -type l -printf '%p -> %l\n' 2>/dev/null | sort
find /home/tr135/.codex/skills -maxdepth 1 -mindepth 1 -printf '%y %p -> %l\n' 2>/dev/null | sort
```

Expected:

```text
第一条命令没有指向 /mnt/c/Users/tr135/.cc-switch/skills 的输出
.system 仍存在，类型为 d
```

## Task 4: 让 CC Switch 重新 copy 同步

**Files:**

- Modify via CC Switch UI: `/home/tr135/.codex/skills/<skill-name>`
- Read: `/mnt/c/Users/tr135/.cc-switch/logs/cc-switch.log`

- [ ] **Step 1: 在 CC Switch 中重新启用一个代表性 skill**

在 CC Switch UI 中：

1. 确认 `设置 -> 通用 -> Skills 同步方式` 为 `文件复制`。
2. 进入 `Skills 管理`。
3. 当前应用选择 `Codex`。
4. 对一个代表性 skill，例如 `systematic-debugging`：
   - 如果显示未启用，点击启用。
   - 如果仍显示启用但目录已被 WSL 清掉，尝试点击更新，或先停用再启用。

Expected:

```text
不再出现 “目录名称无效。 (os error 267)”
```

- [ ] **Step 2: 验证代表性 skill 已变成真实目录**

Run:

```bash
find /home/tr135/.codex/skills/systematic-debugging -maxdepth 1 -printf '%y %p -> %l\n' 2>/dev/null | sort
```

Expected:

```text
d /home/tr135/.codex/skills/systematic-debugging ->
f /home/tr135/.codex/skills/systematic-debugging/SKILL.md ->
```

- [ ] **Step 3: 如单个成功，再同步其它 Codex 启用 skills**

优先在 CC Switch UI 中使用“更新”、“全部更新”、“重新同步”或逐个停用/启用。不要用 CC Switch 卸载。

Expected:

```text
15 个 enabled_codex=1 的 skills 在 /home/tr135/.codex/skills 下都变成真实目录
```

## Task 5: 验证结果

**Files:**

- Read: `/home/tr135/.codex/skills`
- Read: `/home/tr135/.codex/log/codex-tui.log`
- Optional create: current directory timing logs

- [ ] **Step 1: 确认没有 CC Switch skills 指向 `/mnt/c`**

Run:

```bash
find /home/tr135/.codex/skills -maxdepth 1 -type l -printf '%p -> %l\n' 2>/dev/null | sort
```

Expected:

```text
没有 /mnt/c/Users/tr135/.cc-switch/skills/... 输出
```

- [ ] **Step 2: 确认真实目录数量**

Run:

```bash
find /home/tr135/.codex/skills -maxdepth 1 -mindepth 1 -type d -printf '%f\n' | sort
```

Expected:

```text
.system
agent-browser
brainstorming
dispatching-parallel-agents
executing-plans
finishing-a-development-branch
receiving-code-review
requesting-code-review
subagent-driven-development
systematic-debugging
test-driven-development
using-git-worktrees
using-superpowers
verification-before-completion
writing-plans
writing-skills
```

- [ ] **Step 3: 运行 Codex 启动短测**

Run:

```bash
script -q -t -c "timeout 15s codex --no-alt-screen" /dev/null
```

Expected:

```text
记录时间分布。
如果仍有 2 秒台阶，可能仍来自终端探测。
如果 session 前空档缩短，说明 skills copy 有帮助。
```

- [ ] **Step 4: 查最新 Codex 日志**

Run:

```bash
rg -n "failed to read initial cursor|thread_spawn\\{otel.name=\"thread_spawn\"\\}: (codex_core::session: (new|close)|load: codex_core::exec_policy: new)" /home/tr135/.codex/log/codex-tui.log | tail -80
```

Expected:

```text
用实际时间判断是否改善，不要只凭体感。
```

## Rollback

如果 CC Switch 重新同步失败，恢复旧 symlink 状态：

```bash
rm -rf /home/tr135/.codex/skills
cp -a "$backup/codex-skills-copy-a" /home/tr135/.codex/skills
```

验证：

```bash
find /home/tr135/.codex/skills -maxdepth 1 -mindepth 1 -printf '%y %p -> %l\n' 2>/dev/null | sort
```

如果 settings 或数据库出现异常，可从备份复制回：

```bash
cp -a "$backup/cc-switch-settings.json" /mnt/c/Users/tr135/.cc-switch/settings.json
cp -a "$backup/cc-switch.db" /mnt/c/Users/tr135/.cc-switch/cc-switch.db
```

恢复数据库前应先退出 CC Switch，避免运行中的程序覆盖文件。

## 下一会话提示词

```text
我们在排查 WSL 中 Codex CLI 启动慢。请默认使用简体中文，并遵守当前目录 AGENTS.md：修改任何文件前先给计划并等确认；以命令输出为准，不猜测。

当前工作目录：
/home/tr135/demo/20260424codex cli启动缓慢（已解决）

请先阅读：
1. AGENTS.md
2. CC Switch WSL Skills 修复交接计划.md
3. WSL Codex 启动缓慢结论.md
4. 排查记录.md

关键背景：
- CC Switch v3.14.1 管理 Codex skills。
- CC Switch 设置已是：
  - codexConfigDir = \\wsl.localhost\Ubuntu\home\tr135\.codex
  - skillSyncMethod = copy
  - skillStorageLocation = cc_switch
- 但 /home/tr135/.codex/skills 下 15 个用户 skills 仍是 symlink，指向 /mnt/c/Users/tr135/.cc-switch/skills/...
- 用户在 CC Switch UI 中停用 skill 时出现 “目录名称无效。 (os error 267)”。
- 已查源码判断：CC Switch Windows 端删除 WSL/Linux symlink 时会失败；需要在 WSL 侧备份并只删除这些旧 symlink，然后让 CC Switch 以 copy 模式重新同步。

请按 “CC Switch WSL Skills 修复交接计划.md” 执行。
第一步先做只读确认；第二步创建备份；第三步只删除 /home/tr135/.codex/skills 顶层、目标以 /mnt/c/Users/tr135/.cc-switch/skills/ 开头的 symlink。
不要删除 .system，不要动 /home/tr135/.agents/skills/superpowers。
删除后让我在 CC Switch UI 中重新启用或更新 skill，然后你再验证是否变成真实目录。
最后用 script -q -t -c "timeout 15s codex --no-alt-screen" /dev/null 和 codex-tui.log 对比启动时间。
```
