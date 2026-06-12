# node环境安装笔记（wsl）

## 目标
在 WSL（Ubuntu）里实际命中 Linux 版的 `node/npm/npx`，避免误调用 Windows 侧的 Node/NVM，并让新开终端自动启用 nvm 的默认 Node 版本。

## 1) 快速确认当前用的是 Linux Node/npm
在 WSL 执行：
```bash
command -v node
command -v npm
command -v npx
node -p "process.platform + ' ' + process.arch"
npm config get prefix
type -a node
type -a npm
type -a npx
```
期望：
- `command -v node/npm/npx` 指向 `/home/<你>/.nvm/versions/node/<版本>/bin/...`
- `process.platform` 为 `linux`
- `npm config get prefix` 指向 `/home/<你>/.nvm/versions/node/<版本>`

说明：`type -a` 后面出现 `/mnt/c/...` 通常只是 WSL 注入的 Windows PATH 候选项；只要第一项是 WSL nvm 路径，当前实际运行的就是 WSL 里的 Node/npm/npx。

## 2) `~/.bashrc` 初始化 nvm
在 `~/.bashrc` 里加载 nvm：
```bash
# >>> codex-nvm >>>
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
# <<< codex-nvm <<<
```

生效：
```bash
source ~/.bashrc
hash -r
```

说明：`nvm.sh` 默认会自动使用 `default` alias；不用额外追加 `nvm use default`。Ubuntu 默认的 `~/.profile` 虽然会 `source ~/.bashrc`，但 `.bashrc` 默认只对**交互式** shell 生效（开头会在非交互时直接 `return`）；因此 `bash -lc` 这类**非交互** login shell 不会执行这里的 PATH/nvm 配置。

## 3) nvm：设置默认 Node + 新开终端自动启用
要点：
- nvm 的“全局包”是**按 Node 版本隔离**的：`nvm use` 切版本后，需要在那个版本下重新安装全局工具。

把默认版本指向 LTS：
```bash
nvm alias default lts/*
```

确认：
```bash
nvm alias default
nvm current
```

下一步：需要安装 Codex 时，见同目录 `codex安装笔记（wsl）.md`。
