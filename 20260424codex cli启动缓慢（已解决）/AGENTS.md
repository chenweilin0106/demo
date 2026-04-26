# Repository Guidelines

## Project Structure & Module Organization

This directory is a documentation and evidence archive for the WSL Codex CLI startup investigation, not an application source tree. Root-level Markdown files contain the main narrative and handoff material:

- `排查记录.md`: detailed investigation notes and test matrix.
- `WSL Codex 启动缓慢结论.md`: final diagnosis, actions taken, and rollback notes.
- `CC Switch WSL Skills 修复交接计划.md`: follow-up remediation plan for skill synchronization.

Supporting evidence is stored by type. `logs/` contains Codex TUI log samples grouped by scenario. `strace-logs-*/` contains captured `strace`, `script`, and PTY timing outputs. `cc-switch-skills-backup-*` contains point-in-time backups and manifests from the skills cleanup.

## Build, Test, and Development Commands

There is no build step or package manager configuration in this directory. Use read-only validation commands before changing conclusions:

- `rg -n "pattern" *.md logs/`: search investigation notes and captured logs.
- `find . -maxdepth 2 -type f | sort`: review top-level evidence files.
- `git status --short`: check whether new logs or notes are untracked.
- `codex --version`: confirm the local Codex CLI version when reproducing findings.

Avoid rerunning destructive cleanup or rollback commands from the notes unless the exact target paths and backups have been confirmed.

## Coding Style & Naming Conventions

Use Markdown for repository content. Keep headings descriptive, prefer short paragraphs, and format commands, paths, environment variables, and log fragments with backticks or fenced code blocks. Preserve original command output and error text exactly. New investigation documents should use clear Chinese titles matching the existing style, for example `某问题排查记录.md` or `某问题结论.md`.

## Testing Guidelines

This repository has no automated test framework. Validate documentation changes by checking that commands, paths, and conclusions match the recorded evidence. For reproductions, record the command, environment variables, observed output, and absolute date. Store bulky raw outputs under a scenario-specific directory such as `logs/<scenario>/` or `strace-logs-YYYYMMDD-HHMMSS/`.

## Commit & Pull Request Guidelines

Git history uses concise Chinese or mixed Chinese/English subjects such as `codex cli启动缓慢修复` and `Update codex安装笔记.md`. Keep commits focused on one documentation or evidence update. Pull requests should summarize the changed conclusion or added evidence, list reproduction commands, mention rollback impact when relevant, and avoid including unrelated generated logs.

## Agent-Specific Instructions

Before modifying files, inspect the current evidence and state the intended change. Do not rewrite recorded logs for style. When adding notes, distinguish confirmed facts from hypotheses and cite the file or command output that supports each conclusion.
