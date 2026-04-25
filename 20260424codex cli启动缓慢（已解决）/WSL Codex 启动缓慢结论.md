# WSL Codex 启动缓慢结论

日期：2026-04-25

## 结论

本次 WSL 中 `codex` 启动缓慢，主要原因是 WSL 的 Codex Home 指向了 Windows 文件系统：

- `/home/tr135/.codex` 原本是符号链接，指向 `/mnt/c/Users/tr135/.codex`
- `/home/tr135/.bashrc` 原本设置了 `CODEX_HOME="/mnt/c/Users/tr135/.codex"`
- Windows 侧 `.codex` 目录约 `271M`，包含 logs、sessions、history、sqlite 状态库等大量文件

隔离后，WSL 使用自己的原生目录 `/home/tr135/.codex`。实际使用确认启动速度已有明显改善。

## 关键证据

切换前：

```text
/home/tr135/.codex -> /mnt/c/Users/tr135/.codex
CODEX_HOME=/mnt/c/Users/tr135/.codex
/mnt/c/Users/tr135/.codex 约 271M
```

切换后：

```text
CODEX_HOME=/home/tr135/.codex
codex_home_type=directory
/home/tr135/.codex 约 5.3M
```

补充观察：

- `codex --version` 在 WSL 中约 `0.03s` 到 `0.04s`
- 因此慢点不在 Codex 二进制本身，而更可能出现在交互式启动读取配置、状态、历史、session、skills 等文件时
- WSL 访问 `/mnt/c/...` 下的大量小文件和状态文件成本较高，会放大启动耗时

## 已执行处理

已把 WSL 的 Codex 配置与 Windows 隔离：

1. 备份 `.bashrc`

```bash
/home/tr135/.bashrc.codex-wsl-backup.20260425-112705
```

2. 保留原 Windows 指向链接

```bash
/home/tr135/.codex.winlink.20260425-112705 -> /mnt/c/Users/tr135/.codex
```

3. 新建 WSL 原生 Codex Home

```bash
/home/tr135/.codex
```

4. 只复制必要配置

```text
AGENTS.md
auth.json
config.toml
skills/
superpowers/
```

5. 没有复制大状态文件

```text
history.jsonl
log/
sessions/
*.sqlite
*.sqlite-shm
*.sqlite-wal
```

6. 修改 `/home/tr135/.bashrc`

```bash
export CODEX_HOME="$HOME/.codex"
```

## 当前验证命令

```bash
/bin/bash -ic 'printf "CODEX_HOME=%s\n" "$CODEX_HOME"; stat -c "codex_home_type=%F" "$CODEX_HOME"; readlink "$CODEX_HOME" || true'
```

期望结果：

```text
CODEX_HOME=/home/tr135/.codex
codex_home_type=directory
```

`readlink` 没有输出，说明 `$CODEX_HOME` 不是符号链接。

## 回退方法

如果需要回到原来的 Windows 共享配置方式，执行：

```bash
cp -a /home/tr135/.bashrc.codex-wsl-backup.20260425-112705 /home/tr135/.bashrc
mv -T /home/tr135/.codex /home/tr135/.codex.wsl-native.20260425-112705
mv -T /home/tr135/.codex.winlink.20260425-112705 /home/tr135/.codex
```

回退后新建的 WSL 原生配置会保留为：

```bash
/home/tr135/.codex.wsl-native.20260425-112705
```

## 后续待办

1. 先人工审阅本文档和 `/home/tr135/demo/wsl笔记/codex安装笔记.md`
2. 确认无误后再删除临时备份和旧符号链接
3. 备份删除后，再继续卸载 Windows 端 Codex

注意：卸载 Windows 端 Codex 前，先确认 WSL 端仍满足：

```text
CODEX_HOME=/home/tr135/.codex
codex_home_type=directory
```

