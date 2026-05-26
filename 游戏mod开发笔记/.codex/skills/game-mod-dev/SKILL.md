---
name: game-mod-dev
description: Use when working in a copied game-mod-dev template or when the user asks to create, initialize, develop, debug, test, verify, package, install, uninstall, rollback, document, or release a game Mod project.
---

# Game Mod Dev

## Core Rule

Treat the project directory as the source of truth.

At the start of any project task and before modifying any file:

1. Read `AGENTS.md`.
2. Read root `manifest.json`.
3. Read `docs/status.md`.
4. List only the top level of `docs/`, `docs/rules/`, `knowledge/`, `external-mods/`, `scripts/`, `mod-files/`, and `package/`.
5. Read the current version file, such as `docs/v1.md`, only for version development, history tracing, or when the task explicitly needs version details.
6. For rollback, release, or delivery tasks, also list `backups/` and `releases/`.
7. Read only the files relevant to the current task.

Do not read every file in `docs/`, `knowledge/`, `backups/`, or `releases/` by default.

## Single Rule Source

Use only project `docs/rules/` as the rule source.

Do not maintain duplicate rule copies in this skill. If a specific game needs extra rules, update the copied project's `docs/rules/`.

This skill only routes context; it does not define project workflow rules.

If `docs/rules/` is missing, pause and report that the copied template is incomplete.

## Rule Router

Read rules by scenario:

| Scenario | Read |
| --- | --- |
| new Mod project or copied template setup | `docs/rules/00-总流程.md`, `docs/rules/10-项目初始化.md` |
| new version or acceptance criteria | `docs/rules/20-版本启动.md` |
| research, legal/source boundary, Mod type, tool choice | `docs/rules/30-资料收集和工具选择.md` |
| manifest, install, uninstall, rollback, upgrade | `docs/rules/40-安装卸载回滚.md` |
| crash, error, Mod ineffective, failed verification | `docs/rules/50-调试和问题修复.md` |
| tests, package, release, delivery check | `docs/rules/60-测试发布交付.md` |
| knowledge update or AGENTS.md update | `docs/rules/70-知识库和AGENTS.md` |
| Git commit | `docs/rules/80-git提交规范.md` |

## Project Template

Use `assets/templates/` only for missing non-rule boilerplate files:

- `AGENTS.md`
- `START.md`
- `.gitignore`
- `manifest.json`
- `docs/常规开发流程.md`
- `docs/status.md`
- `docs/v1.md`

Rules live only in project `docs/rules/`; do not copy rule files from skill resources.

The expected project structure is:

```text
.codex/skills/game-mod-dev/SKILL.md
.codex/skills/game-mod-dev/assets/templates/
docs/
docs/status.md
docs/v1.md
docs/常规开发流程.md
docs/rules/
knowledge/
external-mods/
scripts/
mod-files/
package/
backups/
releases/
manifest.json
AGENTS.md
START.md
.gitignore
```
