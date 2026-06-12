# Codex 安装笔记（wsl）

## 前置条件
- 已在 WSL（Ubuntu）里准备好 Linux 版 `node/npm`（建议先看同目录 `node环境安装笔记.md`）
- 确认当前是 Linux Node：
```bash
command -v node
node -p "process.platform + ' ' + process.arch"
```
期望 `process.platform` 输出 `linux`。

## 1) 确认 shell 初始化
`~/.bashrc` 需要加载 nvm，并固定 WSL 侧的 Codex Home：
```bash
# >>> codex-home >>>
# 固定 Codex 配置目录到 WSL 家目录，避免误用 Windows 用户目录
export CODEX_HOME="$HOME/.codex"
# <<< codex-home <<<
# >>> codex-nvm >>>
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
# <<< codex-nvm <<<
```

说明：`nvm.sh` 默认会自动使用 `default` alias；确认当前默认版本：
```bash
nvm alias default
nvm current
```

Codex 属于“全局工具”，会跟随当前 nvm 版本隔离。安装前先切到默认版本：
```bash
nvm use default --silent
```

## 2) 使用 npm 安装 Codex（nvm 方案）
官方当前首推 standalone installer；这里记录 npm/nvm 方案，便于跟随 nvm Node 版本隔离。

核验 npm 最新版本：
```bash
npm view @openai/codex version
```

安装：
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
- `command -v codex` 指向 `/home/<你>/.nvm/versions/node/<版本>/bin/codex`
- `type -a codex` 第一项也是这个 WSL nvm 路径

说明：`type -a codex` 后面出现 `/mnt/c/...` 通常只是 WSL 注入的 Windows PATH 候选项；只要第一项是 WSL nvm 路径，当前实际运行的就是 WSL 里的 Codex。

可选诊断：
```bash
codex doctor --summary --ascii
```

## 4) Codex Home 单独放在 WSL
WSL 里的 Codex 配置建议放在 WSL 原生文件系统，不要指向 Windows 侧 `/mnt/c/...`。

确认当前 Codex Home：
```bash
/bin/bash -ic 'codex_home="${CODEX_HOME:-$HOME/.codex}"; printf "CODEX_HOME_effective=%s\n" "$codex_home"; stat -c "codex_home_type=%F" "$codex_home"; readlink "$codex_home" || true'
```

期望：
```text
CODEX_HOME_effective=/home/<你>/.codex
codex_home_type=directory
```

显式设置 `CODEX_HOME` 时目录必须已存在。如果 `CODEX_HOME` 是 `/mnt/c/...`，或者 `~/.codex` 是指向 `/mnt/c/...` 的符号链接，交互式启动可能会明显变慢。原因是 Codex 启动时可能读取配置、历史、日志、sessions、sqlite 状态库、skills 等文件，而 WSL 访问 Windows 文件系统里的大量文件成本较高。

隔离时按需复制必要配置：
```text
config.toml
AGENTS.md
auth.json
skills/
superpowers/
```
注意：`auth.json` 是敏感凭据文件；使用系统凭据存储时也可能不存在。

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
  - 常见原因：混用了 Windows 侧 Node/全局包，或 npm 跳过了 optional dependencies
  - 先确认 `command -v codex` 和 `type -a codex` 第一项是 WSL nvm 路径
  - 再检查 npm 配置：
    ```bash
    npm config get optional
    npm config get omit
    ```
    期望：`optional` 不应为 `false`，`omit` 不应包含 `optional`。
  - 重新安装：
    ```bash
    source ~/.bashrc
    hash -r
    npm i -g @openai/codex@latest --include=optional
    ```

- WSL 中 `codex` 交互式启动慢，但 Windows 中很快
  - 先确认 `CODEX_HOME` 和 `~/.codex` 是否指向 `/mnt/c/...`
  - 如果是，优先把 WSL 的 Codex Home 改成 WSL 原生目录，例如 `/home/<你>/.codex`
  - 改完后新开终端，再用上面的命令确认

- 新开终端找不到 `codex`
  - 先确认 `~/.bashrc` 是否加载了 `NVM_DIR` 和 `nvm.sh`
  - 再确认你安装 Codex 时用的是同一个 Node 版本：`nvm current`

- 切换 Node 版本后 `codex` 不见了
  - 正常现象：全局包按 Node 版本隔离
  - 在新版本下重新安装：`npm i -g @openai/codex@latest`
