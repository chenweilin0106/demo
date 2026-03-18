# 在 WSL（Ubuntu）中安装 Codex（复用 Windows 配置）

> 目标：在 WSL 里安装 Node + Codex CLI，同时复用 Windows 的 `C:\Users\<用户名>\.codex` 配置目录（同一份配置，不是拷贝）。

## 0. 前置
- 已安装并能进入 Ubuntu：`wsl -d Ubuntu`
- （可选）已配置代理：见 `WSL2-安装.md`

### 0.1 代理常见坑（WSL2 连不上 Windows 代理端口）
如果你用的是 Windows 上的 Clash Verge（Mixed Port `7897`）给 WSL2 提速：
- 必须开启 `Allow LAN/允许局域网`，并确保端口不是只监听 `127.0.0.1`。
- 自检（Windows 端）：`netstat -ano | findstr ":7897"`，期望看到 `0.0.0.0:7897` / `[::]:7897` 在 `LISTENING`。

在 Ubuntu 内自检端口可达（先拿 Windows 网关 IP）：
```bash
WIN_IP=$(ip route | awk '/^default / {print $3; exit}')
timeout 2 bash -lc "cat < /dev/null > /dev/tcp/${WIN_IP}/7897" && echo proxy_port_ok
```

## 1. 安装依赖（Ubuntu）
```bash
sudo apt-get update
sudo apt-get install -y git curl ca-certificates libatomic1
```

## 2. 安装 nvm（固定版本，便于复用）
```bash
git clone --branch v0.40.1 --depth 1 https://github.com/nvm-sh/nvm.git ~/.nvm
```
写入 `~/.bashrc`（如果你已经有 nvm 配置，跳过这段）：
```bash
cat >> ~/.bashrc <<'EOF'

# nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
EOF

source ~/.bashrc
```

## 3. 安装 Node（最新稳定版）
```bash
# 建议安装最新 LTS（更稳，兼容性更好）
nvm install --lts
nvm alias default 'lts/*'
nvm use default
node -v
npm -v
```

说明：
- `nvm install node` 安装的是 Node Current（版本更新更快）；如你明确需要 Current 才用它。

## 4. 安装 pnpm（推荐）
```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v
```

说明：
- Node 16.13+ 自带 `corepack`，用它启用 `pnpm` 比直接 `npm i -g pnpm` 更稳，也更方便后续切版本。
- 如果你开了新终端后发现 `pnpm` 不生效，先执行一次 `exec bash` 或重新进入 WSL。

## 5. 安装 Codex CLI
```bash
npm i -g @openai/codex
codex --version
```

## 6. 复用 Windows 的 `.codex`（推荐）
Windows 配置目录默认在：`C:\Users\<你的Windows用户名>\.codex`。

在 WSL 中将其挂载路径一般是：`/mnt/c/Users/<你的Windows用户名>/.codex`。

操作（把 `<WIN_USER>` 换成你的 Windows 用户名）：
```bash
WIN_USER='<WIN_USER>'

# 如果 WSL 里已经有 ~/.codex（目录或文件），先备份
if [ -e "$HOME/.codex" ] && [ ! -L "$HOME/.codex" ]; then
  mv "$HOME/.codex" "$HOME/.codex.bak.$(date +%s)"
fi

ln -snf "/mnt/c/Users/${WIN_USER}/.codex" "$HOME/.codex"
```

（可选）显式指定 `CODEX_HOME`，保证 Codex 总是读这一份配置：
```bash
echo "export CODEX_HOME=\"/mnt/c/Users/${WIN_USER}/.codex\"" >> ~/.bashrc
source ~/.bashrc
```

说明：这是“同一个目录”的符号链接，因此 Windows/WSL 的登录凭据会自动同步；你在 Windows 更新 token 后，WSL 也会用到更新后的配置。

## 7. `w2l`：Windows 路径 → WSL 路径
用途：把 `D:\Project\demo` 这种路径转换成 `/mnt/d/Project/demo`，便于在 WSL 里 `cd`/`cat`。

安装：
```bash
mkdir -p "$HOME/bin"
cat > "$HOME/bin/w2l" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
if [[ $# -lt 1 ]]; then
  echo "Usage: w2l <windows-path>" >&2
  exit 2
fi
path="$*"
wslpath -u "$path"
EOF
chmod +x "$HOME/bin/w2l"

# 让 ~/bin 生效（最简单做法；可能重复，但不影响使用）
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

command -v w2l
```

用法示例：
```bash
cd "$(w2l 'D:\\Project\\demo')"
cat "$(w2l 'D:\\Project\\demo\\README.md')"
```

## 8. 多开 Codex（多窗口/多标签页）
- Windows Terminal 开多个标签页/窗口
- 每个标签页进入 Ubuntu：`wsl -d Ubuntu`
- 在各自目录里分别运行：`codex`

## 9. （可选）性能提示
- `/mnt/c`、`/mnt/d` 能直接读写 Windows 文件；但大量小文件读写/构建时通常比 WSL 自己的 Linux 文件系统慢。
- 如果你遇到明显性能问题，再考虑把某个仓库放到 `~/projects/...`（Linux 路径）。
