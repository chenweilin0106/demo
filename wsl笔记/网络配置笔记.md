# WSL 网络模式 & 代理配置笔记（面向人工/AI按步骤配置）

目标：在不同组合下，让 WSL 的流量**进入 Clash/Mihomo 内核**按规则处理（A：规则环境），并记录可复现的配置顺序、验证方式与踩坑。

> 术语约定
> - **TUN（透明代理）**：在 Windows 侧启用虚拟网卡/透明接管，Linux 程序无需 `http_proxy` 也可能被接管。
> - **显式代理（环境变量）**：在 WSL 里设置 `http_proxy/https_proxy/all_proxy` 等，应用会走 HTTP CONNECT / SOCKS。
> - **NAT / mirrored**：WSL2 两种网络模式，由 `%USERPROFILE%\.wslconfig` 控制。

---

## 0. 快速判断当前状态

### 0.1 判断 NAT / mirrored
在 WSL 里执行：

```sh
ip -br a
ip route | sed -n '1,6p'
```

经验判断：
- **NAT**：常见只看到 `eth0=172.*`（或 `172.16/12` 网段），默认路由类似 `via 172.*.*.1`。
- **mirrored**：常见会看到额外网卡，例如 `eth1=192.168.*`（局域网网段）以及一条 `198.18.0.1/30` 的内部链路与网关 `198.18.0.2`。

### 0.2 判断 WSL 是否“显式代理”

```sh
env | grep -i -E '^(http|https|all|no)_proxy=' || echo "(none)"
```

- 有输出：代表 WSL 里**显式代理已开启**（很多工具会优先走它）。
- 无输出：代表 WSL 没有显式代理（若 Windows 开了 TUN，仍可能被透明接管）。

### 0.3 判断是否进入 Clash/Mihomo 内核（A：规则环境）
推荐两种验证（任选其一）：

1) **看 Clash/Mihomo 连接日志**：能看到来自 WSL 进程的连接记录（最可靠）。

2) **Fake-IP 证据（仅当 Clash DNS Enhanced=Fake-IP 时适用）**：

```sh
getent hosts api.ipify.org
curl -m 5 -sS https://api.ipify.org && echo
```

- 若 `api.ipify.org` 解析到 `198.18.*` / `198.19.*`（常见 fake-ip 网段），但 HTTPS 仍能成功：基本可以确定有透明层在做映射（典型是 TUN + fake-ip）。

---

## 1. 切换 WSL 网络模式（NAT / mirrored）

> 切换会重启所有 WSL 实例（含 `docker-desktop`）。

1) 编辑 `%USERPROFILE%\.wslconfig`（Windows 路径：`C:\Users\<你>\.wslconfig`）

- 切换到 mirrored：

```ini
[wsl2]
networkingMode=mirrored
```

- 切换到 NAT：

```ini
[wsl2]
networkingMode=nat
```

2) 应用配置：

```powershell
wsl --shutdown
```

3) 重新打开 WSL，回到「0.1」确认模式。

---

## 2. 场景一：mirrored + TUN（推荐）

适用目标：你在 Windows 侧启用 Clash/Mihomo **TUN 透明代理**，希望 WSL “像主机一样”按规则处理流量（A）。

### 配置顺序
1) Windows：打开 Clash Verge Rev / Mihomo，启用 **TUN**（透明代理）。
2) Windows：WSL 设置为 `mirrored`（见第 1 节）。
3) WSL：确保没有显式代理环境变量（避免覆盖/干扰透明接管）：

```sh
unset http_proxy https_proxy all_proxy no_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY NO_PROXY
```

4) （可选但强烈建议）把你自己的 shell 配置里自动注入 `*_proxy` 的逻辑删掉/禁用（见“踩坑”）。

### 验证
```sh
env | grep -i -E '^(http|https|all|no)_proxy=' || echo "(none)"
getent hosts api.ipify.org
curl -m 5 -sS https://api.ipify.org && echo
```

### 回滚
- 关 TUN：WSL 仍可直连上网，但**不会自动**走 Windows 系统代理；想走代理需改用“显式代理”（见场景四）。

---

## 3. 场景二：NAT + TUN（可用）

结论（本机已验证）：在 **NAT + TUN** 下，同样可以做到 WSL 不配 `*_proxy` 也进入内核按规则处理。

### 配置顺序
1) Windows：启用 TUN。
2) WSL：保持 NAT（默认就是 NAT；或按第 1 节显式设为 `networkingMode=nat`）。
3) WSL：不设置显式代理环境变量（同场景一）。

### 验证
同场景一。

---

## 4. 场景三：mirrored（无 TUN，仅系统代理/端口代理）

适用目标：你**不开 TUN**，只想让 WSL 走 Windows 上的 HTTP/SOCKS 代理端口。

