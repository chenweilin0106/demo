# chrome-devtools-mcp 安装与验证（Codex CLI）

上游仓库：`ChromeDevTools/chrome-devtools-mcp`

这份文档用于在本机安装并把 `chrome-devtools-mcp` 接入 Codex CLI（MCP）。

## 先说明清楚：这里的 “server” 是什么

- `chrome-devtools-mcp` 里的 “server” 指一个**本机进程**（MCP server），不是要你准备一台云服务器。
- Codex CLI 是 MCP client：当对话需要用到浏览器能力时，Codex 会按需启动/连接这个 MCP server。

## 前置条件

- Node.js 版本要求：`^20.19.0 || ^22.12.0 || >=23`
- 已安装 Codex CLI（且能正常运行 `codex`）
- 一个 Chromium 内核浏览器（Chrome/Brave 都可以）
- 能访问 npm registry（或配置镜像源）

## Windows（推荐）快速开始：连接到你手动启动的浏览器

### 1) 启动浏览器并打开 CDP 端口

建议使用独立的 profile，避免影响日常浏览器配置。

- Brave：
  - `"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe" --remote-debugging-port=9222 --user-data-dir="%TEMP%\brave-mcp" --no-first-run --no-default-browser-check`
- Chrome：
  - `"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="%TEMP%\chrome-mcp" --no-first-run --no-default-browser-check`

说明：
- `--remote-debugging-port=9222` 会在本机开启 Chrome DevTools Protocol（CDP）调试端口。
- 如果端口被占用，可以换一个（例如 `9223`），后续命令里的端口也要一起改。

### 2) 验证 CDP 是否可用

- 如果你有 `curl`：
  - `curl http://127.0.0.1:9222/json/version`
- PowerShell 也行：
  - `powershell -NoProfile -Command "irm http://127.0.0.1:9222/json/version"`

正常情况下会返回一段 JSON，包含类似 `webSocketDebuggerUrl` 的字段。

### 3) 把 MCP 配到 Codex

- 添加 MCP server（禁用 usage statistics）：
  - `codex mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest --browserUrl http://127.0.0.1:9222 --no-usage-statistics`

- 查看配置：
  - `codex mcp list`
  - `codex mcp get chrome-devtools`

> 说明：这套配置是“连接到一个已在运行的浏览器实例”。它不会替你自动启动 Brave/Chrome。

### 4) Demo：验证 Codex 能否通过 MCP 操作浏览器

新开一个 Codex 会话，输入类似的任务指令（越具体越容易触发工具调用）：

- “请使用浏览器（DevTools MCP）打开 `https://example.com`，等待加载完成，输出页面标题，并截图。”

如果你发现 Codex 没有触发 MCP：
- 直接在需求里写清楚“**必须使用 DevTools MCP**/浏览器工具完成”。

## WSL（可选）说明：为什么容易卡住

如果你在 WSL 里跑 Codex/MCP，但浏览器在 Windows：
- 浏览器通常只监听 `127.0.0.1:9222`（Windows 本机回环）。
- WSL 侧访问 `127.0.0.1:9222` 指的是 WSL 自己，不一定能打到 Windows 的回环端口。

### 方案 A（推荐）：同系统使用

- 要么在 Windows 里运行 Codex + MCP（并确保 Windows Node 版本满足要求）。
- 要么在 WSL 安装 Linux 的 Chromium，让 `chrome-devtools-mcp` 在 WSL 里直接启动/连接 Linux 浏览器。

### 方案 B（进阶）：让 WSL 能连上 Windows 的 9222

做法之一是 Windows 侧用 `portproxy` 把 `Windows(WSL虚拟网卡IP):9222` 转发到 `127.0.0.1:9222`，再配合防火墙只允许 WSL 网段访问。

示例（仅供参考，需按你机器的实际 IP/网段调整）：
- 添加转发：
  - `netsh interface portproxy add v4tov4 listenaddress=<WIN_WSL_IP> listenport=9222 connectaddress=127.0.0.1 connectport=9222`
- 删除转发：
  - `netsh interface portproxy delete v4tov4 listenaddress=<WIN_WSL_IP> listenport=9222`

然后在 WSL 里把 `--browserUrl` 改成：
- `--browserUrl http://<WIN_WSL_IP>:9222`

> 注意：开启远程调试端口意味着“能控制浏览器”。务必限制监听地址/防火墙来源，别暴露到不可信网络。

## 常用参数备忘

- 连接现有浏览器：
  - `--browserUrl http://127.0.0.1:9222`
  - `--wsEndpoint ws://127.0.0.1:9222/devtools/browser/<id>`
- 精简工具集：
  - `--slim`
- 关闭 usage statistics：
  - `--no-usage-statistics`

## 常见坑

### 1) Node 版本不满足导致无法运行

报错形如：`does not support Node v20.18.0`。

处理：升级 Node 到 `20.19.0+`（或更高 LTS）。

### 2) WSL 下 npm cache 指到了 Windows 盘，npx 可能异常

如果你的（Windows）用户目录里有 `.npmrc`，包含类似：`cache=D:\npm-cache`，WSL 里运行 `npx` 可能出现找不到可执行文件等问题。

临时绕过（推荐写进 Codex MCP 的 `--env`）：
- `npm_config_cache=/tmp/npm-cache`

例如：
- `codex mcp add chrome-devtools --env npm_config_cache=/tmp/npm-cache -- npx -y chrome-devtools-mcp@latest --browserUrl http://<HOST>:9222`

## 卸载 / 清理

- 删除 Codex MCP 配置：
  - `codex mcp remove chrome-devtools`
- 关闭你启动的浏览器实例（带远程调试端口的那个）
- 如果你配置过 `portproxy` / 防火墙规则：删除对应规则
