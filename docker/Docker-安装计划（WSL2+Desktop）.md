# Windows 11 + Docker Desktop（WSL2 后端）安装计划（可续跑）

## 0. 安装前检查（建议先跑一遍）
```powershell
winget -v
wsl -l -v
```
- `winget` 不存在：先装/修复 App Installer（Microsoft Store）。
- `wsl -l -v` 若报 `E_ACCESSDENIED`/乱码：见 `WSL2-安装.md` 的“排错”。

## 1. 安装/初始化 WSL2（已装可跳过）
1) 管理员 PowerShell：
```powershell
wsl.exe --install
```
2) 按提示重启 Windows

3) 重启后确认：
```powershell
wsl -l -v
```
- 期望：Ubuntu（或其他发行版）且 `VERSION` 为 `2`
- 若没有发行版：
```powershell
wsl --install -d Ubuntu
```
- 首次进入 Ubuntu 会提示创建 Linux 用户与密码（输入密码不回显）

## 2. 安装 Docker Desktop
```powershell
winget install -e --id Docker.DockerDesktop
```

## 3. Docker Desktop 设置（UI）
- Settings → 勾选 **Use the WSL 2 based engine**
- Settings → Resources → **WSL Integration**
  - 勾选 **Enable integration with my default WSL distro**
  - 勾选/开启你的发行版（Ubuntu）

## 4. 验证（最终检查点）
```powershell
docker version
docker compose version
docker run --rm hello-world
```

## 5. 常见卡点（出现再处理）
- `docker` 命令找不到：通常是 PATH 还没刷新，关掉重开 PowerShell/Windows Terminal 再试。
- `failed to connect ... //./pipe/docker_engine`：Docker Desktop 引擎没启动；打开 Docker Desktop 等待 `Engine running`。
- 非管理员终端 `permission denied`（npipe）：把 Windows 用户加入 `docker-users` 组后注销/重登或重启终端：
```powershell
net localgroup docker-users
net localgroup docker-users <你的Windows用户名> /add
```
- 虚拟化不支持/未开启：BIOS 开 VT-x/AMD-V；Windows 里确保启用虚拟机平台/WSL 相关组件（一般 `wsl --install` 会自动处理）。
- 拉镜像很慢/失败：通常是网络/代理问题；见 `WSL2-安装.md` 的“代理（Clash）”。

## 6. 参考（WSL / 代理 / Codex）
- WSL2 安装、排错与代理：`WSL2-安装.md`
- 在 WSL 中安装 Codex（含复用 Windows 配置、`w2l` 路径转换）：`WSL-Codex-安装与复用Windows配置.md`
