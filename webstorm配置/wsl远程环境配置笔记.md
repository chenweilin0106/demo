# WSL 远程环境配置笔记（WebStorm）

更新时间：2026-03-28

目标：项目放在 WSL（ext4）里开发，但在 Windows 上使用 WebStorm 的 UI；尽量避免“项目在一边、工具链在另一边”导致的性能/兼容问题。

---

## 两种远程开发方式（概览）

### 方式一：本地 WebStorm + WSL 工具链（当前采用）

核心：WebStorm 运行在 Windows；项目路径是 `\\wsl.localhost\<发行版>\home\<user>\...`；Node/pnpm/git 等“执行工具”尽量都切到 WSL。

优点：
- 上手快，基本等同“本地打开项目”。
- 终端、运行、调试都可以走 WSL，避免 `/mnt/c/...` 的慢 git/构建体验。

缺点：
- IDE 可能收不到 WSL 路径的文件系统事件通知（常见提示：外部文件更改同步可能很慢），外部改动可能延迟刷新，需要手动同步。
- 大仓库/大量文件变更场景下，索引和文件监听稳定性不如方式二。

适用：
- 想快速开始；仓库规模中小；对“外部变更实时同步”要求不极致。

### 方式二：Remote Development / Gateway + WSL（后续如需再补充）

核心：IDE 后端（索引/分析/运行/监听）直接在 WSL 内启动；Windows 侧只有 JetBrains Client 做 UI 展示。

优点：
- 更接近“纯 Linux 开发体验”，对大仓库/频繁 watch/大量外部变更更稳。
- 文件监听、索引性能通常更好。

缺点：
- 初次需要额外初始化（下载后端、连接、插件等），整体配置更复杂。

适用：
- 大仓库、频繁构建/热更新/测试收集；或方式一遇到监听/索引问题。

---

## 方式一（推荐）：本地 WebStorm + WSL 工具链（一步步配置）

> 前提：项目目录在 WSL 的 ext4（例如 `/home/<user>/project`），不要把主仓库放在 `/mnt/c/...` 再用 WSL 工具链操作。

### 1）用 WSL 路径打开项目

任选其一：
- Windows 资源管理器：`Linux -> <发行版> -> home -> <user> -> <项目目录>`
- WebStorm：`File -> Open...`，选择 `\\wsl.localhost\<发行版>\home\<user>\<项目目录>`

打开后，WebStorm 顶部通常会显示类似：`\\wsl.localhost\Ubuntu\home\tr135\libraryManagementSystem`。

### 2）配置 Terminal 走 WSL（仅影响内置终端）

`Settings (Ctrl+Alt+S) -> Tools -> Terminal -> Shell path`：
- 建议：`wsl.exe -d <发行版>`（例如 `wsl.exe -d Ubuntu`）

验证（WebStorm Terminal 执行）：
```bash
uname -a
pwd
```

### 3）配置 Node.js runtime 走 WSL（影响 Run/Debug、npm scripts 等）

`Settings -> Languages & Frameworks -> JavaScript -> JavaScript Runtime(s)`：
- `Node 运行时`：选择 WSL 的 `.../bin/node`（应是 `/home/...` 或 `/usr/bin/node`，不要是 `C:\...\node.exe`）

> 如果你用的是 `nvm`：路径会像 `/home/<user>/.nvm/versions/node/vX.Y.Z/bin/node`。切换 Node 版本后，WebStorm 里可能需要同步更新该路径。

### 4）配置包管理器（pnpm）走 WSL

同一页面的 `软件包管理器`：
- 选择 `pnpm /home/<user>/.nvm/versions/node/vX.Y.Z/bin/pnpm` 这种带 `pnpm` 前缀的项（不要选 `pnpm.cmd` / `C:\...`）

验证（WebStorm Terminal 执行）：
```bash
which node && node -v && which pnpm && pnpm -v
```

### 5）配置 Git 走 WSL（影响 IDE 的 VCS 操作与后台 git）

`Settings -> Version Control -> Git`：
- `Git 可执行文件路径`：应为 `\\wsl.localhost\<发行版>\usr\bin\git`
- 点击右上角“测试”，确认能返回 WSL git 版本信息

提示：
- 切到 WSL Git 后，Git 的 `~/.gitconfig`、凭据缓存等以 WSL 环境为准；如遇到认证问题，需要在 WSL 里单独配置。

### 6）确认 Run Configuration 不再引用 Windows Node

`Run -> Edit Configurations...`：
- 相关配置（Node.js / npm / pnpm）里的 `Node 运行时` 选择：
  - `项目`（Project），或
  - `Ubuntu /home/.../node`
- 避免选择任何 `C:\...node.exe`（Windows Node）

---

## 常见提示与处理

### “外部文件更改同步可能很慢 / 无法获得此项目的文件系统事件通知”

含义：IDE 可能拿不到该路径的文件系统事件通知，所以当文件在 IDE 外部发生变化（例如 WSL 终端执行 `git switch`、生成构建产物、脚本批量改文件）时，WebStorm 刷新项目树/索引可能延迟。

处理建议：
- 轻度：等待自动同步即可
- 需要立即刷新：`从磁盘全部重新加载（Ctrl+Alt+Y）`
- 如果你经常在 IDE 外进行大量变更、并且需要强实时：优先考虑切到方式二（Gateway）

### pnpm 装了依赖但 WebStorm 识别/跳转异常

先做低成本排查：
- 重启 WebStorm
- `File -> Invalidate Caches...`（仅在确实异常时使用）

仍不稳定：
- 优先切方式二（Gateway），通常更省心

---

## 方式二（Gateway / Remote Development + WSL）——待补充

后续如果决定从方式一切到方式二，再在这里补充：
- 连接 WSL、启动后端 IDE 的步骤
- 插件/Node/Git 的位置与复用策略
- 常见坑与迁移检查清单

