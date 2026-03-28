# Windows Terminal 出现两个 Ubuntu（WSL + Store Fragment）——根因与解决

## 结论（根因一句话）
Windows Terminal 同时加载了：
- **WSL 动态 profile 生成器**（通常 source 为 `Microsoft.WSL` / `Windows.Terminal.Wsl`）
- **Ubuntu 商店应用的 Terminal JSON Fragment 扩展**（source 为 `CanonicalGroupLimited.Ubuntu_79rhkp1fndgsc`）

两边都在生成/更新 Ubuntu profile，于是列表里就会出现两个同名 `Ubuntu`。

## 现象特征
- WSL 那条通常能看到 `commandline: wsl.exe --distribution-id {GUID}`。
- 商店 fragment 那条通常是 `commandline: ubuntu.exe`，并带 Ubuntu 图标/配色；有时标记为 `hidden: true` 但在“设置 > 配置文件”左侧仍会显示。

## 为什么另一台电脑只有一个
如果没有安装商店 Ubuntu（`Get-AppxPackage CanonicalGroupLimited.Ubuntu` 为空），或该 Ubuntu 是 `wsl --import` 导入版（注册表 `PackageFamilyName` 为空），Windows Terminal 只会看到 WSL 动态生成的那一条，所以只有一个 `Ubuntu`。

## 处理目标（本次选择）
- **保留 WSL 的 Ubuntu**（日常用 `wsl -d Ubuntu` 启动）
- **移除商店 Ubuntu 带来的额外 profile**（避免设置页/菜单重复）

## 实操步骤（已验证）

### 1) 先备份发行版（建议）
```powershell
wsl --terminate Ubuntu
wsl --export Ubuntu C:\Users\tr135\wsl-backups\Ubuntu-export-20260328.tar
```
说明：导出时可能提示 `pax format cannot archive sockets`（比如 tmux/编辑器产生的 socket 文件），一般不影响备份可用性。

### 2) 卸载商店 Ubuntu（移除 fragment 来源）
```powershell
Get-AppxPackage CanonicalGroupLimited.Ubuntu | Remove-AppxPackage
```
注意：如果你的 Ubuntu 本身就是“商店版发行版”（注册表 `PackageFamilyName` 非空且指向 `CanonicalGroupLimited.Ubuntu_...`），卸载可能会连发行版一起移除；务必先 `wsl --export`。

### 3) 清理 Windows Terminal `settings.json` 里残留的重复项
Store 版 Windows Terminal 设置文件：
`%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json`

在 `profiles.list` 里删除 `source: CanonicalGroupLimited.Ubuntu_79rhkp1fndgsc` 那条（本机当时 guid 为 `{51855cb2-8cce-5362-8f54-464b92b32386}`），保留 `source: Microsoft.WSL` 那条。

### 4) 重启 Windows Terminal
完全退出所有 Windows Terminal 窗口后重开。

### 5) 验证
```powershell
Get-AppxPackage CanonicalGroupLimited.Ubuntu
(wsl -l -v) | ForEach-Object { $_ -replace "`0", "" }
```
并确认 `settings.json` 里只剩一个 Ubuntu profile。

## 参考
- Windows Terminal JSON fragment extensions: https://learn.microsoft.com/windows/terminal/json-fragment-extensions
- Windows Terminal dynamic profiles: https://learn.microsoft.com/windows/terminal/dynamic-profiles
