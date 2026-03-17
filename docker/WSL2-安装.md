# WSL2 安装（含常见排错与代理）

## 0. 适用范围
- Windows 10/11 + WSL2
- 发行版以 Ubuntu 为例（其他发行版流程类似）

## 0.1 先说两个“最容易误判”的点（建议读完再装）
- **WSL 版本差异很大**：同样是 `C:\Windows\System32\wsl.exe`，不同系统/更新阶段的 `wsl --help` 参数集会不一样。若你在 `wsl --help` 里看不到 `--version` / `--location` / `--manage`，通常是旧版；跑一遍 `wsl --install --web-download` 或 `wsl --update` 后经常会“升级到新参数集”。
- **安装完成不等于立刻可用**：`wsl --install ...` 可能只提示“请求的操作成功。直到重新启动系统前更改将不会生效。”；此时不重启，`wsl --status` 可能继续显示“不支持 WSL2 / 没有发行版”等，看起来像装失败，实际是还没生效。

## 1. 安装 WSL2（第一次安装通常需要重启）
1) 用“管理员 PowerShell”执行：
```powershell
wsl.exe --install -d Ubuntu --web-download
```
如果你的 `wsl.exe` 不支持 `--web-download`（提示未知选项），用下面这个回退命令：
```powershell
wsl.exe --install -d Ubuntu
```
2) 执行完成后按提示重启 Windows。

## 2. 重启后：确认 WSL2 与发行版
在普通 PowerShell 执行：
```powershell
wsl --status
wsl -l -v
```
- 期望：看到一个发行版（常见是 Ubuntu）且 `VERSION` 为 `2`

如果没有发行版，手动装一个（Ubuntu）：
```powershell
wsl --install -d Ubuntu --web-download
```
如果你的 `wsl` 不支持 `--web-download`，回退为：
```powershell
wsl --install -d Ubuntu
```

进入 Ubuntu：
```powershell
wsl -d Ubuntu
```
- 首次初始化会提示创建 Linux 用户并设置密码（输入密码不回显，这是正常现象）。

## 2.1 （可选）把 Ubuntu 安装到指定目录（例如 `C:\softwear\WSL\Ubuntu`）
说明：
- 只有当 `wsl --help` 里包含 `--install ... --location <Location>` 时，才支持直接指定安装目录。
- 目标目录需要**有写权限**。例如 `C:\softwear` 这类目录经常“能读但不能写”，建议管理员先建好目录并给当前用户授权。

管理员 PowerShell 示例：
```powershell
$loc = 'C:\softwear\WSL\Ubuntu'
New-Item -ItemType Directory -Force $loc | Out-Null
icacls (Split-Path -Parent $loc) /grant "$env:USERDOMAIN\$env:USERNAME:(OI)(CI)M" /T

wsl.exe --install -d Ubuntu --location $loc --web-download
```

如果你已经装过 Ubuntu，且 `wsl --help` 里包含 `wsl --manage <Distro> --move <Location>`，也可以迁移：
```powershell
wsl --shutdown
wsl --manage Ubuntu --move C:\softwear\WSL\Ubuntu
```

## 3. 常见排错

### 3.0 `wsl --status` 仍提示“不支持 WSL2”/ `wsl -l -v` 显示“没有发行版”
优先检查两件事：
- 是否**还没重启**（很多情况下重启一次就好）。
- Windows 可选组件是否真的启用（`wsl --install` 有时会提示成功但组件仍处于“未启用/待重启”）。

用“管理员 PowerShell”核对状态：
```powershell
dism.exe /online /Get-FeatureInfo /FeatureName:Microsoft-Windows-Subsystem-Linux
dism.exe /online /Get-FeatureInfo /FeatureName:VirtualMachinePlatform
```

如果显示 `状态 : 已禁用`，用管理员启用（不立即重启）：
```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```
然后**重启 Windows**，再执行：
```powershell
wsl --status
wsl --install -d Ubuntu --web-download
wsl -l -v
```

如果你在 `wsl --status` 里看到提示去 BIOS 开虚拟化：请先在 BIOS 开启 Intel VT-x/AMD-V；在 Windows 里也可以用 `systeminfo` 查看 `Virtualization Enabled In Firmware` 是否为 `Yes`。

