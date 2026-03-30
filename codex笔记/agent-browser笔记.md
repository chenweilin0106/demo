# agent-browser 笔记

说明：本笔记以 **WSL 环境** 为主（已安装并实际跑通）。Windows 环境暂时只做占位，后续需要时再补充。

配合 agent-browser skill 使用：https://github.com/vercel-labs/agent-browser/blob/main/skills/agent-browser/SKILL.md

## WSL（已验证）

### 前置条件

- 需要 Node.js（建议用 `node -v` / `npm -v` 先确认可用）
- 若要显示 `--headed` 的浏览器窗口：需要 WSLg（WSL 下将窗口显示到 Windows 桌面）

### 安装 agent-browser

全局安装 CLI：

```bash
npm i -g agent-browser
agent-browser --version
```

如遇到 `EACCES` 这类权限问题，优先用 `nvm` / 调整 npm 全局目录到用户目录，避免 `sudo npm i -g`。

升级到最新版（按安装方式自动选择 npm/brew/cargo）：

```bash
agent-browser upgrade
```

### 下载/安装浏览器（Chrome/Chromium）

按官方流程下载一份可用的 Chrome（Chromium 内核）：

```bash
agent-browser install
```

如果后续启动浏览器遇到 “shared library” 之类依赖报错，可按提示执行（按需）：

```bash
sudo agent-browser install --with-deps
```

### 基本用法（交互调试）

#### headless / headed 说明

- 默认（不加 `--headed`）：**headless**，不弹出浏览器窗口（隐式调试/自动化流程）。
- 加 `--headed`：**headed**，会弹出可视化浏览器窗口；在 WSL 下会通过 **WSLg** 显示到 Windows 桌面（显式调试）。

典型流程：`open` → `snapshot -i`（拿 ref）→ `click/fill` → `wait` → 再 `snapshot`/`screenshot` 验证。

打开网页并截图：

```bash
agent-browser --session demo --headed open https://example.com
agent-browser --session demo wait --load networkidle
agent-browser --session demo screenshot --full ./example-full.png
```

提示：`screenshot` 不传输出路径时会保存到临时目录；也可以用 `--screenshot-dir` 指定默认输出目录。

说明（容易混淆）：

- `--session`：隔离会话（便于多开/并行），但不负责“跨重启持久化”。
- `--session-name`：自动保存/恢复 cookies + localStorage，适合复用登录态。
- `--profile`：使用持久化 profile 目录（cookies/IndexedDB/缓存等），适合长期固定环境。

使用 `--session`（便于多次命令复用同一会话上下文）：

```bash
agent-browser --session demo --headed open https://example.com
agent-browser --session demo snapshot -i
```

打开本地 HTML（file://）：

```bash
agent-browser --session demo --headed --allow-file-access open "file:///home/dcw220/path/to/index.html"
agent-browser --session demo snapshot -i
```

提示：本地 HTML 如果还要加载本地的 JS/CSS/图片等资源，通常也需要 `--allow-file-access`。

根据 `snapshot -i` 输出的 ref 执行点击/输入（示例）：

```bash
agent-browser --session demo click @e1
agent-browser --session demo fill @e2 "hello"
```

生成带标注的截图（元素会标号，方便对照 ref）：

```bash
agent-browser --session demo screenshot --annotate
```

结束会话：

```bash
agent-browser --session demo close
# 或关闭所有会话
agent-browser close --all
```

## Windows（占位，待验证）

后续如果要在 Windows 上使用，建议走 “agent-browser + 浏览器都在 Windows” 的同系统方案，避免 Windows/WSL 之间的 CDP 连接问题。
