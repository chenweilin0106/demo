# oh-my-posh 踩坑笔记（Windows + pwsh）

更新时间：2026-03-17

本文记录一次实际安装/配置过程中遇到的典型问题与排查命令，优先给出“可验证的现象”和“稳定的兜底方案”。

## 坑 1：`WindowsApps\oh-my-posh.exe` 看得见但跑不起来

### 现象

- `Get-Command oh-my-posh` 解析到：
  - `C:\Users\tr135\AppData\Local\Microsoft\WindowsApps\oh-my-posh.exe`
- 运行 `oh-my-posh version` 报错（典型）：
  - `系统无法访问此文件`

### 排查命令

```powershell
Get-Command oh-my-posh -All | Format-Table -AutoSize Name,CommandType,Source,Version
Get-ChildItem "$env:LOCALAPPDATA\Microsoft\WindowsApps" -Filter "oh-my-posh*" -Force |
  Format-List FullName,Length,LinkType,Target
```

本次看到该 `oh-my-posh.exe` 的 `Length` 为 `0`，且无法启动。

### 解决/绕过（本次采用）

不要依赖 `WindowsApps` 的执行别名，直接安装并固定调用真实 exe：

- `C:\Users\tr135\AppData\Local\Programs\oh-my-posh\bin\oh-my-posh.exe`

验证：

```powershell
& "$env:LOCALAPPDATA\Programs\oh-my-posh\bin\oh-my-posh.exe" version
```

## 坑 2：官方 `install.ps1` 提示 `Done!`，但命令仍不可用

### 现象（本次表现）

- 执行 `irm https://ohmyposh.dev/install.ps1 | iex` 后提示：
  - `Downloading install-x64.msix...`
  - `Installing MSIX package for current user...`
  - `Done!`
- 但随后：
  - `oh-my-posh version` 仍然命中 `WindowsApps\oh-my-posh.exe`，并继续报“系统无法访问此文件”
  - `Get-AppxPackage -Name "*posh*"` 为空

### 说明

这一类问题往往与 MSIX/App Installer/执行别名注册状态有关；本次没有继续深挖根因，而是直接切换到“独立 exe 方案”确保可用。

### 兜底方案

使用本文《oh-my-posh-安装笔记.md》里的“官方 CDN 直下 exe”方式安装。

## 坑 3：`winget.exe` 同类问题（`WindowsApps` 别名不可用）

### 现象（本次表现）

- `winget --version` 报错同样是：
  - `系统无法访问此文件`
- 路径同样在：
  - `C:\Users\tr135\AppData\Local\Microsoft\WindowsApps\winget.exe`

### 建议

如果系统“执行别名”整体异常（`oh-my-posh`/`winget` 都这样），优先走“独立 exe/显式路径”的方式，或在 Windows 设置里检查 App execution aliases 的开关状态。

## 坑 4：管道/重定向时“乱码”（编码问题）

这部分已单独记录在：

- `C:\Users\tr135\Documents\demo\ohMyPosh笔记\oh-my-posh-自定义主题与乱码排查.md`

本次 Profile 里采用的做法是：只在调用 `oh-my-posh` 期间临时切换 `[Console]::OutputEncoding`/`[Console]::InputEncoding` 到 UTF-8，避免 `oh-my-posh` 输出进入管道后被错误编码解码。

## 快速回滚（仅针对本次配置）

- Profile 已自动备份：`C:\Users\tr135\Documents\PowerShell\Microsoft.PowerShell_profile.ps1.bak.*`
- 回滚思路：
  1) 用备份文件覆盖当前 `Microsoft.PowerShell_profile.ps1`
  2) 删除或保留 `C:\Users\tr135\.poshthemes\the-unnamed.custom.omp.json`（主题文件本身不影响启动）

