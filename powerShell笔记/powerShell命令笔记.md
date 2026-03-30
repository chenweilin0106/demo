# PowerShell 命令笔记（常用速查）

更新时间：2026-03-29

> 约定：`<...>` 表示占位符；示例默认在 Windows PowerShell 5.1 / PowerShell 7+ 下执行；路径含空格/中文时优先用单引号并配合 `-LiteralPath`；写文件编码在 PS 5.1/PS7 有差异，建议显式 `-Encoding UTF8`（PS7 默认 UTF-8）。

## 帮助与发现命令

```powershell
Get-Help <命令> -Examples           # 看示例（最常用）
Get-Help <命令> -Full               # 看完整帮助
Get-Help about_*                    # 查看概念性帮助（about_ 主题）
Update-Help -Scope CurrentUser      # 更新本地帮助（更少权限坑；可能需要网络）

Get-Command <命令或关键字>          # 查命令（支持通配符：Get-Command *json*）
Get-Alias                           # 查看别名（如 ls、rm、cat 等）
Get-Alias <别名>                    # 看某个别名映射到哪个命令
Get-Member                          # 查看对象“有什么属性/方法”（管道里常用）
```

## 目录与路径

```powershell
Get-Location                        # 当前目录（别名：pwd）
Set-Location <目录>                 # 切目录（别名：cd）
Set-Location -Path ..               # 上一级
Push-Location <目录>                # 入栈（临时切目录）
Pop-Location                        # 出栈（回到上一次 Push 的目录）

Get-ChildItem                       # 列表（别名：ls、dir）
Get-ChildItem -Force                # 包含隐藏项

Test-Path -LiteralPath <路径>       # 判断路径是否存在
Resolve-Path -LiteralPath <路径>    # 解析为绝对路径
Split-Path -Parent <路径>           # 取父目录
Join-Path <目录> <子路径>           # 拼路径（比手写 \\ 更稳）
```

## 文件与目录操作

```powershell
New-Item -ItemType Directory -Path <目录>            # 新建目录（类似 mkdir）
New-Item -ItemType File -Path <文件>                 # 新建空文件

Copy-Item -LiteralPath <源> -Destination <目标>      # 复制（目录加 -Recurse）
Copy-Item -LiteralPath <目录> -Destination <目标> -Recurse

Move-Item -LiteralPath <源> -Destination <目标>      # 移动/重命名
Rename-Item -LiteralPath <文件> -NewName <新文件名>  # 重命名（同目录）

Remove-Item -LiteralPath <文件> -Force               # 删除文件（不可恢复）
Remove-Item -LiteralPath <目录> -Recurse -Force      # 删除目录（不可恢复）
Remove-Item -LiteralPath <路径> -Recurse -Force -WhatIf # 先演练（不真正删除）
```

> 提醒：`Remove-Item -Recurse -Force` 很危险；路径含 `[]` 等通配符字符时务必用 `-LiteralPath`。

## 查看/编辑文件内容

```powershell
Get-Content -LiteralPath <文件>                      # 读全文（大文件慎用）
Get-Content -LiteralPath <文件> -TotalCount 50       # 只读前 50 行
Get-Content -LiteralPath <文件> -Tail 50             # 读最后 50 行
Get-Content -LiteralPath <文件> -Tail 50 -Wait       # 类似 tail -f

Set-Content -LiteralPath <文件> -Value "<内容>" -Encoding UTF8 # 覆盖写入（建议显式编码）
Add-Content -LiteralPath <文件> -Value "<内容>" -Encoding UTF8 # 追加写入（建议显式编码）
```

## 查找与搜索

```powershell
Get-ChildItem -Path . -Recurse -File -Filter "*.log" # 按文件名查找（递归）
Get-ChildItem -Path . -Recurse -Directory -Filter "dist" # 找目录

Get-ChildItem -Path . -Recurse -File -Filter *.ts | Select-String -Pattern "<关键字>" # 递归搜索（支持正则）
Select-String -Path <文件> -Pattern "<关键字>" -CaseSensitive

# 结合管道筛选
Get-ChildItem -Recurse -File | Where-Object Name -like "*.md"
```

