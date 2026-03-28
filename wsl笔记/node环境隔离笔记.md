# node环境隔离（wsl）

## 目标
在 WSL（Ubuntu）里只使用 Linux 版的 `node/npm/pnpm/codex`，避免误调用 Windows 侧的 Node/NVM（例如 nvm4w）导致“跨平台混用”。

## 背景：为什么会混用
- WSL 默认会把 Windows 的 PATH 追加到 WSL 的 PATH，所以你能在 WSL 里直接运行很多 `/mnt/c/...` 下的 Windows 程序。
- 如果 PATH 里同时存在：
  - Linux 的 `node`（例如 nvm 装在 `~/.nvm/.../bin/node`）
  - Windows 的 `codex/npm/pnpm`（例如 `/mnt/c/nvm4w/nodejs/codex`）
  就可能出现“Linux node 去跑 Windows 安装的包/脚本”，从而触发依赖平台不匹配。

典型现象：
- `type -a codex` 显示 `/mnt/c/...`
- 报错类似：`Missing optional dependency @openai/codex-linux-x64`

## 1) 快速判断当前是否混用
在 WSL 执行：
```bash
type -a node
type -a npm
type -a pnpm
type -a codex

node -p "process.platform + ' ' + process.arch"
```
期望：
- `node/npm/pnpm/codex` 都来自 `/home/...`（而不是 `/mnt/c/...`）
- `process.platform` 为 `linux`

## 2) 最小隔离：只剔除 Windows 的 nvm/node 路径（保留其它 Windows PATH）
不建议直接禁用“全部 Windows PATH 注入”（风险高，会影响其它工具）。

这里做最小隔离：仅从 PATH 中移除两条最容易导致 Node 工具链混用的路径：
- `/mnt/c/nvm4w/nodejs`
- `/mnt/c/Users/tr135/AppData/Local/nvm`

在 `~/.bashrc` 末尾追加：
```bash
# --- WSL: remove Windows nvm/node from PATH (avoid codex mixing) ---
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

说明：Ubuntu 默认的 `~/.profile` 会 `source ~/.bashrc`，所以 login shell（例如 `bash -lc`）一般也能吃到同一份配置。

## 3) nvm 下的注意事项（非常关键）
- nvm 的“全局包”是**按 Node 版本隔离**的：`nvm use` 切版本后，需要在那个版本下重新安装全局工具。
- 建议把默认版本指向你常用且已安装的版本（例：`v20.19.0`）：
```bash
nvm alias default v20.19.0
```

## 4) 先装 pnpm，再装 Codex（固定 0.116.0）
在目标 Node 版本下执行（例：`v20.19.0`）：
```bash
nvm use v20.19.0 --silent

# 安装 pnpm（WSL）
npm i -g pnpm@latest

# 让 pnpm 的全局可执行文件落在“当前 nvm 版本”的 bin/ 下（推荐）
pnpm config set global-bin-dir "$(npm config get prefix)/bin"

# 安装 Codex（固定版本 0.116.0）
pnpm add -g @openai/codex@0.116.0
```

验证：
```bash
type -a codex
codex --version
```
期望：
- `codex` 路径类似：`/home/<你>/.nvm/versions/node/<版本>/bin/codex`
- 版本输出：`codex-cli 0.116.0`

## 5) 常见问题
- 新开终端提示 `node: command not found`
  - 先 `nvm ls` 看已安装版本，再 `nvm use vX.Y.Z`
  - 并把 `nvm alias default` 指向已安装版本
- `codex` 仍指向 `/mnt/c/...`
  - `source ~/.bashrc` + `hash -r`
  - 用 `type -a codex` 确认命中的第一条路径
- 切换 Node 版本后 `codex` 不见了
  - 在新版本下重新执行：`pnpm add -g @openai/codex@0.116.0`
