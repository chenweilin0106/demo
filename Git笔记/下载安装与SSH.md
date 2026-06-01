# Git 下载安装与 SSH 配置

## 1. 安装 Git

### Windows

- 推荐：安装 Git for Windows（自带 Git Bash、OpenSSH）
- `winget` 安装：

```bash
winget install --id Git.Git -e
```

- 安装后验证：

```bash
git --version
```

### macOS

```bash
brew install git
git --version
```

### Linux（Debian/Ubuntu）

```bash
sudo apt update
sudo apt install -y git
git --version
```

### Linux（CentOS/RHEL/Fedora）

```bash
sudo dnf install -y git   # Fedora / RHEL 9+
# 或：sudo yum install -y git  # 旧版
git --version
```

## 2. 初始化配置（建议全局）

```bash
git config --global user.name "你的名字"
git config --global user.email "you@example.com"
```

查看配置：

```bash
git config --global -l
```

（可选）换行符策略（按你的开发环境选一个）：

- Windows 为主：`git config --global core.autocrlf true`
- macOS/Linux 为主：`git config --global core.autocrlf input`

## 3. 生成 SSH 密钥

1) 检查是否已有密钥：

```bash
ls -al ~/.ssh
```

2) 生成 Ed25519（推荐）：

```bash
ssh-keygen -t ed25519 -C "you@example.com"
```

一路回车使用默认路径：`~/.ssh/id_ed25519`（建议设置 passphrase）。

3) 查看并复制公钥内容（粘贴到平台后台）：

```bash
cat ~/.ssh/id_ed25519.pub
```

## 4. GitHub 添加 SSH Key

- 进入：GitHub `Settings` → `SSH and GPG keys` → `New SSH key`
- `Title`：随便起（比如 `laptop` / `wsl`）
- `Key`：粘贴 `id_ed25519.pub` 内容，保存

测试连接（首次连接可能会提示是否信任主机指纹，输入 `yes`）：

```bash
ssh -T git@github.com
```

## 5. GitLab 添加 SSH Key

- 进入：GitLab `Preferences` → `SSH Keys`
- 粘贴 `id_ed25519.pub` 内容，保存

测试连接：

```bash
ssh -T git@gitlab.com
```

## 6. 将仓库 remote 切到 SSH（可选）

查看当前 remote：

```bash
git remote -v
```

把 `origin` 改成 SSH：

```bash
git remote set-url origin git@github.com:USER/REPO.git
# 或：git@gitlab.com:GROUP/REPO.git
```

## 7. 多账号/多密钥（可选）

当你需要在同一台机器上使用多把密钥时，可配置 `~/.ssh/config`（示例）：

```sshconfig
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
```
