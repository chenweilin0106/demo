# Codex 安装笔记（wsl）

## 前置条件
- 已在 WSL（Ubuntu）里准备好 Linux 版 `node/npm/pnpm`（建议先看同目录 `demo/wsl笔记/node环境安装笔记.md`）
- 确认当前是 Linux Node：
```bash
command -v node
node -p "process.platform"
```
期望 `process.platform` 输出 `linux`。

## 1) 选择 Node 版本（nvm）
Codex 属于“全局工具”，会跟随当前 nvm 版本隔离；先切到你要使用的 Node 版本：
```bash
nvm use default --silent
```

## 2) 安装 Codex（最新稳定版）
推荐用 pnpm 安装（也可用 npm，二选一即可）：
```bash
pnpm add -g @openai/codex@latest
```
或：
```bash
npm i -g @openai/codex@latest
```

说明：如确实需要临时固定版本，把 `@latest` 换成具体版本号即可（例如 `@x.y.z`）。

## 3) 验证
```bash
command -v codex
codex --version
type -a codex
```
期望：
- `codex` 路径类似：`/home/<你>/.nvm/versions/node/<版本>/bin/codex`（而不是 `/mnt/c/...`）

## 4) 常见问题
- 报错：`Missing optional dependency @openai/codex-linux-x64`（或类似）
  - 通常是混用了 Windows 侧的 Node/全局包，或 `codex` 命中了 `/mnt/c/...`
  - 处理顺序：`source ~/.bashrc` → `hash -r` → `type -a codex` 确认路径 → 重新安装一次（在当前 nvm 版本下）

- 新开终端找不到 `codex`
  - 先确认 `nvm use default` 是否会自动执行（见 `demo/wsl笔记/node环境安装笔记.md` 的 `.bashrc` 配置）
  - 再确认你安装 Codex 时用的是同一个 Node 版本：`nvm current`

- 切换 Node 版本后 `codex` 不见了
  - 正常现象：全局包按 Node 版本隔离
  - 在新版本下重新安装：`pnpm add -g @openai/codex@latest`

