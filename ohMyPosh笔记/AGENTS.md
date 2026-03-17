# Repository Guidelines

本仓库是 `oh-my-posh` 主题预览脚本的笔记/工具集合，当前以 PowerShell 脚本为主，适合在 Windows + `pwsh` 环境使用。

## 项目结构与模块组织

- `Preview-OhMyPoshThemes.ps1`：一次性滚动预览主题，预览结束后可选择“仅当前会话启用/写入 Profile 永久启用”（需要 PowerShell 7）。
- `omp-preview.ps1`：按键翻页预览主题，支持按名称过滤/仅列出（更轻量）。

## 本地运行与常用命令

前置条件：已安装 `oh-my-posh`，并能在当前会话直接运行 `oh-my-posh`；主题目录通常由环境变量 `POSH_THEMES_PATH` 指定（或使用脚本内的默认候选路径）。

- 交互滚动预览：`pwsh -NoProfile -File .\Preview-OhMyPoshThemes.ps1`
- 过滤主题：`pwsh -NoProfile -File .\Preview-OhMyPoshThemes.ps1 -Filter '*robby*'`
- 仅列出主题：`pwsh -NoProfile -File .\Preview-OhMyPoshThemes.ps1 -ListOnly`
- 翻页预览：`pwsh -NoProfile -File .\omp-preview.ps1 -Pattern minimal`

## 编码风格与命名约定

- 脚本保持 PowerShell 常规写法：函数使用 `Verb-Noun`（如 `Resolve-ThemePath`），尽量启用 `Set-StrictMode`，错误用 `$ErrorActionPreference = 'Stop'` 明确失败。
- 保持与现有脚本一致：优先小步改动、可读性第一；输出信息直接说明“做了什么/为什么失败/下一步怎么做”。

## 测试与验证

当前未配置自动化测试。修改后请至少做以下手工验证：

- `-ListOnly` / `-List` 在重定向或无交互环境下可正常输出。
- `-ThemePath`、`POSH_THEMES_PATH` 缺失时给出明确报错与修复建议。
- 预览命令构造正确（`oh-my-posh print preview --config <theme>`）。

## 提交与 PR 规范

仓库当前未检测到 `.git` 历史，无法从既有提交归纳规范。若后续启用 Git，建议采用简短前缀：
`feat:`、`fix:`、`docs:`、`chore:`，并在 PR 描述中说明：动机、影响范围、验证方式（必要时附运行截图/录屏）。

## 安全与配置提示

- 如遇到 “Failed to write init script … Access is denied”，优先检查用户目录权限/安全软件拦截，并避免用管理员会话混用普通用户配置。
- 永久写入 Profile 前脚本会备份；仍建议在企业环境下先走评审流程再修改登录脚本。