### 3.1 `wsl` 报 `E_ACCESSDENIED` / 输出乱码
现象示例：`wsl -l -v` / `wsl --status` 报 `Wsl/EnumerateDistros/Service/E_ACCESSDENIED`，或输出包含大量不可读字符。

处理：用“管理员 PowerShell”重启 WSL 服务（会中断当前 WSL 实例）：
```powershell
Stop-Service -Name WSLService -Force
Start-Service -Name WSLService
wsl --shutdown
wsl -l -v
```
如果仍然报错，优先**重启 Windows**后再试（组件启用/更新后常见需要重启）。

### 3.2 Ubuntu 首次启动“看起来没反应”
- 首次启动可能在做初始化；如果窗口黑屏/卡住，通常是在等待你输入“Linux 用户名/密码”。
- 注意：输入密码时不会回显。

### 3.3 `wsl -l -o` 提示“无法与服务器建立连接”
这通常是网络/代理导致的，不代表 WSL2 本体装不上。
- 可直接按发行版名称安装：`wsl --install -d Ubuntu --web-download`
- 若你需要先验证代理，再按本文第 5 节配置（Clash Mixed Port `7897`）。

## 4. （可选）把 Ubuntu 的 `sudo` 设为免密（仅建议本机开发环境）
风险：免密会降低系统防护（任何拿到你 WSL 终端权限的进程都可提权）。

说明：第一次执行下面命令仍会要求你输入一次密码（因为你正在用 `sudo` 写入 sudoers）；配置成功后，后续 `sudo` 才会免密。

命令：
```bash
echo "$USER ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/99-wsl-nopasswd >/dev/null
sudo chmod 0440 /etc/sudoers.d/99-wsl-nopasswd
sudo visudo -cf /etc/sudoers.d/99-wsl-nopasswd
sudo -n true && echo OK
```

## 5. 代理（Clash Verge Mixed Port `7897`）

### 5.1 Windows 端准备
- Clash Verge 端口为 `7897`（Mixed Port）。
- **确保允许局域网访问（非常关键）**：开启 `Allow LAN/允许局域网`，并确保 Mixed Port 不是只监听 `127.0.0.1`，否则 WSL2 里无法连到 Windows 代理端口。

快速自检（Windows 端）：
```powershell
netstat -ano | findstr ":7897"
```
- 期望看到 `0.0.0.0:7897` / `[::]:7897` 在 `LISTENING`
- 如果只看到 `127.0.0.1:7897`：打开 Clash Verge 的 `Allow LAN`（或把监听地址改为 `0.0.0.0`）并重启内核

### 5.2 Ubuntu 里获取 Windows 网关 IP（WSL2 视角）
```bash
WIN_IP=$(ip route | awk '/default/ {print $3; exit}')
echo $WIN_IP
```

### 5.3 临时生效（只对当前终端）
```bash
export http_proxy="http://$WIN_IP:7897"
export https_proxy="http://$WIN_IP:7897"
export all_proxy="http://$WIN_IP:7897"
export no_proxy="localhost,127.0.0.1,$WIN_IP"
```

测试：
```bash
env | grep -i proxy
curl -I https://github.com
```
- 若返回里出现 `HTTP/1.1 200 Connection established`，一般可判断已通过 HTTP CONNECT 走代理。

### 5.4 永久生效（写入 `~/.bashrc`，默认自动开启）
```bash
cat >> ~/.bashrc <<'EOF'

# WSL -> Windows Clash Verge (Mixed Port 7897)
wsl_win_ip() { ip route | awk '/default/ {print $3; exit}'; }
proxy_on() {
  local WIN_IP
  WIN_IP="$(wsl_win_ip)"
  export http_proxy="http://${WIN_IP}:7897"
  export https_proxy="http://${WIN_IP}:7897"
  export all_proxy="http://${WIN_IP}:7897"
  export no_proxy="localhost,127.0.0.1,${WIN_IP}"
}
proxy_off() { unset http_proxy https_proxy all_proxy no_proxy; }
proxy_status() { env | grep -iE '^(http|https|all|no)_proxy='; }

proxy_on
EOF

source ~/.bashrc
proxy_status
```

### 5.5 重启 WSL 后复测
在 Windows 端执行：
```powershell
wsl --shutdown
wsl -d Ubuntu
```
再在 Ubuntu 里执行：
```bash
proxy_status
curl -I https://github.com
```
