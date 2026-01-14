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
- `-NoBuild` skips build; `-NoCommit` skips SVN commit; `-DebugSvn` writes debug logs.

This repo does not define its own build or test steps; builds are executed in the target project via `defaultBuildScripts` (commonly `npm run build:test`).

## Sync Behavior Notes

- Sync logic is file-based, not robocopy. Hash-named files are only copied when missing; non-hash files are force-overwritten.
- Files present in the target but missing from source are deleted; empty directories are cleaned up.
- The script prints per-file sync details plus a summary (added/overwritten/skipped/deleted + byte counts).
- `svn commit` is skipped when `svn status` is empty and is only considered successful when output contains `Committed revision`.

## Coding Style & Naming Conventions

- PowerShell style with 2-space indentation and PascalCase function names (e.g., `Invoke-Svn`).
- Parameters use PascalCase (`-ProjectRoot`) and variables use camelCase (`$lastEntries`).
- Keep strings ASCII unless the file already uses localized text; this repo includes Chinese commit messages and prompts.

## Testing Guidelines

No test framework is present in this repo. Validate changes by running the script in a controlled SVN working copy and confirming expected status/commit behavior.

## Commit & Pull Request Guidelines

There is no Git history here; SVN commit messages recorded in `publish-svn.last.json` are short, descriptive, and structured with hyphen-separated phrases (e.g., "情人节活动-充值有礼-更新默认数据"). Use similar concise, task-focused messages.

If you submit changes, include a brief description of what behavior changed, plus any config updates needed.

## Security & Configuration Tips

- Double-check `TargetRootRel`/`TargetRel` to avoid syncing to the wrong SVN path.
- Ensure `svn` is available in PATH and that target roots are valid SVN working copies.