## 进程与服务

```powershell
Get-Process                           # 进程列表
Get-Process -Name <进程名>            # 按名查（不带 .exe）
Stop-Process -Id <PID> -Force         # 杀进程（谨慎）

Start-Process <程序或路径>            # 启动程序
Start-Process <程序> -ArgumentList "<参数>" -Wait

Get-Service                           # 服务列表
Get-Service -Name <服务名>            # 查服务
Restart-Service -Name <服务名>        # 重启服务（可能需要管理员）
```

## 网络与请求（常用）

```powershell
Test-Connection <域名或IP> -Count 4   # 类似 ping（ICMP）
Test-NetConnection <域名> -Port 443   # 端口连通性（常用排查）

Invoke-WebRequest <URL>               # 下载/抓网页（返回较“重”的对象）
Invoke-RestMethod <URL>               # 调 API（自动解析 JSON 更友好）

Resolve-DnsName <域名>                # DNS 查询

Get-NetTCPConnection -State Listen    # 查看监听端口（部分场景需管理员）
```

> 小坑：在 PowerShell 里 `curl`/`wget` 可能是别名（`Invoke-WebRequest`）。想用系统自带的 curl，请用 `curl.exe <URL>`。
>
> 说明：`Get-NetTCPConnection/Test-NetConnection/Resolve-DnsName` 主要在 Windows 上可用；没这些命令时可用 `netstat -ano` 兜底。

## 压缩与解压

```powershell
Compress-Archive -Path <文件或目录> -DestinationPath <包名>.zip
Expand-Archive -LiteralPath <包名>.zip -DestinationPath <目录>
```

## 环境变量与配置

```powershell
$env:PATH                              # 查看 PATH（当前进程）
$env:MY_VAR = "value"                  # 设置环境变量（仅当前窗口）
Remove-Item env:MY_VAR                 # 删除当前窗口的环境变量

[Environment]::GetEnvironmentVariable("PATH", "User")    # 读用户级
[Environment]::SetEnvironmentVariable("MY_VAR", "v", "User") # 写用户级（新窗口生效）

Get-ExecutionPolicy -List              # 查看执行策略
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned      # 允许本地脚本（谨慎）
```

## JSON / CSV（数据处理）

```powershell
Get-Content -Raw <文件>.json | ConvertFrom-Json            # JSON -> 对象（建议 -Raw）
<对象> | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath <文件>.json -Encoding UTF8

Import-Csv <文件>.csv                                # CSV -> 对象
<对象数组> | Export-Csv <文件>.csv -NoTypeInformation -Encoding UTF8
```

## 管道与对象（PowerShell 特色）

```powershell
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10
Get-ChildItem -File | Group-Object Extension | Sort-Object Count -Descending

# 格式化输出（看得舒服）
Get-Service | Select-Object Name, Status, StartType | Format-Table -AutoSize
Get-Item <路径> | Format-List *                         # 看对象全部属性
```

## 常用一行命令（实用）

```powershell
Clear-Host                           # 清屏（别名：cls）
Get-History                          # 查看历史命令
Get-Clipboard                        # 读取剪贴板
Set-Clipboard -Value "<文本>"        # 写入剪贴板

# 删除当前目录下所有 node_modules（先演练，再真正删除）
Get-ChildItem -Directory -Recurse -Filter node_modules | Remove-Item -Recurse -Force -WhatIf
Get-ChildItem -Directory -Recurse -Filter node_modules | Remove-Item -Recurse -Force

# 看端口占用（3000 为例）
Get-NetTCPConnection -LocalPort 3000 | Select-Object -First 20
netstat -ano | findstr :3000         # 兜底：查看端口占用

# 删除目录（不进回收站、不可恢复）
Remove-Item -LiteralPath 'C:\path\to\dir' -Recurse -Force -Confirm:$false
```

## 高风险命令提示（务必小心）

```powershell
Remove-Item -Recurse -Force <路径>     # 极其危险：写错路径基本不可恢复
```
