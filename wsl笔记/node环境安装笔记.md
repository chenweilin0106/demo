# node环境安装笔记（wsl）

## 目标
在 WSL（Ubuntu）里只使用 Linux 版的 `node/npm/pnpm`，避免误调用 Windows 侧的 Node/NVM（例如 nvm4w）导致“跨平台混用”，并让新开终端自动启用 nvm 的默认 Node 版本。

## 1) 快速确认当前用的是 Linux Node
在 WSL 执行：
```bash
command -v node
node -p "process.platform + ' ' + process.arch"
```
期望：
- `command -v node` 指向 `/home/...`（而不是 `/mnt/c/.../node.exe`）
- `process.platform` 为 `linux`

## 2) 最小隔离：只剔除 Windows 的 nvm/node 路径（保留其它 Windows PATH）
不建议直接禁用“全部 Windows PATH 注入”（风险高，会影响其它工具）。

这里做最小隔离：仅从 PATH 中移除两条最容易导致 Node 工具链混用的路径：
- `/mnt/c/nvm4w/nodejs`
- `/mnt/c/Users/<你>/AppData/Local/nvm`

在 `~/.bashrc` 末尾追加：
```bash
# --- WSL: remove Windows nvm/node from PATH (avoid toolchain mixing) ---
__path_prune() {
  local target="$1" out="" p
  local IFS=':'
  read -r -a parts <<< "$PATH"
  for p in "${parts[@]}"; do
    [ -z "$p" ] && continue
    [ "$p" = "$target" ] && continue
    out="${out:+$out:}$p"
  done
  PATH="$out"
}

__path_prune "/mnt/c/nvm4w/nodejs"
__path_prune "/mnt/c/Users/tr135/AppData/Local/nvm"
unset -f __path_prune
# ---------------------------------------------------------------
```

生效：
```bash
source ~/.bashrc
hash -r
```

验证两条路径已被剔除：
```bash
echo "$PATH" | tr ':' '\n' | grep -E '^/mnt/c/nvm4w/nodejs$|^/mnt/c/Users/.*/AppData/Local/nvm$' && echo BAD || echo OK
```

说明：Ubuntu 默认的 `~/.profile` 虽然会 `source ~/.bashrc`，但 `.bashrc` 默认只对**交互式** shell 生效（开头会在非交互时直接 `return`）；因此 `bash -lc` 这类**非交互** login shell 不会执行这里的 PATH/nvm 配置。

## 3) nvm：设置默认 Node + 新开终端自动启用
要点：
- nvm 的“全局包”是**按 Node 版本隔离**的：`nvm use` 切版本后，需要在那个版本下重新安装全局工具。

先把默认版本指向你常用且已安装的版本（例：`20.19.0`）：
```bash
nvm alias default 20.19.0
```

然后在 `~/.bashrc`（确保已加载 `nvm.sh` 之后）追加，让每次新开终端自动切到默认版本：
```bash
# nvm: auto-use default node (avoid missing node in new shells)
if command -v nvm >/dev/null 2>&1; then
  nvm use default --silent >/dev/null 2>&1 || true
fi
```

核心就是这一句（其余是安全兜底，避免 nvm 未加载时报错）：
```bash
nvm use default --silent >/dev/null 2>&1
```

## 4) pnpm
在目标 Node 版本下安装（推荐直接用默认版本）：
```bash
nvm use default --silent
npm i -g pnpm@latest
pnpm setup
pnpm -v
```

下一步：需要安装 Codex 时，见同目录 `demo/wsl笔记/codex安装笔记.md`。
