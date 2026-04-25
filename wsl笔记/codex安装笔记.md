# Codex 安装笔记（wsl）

## 前置条件
- 已在 WSL（Ubuntu）里准备好 Linux 版 `node/npm`（建议先看同目录 `demo/wsl笔记/node环境安装笔记.md`）
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
使用 npm 全局安装：
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

## 4) Codex Home 单独放在 WSL
WSL 里的 Codex 配置建议放在 WSL 原生文件系统，不要指向 Windows 侧 `/mnt/c/...`。

确认当前 Codex Home：
```bash
/bin/bash -ic 'printf "CODEX_HOME=%s\n" "$CODEX_HOME"; stat -c "codex_home_type=%F" "$CODEX_HOME"; readlink "$CODEX_HOME" || true'
```

期望：
```text
CODEX_HOME=/home/<你>/.codex
codex_home_type=directory
```

如果 `CODEX_HOME` 是 `/mnt/c/...`，或者 `~/.codex` 是指向 `/mnt/c/...` 的符号链接，交互式启动可能会明显变慢。原因是 Codex 启动时可能读取配置、历史、日志、sessions、sqlite 状态库、skills 等文件，而 WSL 访问 Windows 文件系统里的大量文件成本较高。

隔离时建议只复制必要配置：
```text
config.toml
AGENTS.md
auth.json
skills/
superpowers/
```

不要复制这些大状态文件：
```text
history.jsonl
log/
sessions/
*.sqlite
*.sqlite-shm
*.sqlite-wal
```

## 5) 常见问题
- 报错：`Missing optional dependency @openai/codex-linux-x64`（或类似）
  - 通常是混用了 Windows 侧的 Node/全局包，或 `codex` 命中了 `/mnt/c/...`
  - 处理顺序：`source ~/.bashrc` → `hash -r` → `type -a codex` 确认路径 → 重新安装一次（在当前 nvm 版本下）

- WSL 中 `codex` 交互式启动慢，但 Windows 中很快
  - 先确认 `CODEX_HOME` 和 `~/.codex` 是否指向 `/mnt/c/...`
  - 如果是，优先把 WSL 的 Codex Home 改成 WSL 原生目录，例如 `/home/<你>/.codex`
  - 改完后新开终端，再用上面的命令确认

- 新开终端找不到 `codex`
  - 先确认 `nvm use default` 是否会自动执行（见 `demo/wsl笔记/node环境安装笔记.md` 的 `.bashrc` 配置）
  - 再确认你安装 Codex 时用的是同一个 Node 版本：`nvm current`

- 切换 Node 版本后 `codex` 不见了
  - 正常现象：全局包按 Node 版本隔离
  - 在新版本下重新安装：`npm i -g @openai/codex@latest`
