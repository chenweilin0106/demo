# Codex 安装笔记（windows）

## 前置条件
- 使用 Windows Terminal 或系统终端执行命令
- 建议先安装 PowerShell 7，并把 Windows Terminal 默认 profile 设为 PowerShell 7
- 如果机器已有旧版 Node/npm，先确认 PATH 不会混到其他 Node 版本

## 1) 安装 PowerShell 7
使用 `winget` 安装：

```powershell
winget install --id Microsoft.PowerShell --source winget
```

安装后验证：

```powershell
pwsh --version
Get-Command pwsh
```

期望 `pwsh` 路径类似：

```text
C:\Program Files\PowerShell\7\pwsh.exe
```

## 2) 设置 Windows Terminal 默认 profile
打开 Windows Terminal 设置：

```powershell
wt
```

在设置里调整：

```text
启动 > 默认配置文件 > PowerShell
```

注意选择的是 PowerShell 7 的 `PowerShell`，不是旧版 `Windows PowerShell`。

## 3) 设置 PowerShell UTF-8 全局读写
建议同时配置 PowerShell 5 和 PowerShell 7，因为 Windows 里的工具或脚本可能仍会调用 `powershell.exe`。

PowerShell 5 profile：

```text
C:\Users\<你>\Documents\WindowsPowerShell\profile.ps1
```

PowerShell 7 profile：

```text
C:\Users\<你>\Documents\PowerShell\profile.ps1
```

两个文件都加入：

```powershell
# 默认使用 UTF-8 读写，避免中文内容在 PowerShell 管道、重定向与文件命令中乱码
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$global:OutputEncoding = $utf8NoBom
[Console]::InputEncoding = $utf8NoBom
[Console]::OutputEncoding = $utf8NoBom
$PSDefaultParameterValues['*:Encoding'] = 'UTF8'
```

PowerShell 7 额外加入：

```powershell
$global:PSNativeCommandEncoding = $utf8NoBom
```

验证：

```powershell
"PSVersion=$($PSVersionTable.PSVersion)"
"OutputEncoding=$($OutputEncoding.WebName)"
"ConsoleInput=$([Console]::InputEncoding.WebName)"
"ConsoleOutput=$([Console]::OutputEncoding.WebName)"
"DefaultEncoding=$($PSDefaultParameterValues['*:Encoding'])"
```

期望输出包含：

```text
OutputEncoding=utf-8
ConsoleInput=utf-8
ConsoleOutput=utf-8
DefaultEncoding=UTF8
```

注意：如果命令带了 `-NoProfile`，profile 不会加载，需要在命令开头临时设置 UTF-8。

## 4) 安装 nvm-windows
使用 `winget` 安装：

```powershell
winget install --id CoreyButler.NVMforWindows --source winget
```

安装后新开一个 PowerShell 7 终端，验证：

```powershell
nvm version
nvm root
```

## 5) 安装并选择 Node
先查看可安装版本：

```powershell
nvm list available
```

安装一个 LTS 版本，例如：

```powershell
nvm install 22
nvm use 22
```

验证当前 Node：

```powershell
node -v
npm -v
node -p "process.platform"
Get-Command node
```

期望 `process.platform` 输出：

```text
win32
```

## 6) 安装 Codex
使用 npm 全局安装：

```powershell
npm i -g @openai/codex@latest
```

说明：如确实需要临时固定版本，把 `@latest` 换成具体版本号即可（例如 `@x.y.z`）。

## 7) 验证
```powershell
codex --version
Get-Command codex
Get-Command codex.cmd
```

期望：
- `codex` 路径类似：`C:\Program Files\nodejs\codex.ps1`
- `codex.cmd` 路径类似：`C:\Program Files\nodejs\codex.cmd`

## 8) 常见问题
- Windows Terminal 打开的不是 PowerShell 7
  - 检查默认 profile 是否是 `PowerShell`
  - 不要选 `Windows PowerShell`，那是 PowerShell 5

- 新开终端找不到 `nvm`
  - 先关闭所有终端后重新打开
  - 再检查 `nvm root` 是否正常

- 切换 Node 版本后 `codex` 不见了
  - 正常现象：全局包跟随当前 Node 版本
  - 在新版本下重新安装：`npm i -g @openai/codex@latest`

- PowerShell 读写中文乱码
  - 先确认 profile 里的 UTF-8 设置是否加载
  - 如果命令使用 `-NoProfile`，在命令开头临时设置：

  ```powershell
  $utf8NoBom = New-Object System.Text.UTF8Encoding $false
  $global:OutputEncoding = $utf8NoBom
  [Console]::InputEncoding = $utf8NoBom
  [Console]::OutputEncoding = $utf8NoBom
  ```

- `codex` 命中 WSL 或其他 Node 路径
  - 用 `Get-Command codex` 确认路径
  - Windows 原生环境下应命中 Windows Node 的全局安装路径，不应是 `\\wsl.localhost\...` 或 `/mnt/c/...`
