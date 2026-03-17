# oh-my-posh 安装笔记（Windows + pwsh）

更新时间：2026-03-17

本文记录在 Windows 上安装 `oh-my-posh` 的一套“可落地、可验证”的做法，目标是确保在 `pwsh` 里能稳定运行，并且避免 `WindowsApps` 执行别名带来的“看得见但跑不起来”问题。

## 环境信息（本次实测）

- PowerShell：`pwsh 7.5.4`
- 系统：Windows（`10.0.22631`）

## 推荐安装方式（本次最终采用）

直接从官方 CDN 下载独立可执行文件（`posh-windows-amd64.exe`），落地到用户目录：

- 目标路径：`C:\Users\tr135\AppData\Local\Programs\oh-my-posh\bin\oh-my-posh.exe`

### 安装命令

在 `pwsh` 里执行：

```powershell
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

$destDir = Join-Path $env:LOCALAPPDATA 'Programs\oh-my-posh\bin'
New-Item -ItemType Directory -Force -Path $destDir | Out-Null

$destExe = Join-Path $destDir 'oh-my-posh.exe'
Invoke-WebRequest -Uri 'https://cdn.ohmyposh.dev/releases/latest/posh-windows-amd64.exe' -OutFile $destExe

& $destExe version
```

期望输出类似：`29.9.0`。

### 验证命令

```powershell
& "$env:LOCALAPPDATA\Programs\oh-my-posh\bin\oh-my-posh.exe" version
```

## 与 PowerShell Profile 集成（初始化主题）

本机当前 Profile 路径（可用 `$PROFILE` 查看）：

- `C:\Users\tr135\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`

建议在 Profile 里：

1) 固定 `oh-my-posh.exe` 的真实路径（避免命中 `WindowsApps` 别名）
2) 固定主题路径（建议放到 `$HOME\.poshthemes`，避免升级覆盖）
3) 调用 `oh-my-posh init pwsh --config <theme> --plain | Invoke-Expression`

示例（示意，按需替换主题路径）：

```powershell
$global:ompExe = Join-Path $env:LOCALAPPDATA 'Programs\oh-my-posh\bin\oh-my-posh.exe'
$global:ompTheme = Join-Path $HOME '.poshthemes\the-unnamed.custom.omp.json'

if (Test-Path -LiteralPath $global:ompTheme) {
    & $global:ompExe init pwsh --config $global:ompTheme --plain | Invoke-Expression
}
```

## 可选：把 oh-my-posh 加到 PATH

如果你希望在任何终端里都能直接执行真实可执行文件（而不是 `WindowsApps` 别名），可以把下面目录加入“用户 PATH”：

- `C:\Users\tr135\AppData\Local\Programs\oh-my-posh\bin`

建议用系统环境变量 GUI 添加，避免脚本误写 PATH。

