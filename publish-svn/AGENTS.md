# Repository Guidelines

## Project Structure & Module Organization

This repository is a small automation toolkit for publishing front-end build outputs to an SVN working copy. Key files live at the repo root:

- `publish-svn.ps1`: main PowerShell script that builds (optional), syncs `dist` to a target SVN working copy, and commits.
- `publish-svn.config.json`: profiles and environment mappings (project roots, SVN roots, default build scripts).
- `publish-svn.last.json`: recent run history used to auto-fill defaults.
- `publish-svn.svn-debug.log`: optional SVN command logs when `-DebugSvn` is set.

There are no submodules, tests, or source folders beyond these root files.

## Build, Test, and Development Commands

- `.\publish-svn.ps1`: interactive run; prompts for profile, env, target, and commit message.
- `.\publish-svn.ps1 -Profile 2026-valentineDay -Env dev -Message "Describe change"`: non-interactive example.
- `.\publish-svn.ps1 -Profile 2026-valentineDay -Env dev -BuildScript "npm run build:test" -Message "Describe change"`: override the build script for this run.
- `-NoBuild` skips build; `-NoCommit` skips SVN commit; `-DebugSvn` writes debug logs.

This repo does not define its own build or test steps; builds are executed in the target project via `defaultBuildScripts` (commonly `npm run build:test`).

When `-Message` is omitted (and `-NoCommit` is not set), the script tries to read the latest Git commit message from the project root (if a Git repo is detected) and uses it as the default prompt value.

## 系统通知（Toast）

- 脚本运行结束后会 best-effort 发送 Windows 系统通知（不影响主流程成败）。
- 发送方默认使用 `AppId=publish-svn`；若检测到未注册，会先自动尝试注册（非管理员终端也会尝试）。
- 注册内容位于当前用户：`%APPDATA%\Microsoft\Windows\Start Menu\Programs\publish-svn.lnk` 与 `HKCU:\Software\Classes\AppUserModelId\publish-svn`。
- 终端输出：`-DebugNotify` 会打印注册/发送的详细过程；未开启时仅在“所有候选 AppId 均发送失败”时 `Write-Warning` 提醒。
- 现实坑：系统“勿扰/专注助手/通知设置”可能导致不弹出但不一定报错；需要排查时请加 `-DebugNotify` 并检查 Windows 通知设置里的发送者列表。

## Sync Behavior Notes

- Sync logic is file-based, not robocopy. Hash-named files are only copied when missing; non-hash files are force-overwritten.
- Files present in the target but missing from source are deleted; empty directories are cleaned up.
- If the target directory doesn't exist or isn't an SVN working copy, the script updates the parent working copy first and can create the target directory after confirmation.
- The script prints per-file sync details plus a summary (added/overwritten/skipped/deleted + byte counts).
- `index.html` and `favicon.ico` are always force-copied after the main sync if present in the source.
- Before commit, the script runs `svn add` (or `svn add --force`) and converts missing (`!`) entries from `svn status` into `svn delete`.
- `svn commit` is skipped when `svn status` is empty and is only considered successful when a new revision can be parsed from output (`Committed revision ...` / `提交修订版/版本 ...`).
- After a successful commit, the script runs `svn cleanup` on the target path.

## Coding Style & Naming Conventions

- PowerShell style with 2-space indentation and PascalCase function names (e.g., `Invoke-Svn`).
- Parameters use PascalCase (`-ProjectRoot`) and variables use camelCase (`$lastEntries`).
- Keep strings ASCII unless the file already uses localized text; this repo includes Chinese commit messages and prompts.

## Testing Guidelines

No test framework is present in this repo. Validate changes by running the script in a controlled SVN working copy and confirming expected status/commit behavior.

## Commit & Pull Request Guidelines

There is no Git history here; SVN commit messages recorded in `publish-svn.last.json` are short, descriptive, and structured with hyphen-separated phrases (e.g., "情人节活动-充值有礼-更新默认数据"). Use similar concise, task-focused messages.

If you submit changes, include a brief description of what behavior changed, plus any config updates needed.

After completing a feature iteration, proactively ask whether to push to the remote (`git push`) and whether to sync/update `AGENTS.md`.

## Security & Configuration Tips

- Double-check `TargetRootRel`/`TargetRel` to avoid syncing to the wrong SVN path.
- Ensure `svn` is available in PATH and that target roots are valid SVN working copies.

## Input Resolution & Defaults

- `TargetRel` can be derived from `.env` when a profile sets `svnDefaultTargetRelFromEnv` and `svnDefaultTargetRelMap`. In that case, passing `-TargetRel` is rejected.
- For non-`official` runs, the script resolves the env override file from `--mode` in `BuildScript` (supports `npm run <script>` by reading `package.json`) and prints merged `.env` + `.env.<mode>` content for confirmation. When `-NoBuild` is set, missing `--mode` / `.env.<mode>` will not hard-fail (override may be skipped).
- “环境变量确认”会完整打印合并后的 `.env` 与覆盖文件内容，不会过滤注释。`pwsh 7` 下按 RGB 分色显示：注释 `#7A7E85`、`KEY` `#CF8E6D`、`=` `#BCBEC4`、`VALUE` `#6AAB73`；非 `pwsh 7` 宿主会退回近似控制台颜色。
- `VUE_APP_ICON_PATH` in `.env` can override the source path under `dist`. If not set and `dist` contains a single folder, that folder becomes the source; otherwise `dist` is used.
- For `Env=official`, `OfficialProjectRel` can be derived from `.env` / `.env.officialPro` when a profile sets `officialProjectRelFromEnv`. `officialProjectRelMap` is optional; if missing/empty/unmatched, it falls back to the env value. Passing `-OfficialProjectRel` skips env mapping.
- Commit message defaults to the latest Git commit message in the project root (if a Git repo is detected).
- Profile selection defaults to the latest successful profile in `publish-svn.last.json` when `-Profile` is not provided.
- Defaults are pulled from the latest successful history entry with matching `ProfileHash` (so config changes don't reuse stale defaults).
- `Env`, `TargetRootRel`, `TargetRel`, and `BuildScript` can default from history; `BuildScript` is only reused when the previous entry used the same `Env`.

## Target Path Validation

- `TargetRel`/`TargetRootRel` must be relative paths; absolute paths and `..` are rejected.
- `TargetRel` cannot be empty; `TargetRootRel` cannot be empty.

## History & Retry

- `publish-svn.last.json` records both succeeded and failed runs (up to 200 entries), including timestamps, duration, revision (when available), and error text.
- On failure, the script prompts whether to rerun and prints a full rerun command with the currently bound parameters.