### 配置顺序
1) WSL：设置为 `mirrored`。
2) Windows：确认 Clash/Mihomo 的代理端口在本机可用（如 Mixed Port/HTTP Port，按你的软件设置为准）。
3) WSL：设置显式代理（推荐先临时设置，验证通过再写入持久化配置）：

```sh
export http_proxy="http://127.0.0.1:7897"
export https_proxy="$http_proxy"
export all_proxy="$http_proxy"
export no_proxy="localhost,127.0.0.1"

export HTTP_PROXY="$http_proxy"
export HTTPS_PROXY="$https_proxy"
export ALL_PROXY="$all_proxy"
export NO_PROXY="$no_proxy"
```

> 端口 `7897` 只是示例：以你 Clash/Mihomo 实际端口为准。

### 验证
```sh
curl -v -m 5 https://api.ipify.org 2>&1 | sed -n '1,40p'
```

看到类似 `Uses proxy env variable https_proxy` / `CONNECT tunnel` 说明确实走了显式代理。

### 回滚
```sh
unset http_proxy https_proxy all_proxy no_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY NO_PROXY
```

---

## 5. 场景四：NAT（无 TUN，仅系统代理/端口代理）

适用目标：你不开 TUN，但仍希望 WSL 走 Windows 的代理端口。

### 配置顺序（关键点：Windows 侧要允许 WSL 访问代理端口）
1) WSL：保持 NAT。
2) Windows：在 Clash/Mihomo 开启“允许局域网连接（Allow LAN）”或让代理监听 `0.0.0.0`（否则只监听 `127.0.0.1` 时，WSL 往往连不上）。
3) WSL：取 Windows 网关 IP（NAT 下通常是默认路由的 `via`）：

```sh
WIN_GW=$(ip route | awk '/default/ {print $3; exit}')
echo "$WIN_GW"
```

4) WSL：设置显式代理为 `http://$WIN_GW:<端口>`：

```sh
export http_proxy="http://$WIN_GW:7897"
export https_proxy="$http_proxy"
export all_proxy="$http_proxy"
export no_proxy="localhost,127.0.0.1,$WIN_GW"

export HTTP_PROXY="$http_proxy"
export HTTPS_PROXY="$https_proxy"
export ALL_PROXY="$all_proxy"
export NO_PROXY="$no_proxy"
```

### 验证
同场景三。

---

## 6. 持久化配置建议（给 AI 也好操作）

优先级建议（从“少坑”到“多坑”）：

1) **TUN 透明代理**：尽量不在 WSL 里写 `*_proxy`；只在需要时临时设置。
2) 需要显式代理时：优先写入 `/etc/environment`（系统级、非交互 shell 也生效）或写在你明确知道会被加载的文件里。

注意：
- 交互式 `bash` 会加载 `~/.bashrc`；但 `wsl -e sh -lc '...'` 通常不会加载 `~/.bashrc`。
- 如果你把代理写在 `~/.bashrc`，请避免“默认自动开启”，否则很容易把透明代理环境搞乱。

---

## 7. 踩坑记录（高频）

### 7.1 `curl: (56) Proxy CONNECT aborted` / `Connection reset by peer`
大概率原因：WSL 里设置了 `*_proxy`，但代理地址/端口不可达或不该这么配。

快速定位：

```sh
env | grep -i proxy
curl -v -m 5 https://api.ipify.org 2>&1 | sed -n '1,80p'
```

快速绕过（验证是不是代理惹的祸）：

```sh
curl -q --noproxy '*' -m 5 -sS https://api.ipify.org && echo OK || echo FAIL
```

- 若绕过后 OK：说明问题在显式代理配置，不在网络本身。

### 7.2 `.bashrc` 自动注入代理（最坑）
现象：你以为“没配代理”，但新开一个终端就自动出现 `http_proxy/https_proxy/...`。

检查：
```sh
grep -nEi '(http|https|all|no)_proxy' ~/.bashrc || true
```

建议：
- 用 TUN 时，别自动 `export *_proxy`。
- 需要时手动开关即可（例如 `proxy_on/proxy_off`），不要默认 `proxy_on`。

### 7.3 切换 `.wslconfig` 后没生效
必须执行：

```powershell
wsl --shutdown
```

然后重新打开 WSL。

### 7.4 mirrored 下的 `198.18.0.1/30` 不等于 fake-ip
mirrored 模式里经常出现 `198.18.0.1/30` 和网关 `198.18.0.2`（WSL 内部链路）。
fake-ip 常见也是 `198.18.*`/`198.19.*`，但通常不在 `198.18.0.0/30` 这个小网段内。

---

## 8. 本机实测结论（2026-03-27）

- `mirrored + TUN`：`*_proxy` 为空；`api.ipify.org` 可解析到 `198.18.*`（fake-ip）；HTTPS 请求稳定成功。
- `NAT + TUN`：同样无需 `*_proxy`，同样可稳定成功。

（其余“无 TUN + 显式代理”的组合为常识性配置路径：建议你按第 4/5 节执行一次并在此处补充自己的实测结果。）
