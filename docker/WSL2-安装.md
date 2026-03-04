# WSL2 安装（含常见排错与代理）

## 0. 适用范围
- Windows 10/11 + WSL2
- 发行版以 Ubuntu 为例（其他发行版流程类似）

## 1. 安装 WSL2（第一次安装通常需要重启）
1) 用“管理员 PowerShell”执行：
```powershell
wsl.exe --install
```
2) 执行完成后按提示重启 Windows。

## 2. 重启后：确认 WSL2 与发行版
在普通 PowerShell 执行：
```powershell
wsl -l -v
```
- 期望：看到一个发行版（常见是 Ubuntu）且 `VERSION` 为 `2`

如果没有发行版，手动装一个（Ubuntu）：
```powershell
wsl --install -d Ubuntu
```

进入 Ubuntu：
```powershell
wsl -d Ubuntu
```
- 首次初始化会提示创建 Linux 用户并设置密码（输入密码不回显，这是正常现象）。

## 3. 常见排错

### 3.1 `wsl` 报 `E_ACCESSDENIED` / 输出乱码
现象示例：`wsl -l -v` / `wsl --status` 报 `Wsl/EnumerateDistros/Service/E_ACCESSDENIED`，或输出包含大量不可读字符。

处理：用“管理员 PowerShell”重启 WSL 服务（会中断当前 WSL 实例）：
```powershell
Stop-Service -Name WSLService -Force
Start-Service -Name WSLService
wsl --shutdown
wsl -l -v
```

### 3.2 Ubuntu 首次启动“看起来没反应”
- 首次启动可能在做初始化；如果窗口黑屏/卡住，通常是在等待你输入“Linux 用户名/密码”。
- 注意：输入密码时不会回显。

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
- 确保允许局域网访问（通常需要开启 `Allow LAN` 或确保监听地址不是仅 `127.0.0.1`）。

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
