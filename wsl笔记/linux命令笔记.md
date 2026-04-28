# Linux 命令笔记（常用速查）

更新时间：2026-03-28

> 约定：`<...>` 表示占位符；示例默认在 Linux / WSL (Ubuntu) 下执行。

## 帮助与文档

```bash
man <命令>                 # 查看手册（按 q 退出）
<命令> --help              # 查看常用参数
info <命令>                # GNU info 文档（部分命令更详细）
apropos <关键字>           # 按关键字搜索 man 条目（等价 man -k）
tldr <命令>                # 社区速查（需自行安装：sudo apt install tldr）
```

## 文件与目录

```bash
pwd                        # 当前目录
ls -lah                    # 列表（包含隐藏文件、人类可读大小）
cd <目录>                  # 进入目录
cd -                       # 回到上一次目录
mkdir -p <目录/子目录>      # 递归创建目录
touch <文件>               # 创建空文件 / 更新修改时间
cp -a <源> <目标>           # 复制（尽量保留属性，目录也适用）
mv <源> <目标>              # 移动 / 重命名
rm -i <文件>               # 删除（交互确认）
rm -rI <目录>               # 递归删除（更安全：关键节点提示）
rm -rf <路径>               # 不确认直接递归删除（不会进入回收站，谨慎使用）
ln -s <目标> <链接名>       # 软链接（符号链接）
stat <文件>                # 查看文件详细信息（权限/时间戳等）
```

## 查看文件内容

```bash
cat <文件>                 # 直接输出（大文件慎用）
less <文件>                # 分页查看（支持搜索 /?，按 q 退出）
head -n 50 <文件>           # 查看开头 50 行
tail -n 50 <文件>           # 查看结尾 50 行
tail -f <日志文件>          # 持续追踪追加内容（实时看日志）
nl -ba <文件>              # 带行号输出（包含空行）
wc -l <文件>               # 统计行数
file <文件>                # 判断文件类型/编码倾向
```

## 查找与搜索

```bash
which <命令>               # 查看命令来自哪里（PATH 中）
whereis <命令>             # 查找命令/源码/手册的常见位置

find . -name '*.log'       # 按名称查找
find . -type f -size +100M # 查找大文件
find . -type f -mtime -7   # 近 7 天修改过的文件

grep -R "关键字" .          # 递归搜索内容（简单但偏慢）
rg "关键字" .              # ripgrep（更快，推荐；需安装：sudo apt install ripgrep）
```

## 权限与用户

```bash
whoami                     # 当前用户
id                         # 用户/组信息
groups                     # 所属组

sudo <命令>                # 以管理员权限执行（谨慎）
chmod 644 <文件>           # 修改权限（rw-r--r--）
chmod -R u+rwX,go-rwx <目录> # 常见“只给自己权限”的递归写法
chown <用户>:<组> <文件>    # 修改归属（目录可配合 -R）
umask                      # 默认权限掩码
```

## 压缩与打包

```bash
tar -czf <包名>.tar.gz <目录>     # 打包并 gzip 压缩
tar -xzf <包名>.tar.gz            # 解包

zip -r <包名>.zip <目录>          # zip 压缩
unzip <包名>.zip                  # 解压
```

## 网络排查（常用）

```bash
ip a                      # 网卡/地址
ip r                      # 路由表

ping -c 4 <域名或IP>       # 连通性（4 次）
curl -I https://example.com # 只看响应头
curl -L <URL>             # 跟随重定向
wget <URL>                # 下载

ss -lntp                  # 查看监听端口（TCP，带进程信息）
lsof -i :<端口>            # 查看占用端口的进程（需安装 lsof：sudo apt install lsof）

dig <域名>                # DNS 查询（需安装：sudo apt install dnsutils）
nslookup <域名>           # DNS 查询（替代/补充）
traceroute <域名或IP>      # 路由路径（需安装：sudo apt install traceroute）
```

## 进程与系统信息

```bash
ps aux                    # 进程列表（BSD 风格）
top                       # 动态查看资源占用（按 q 退出）
htop                      # 更友好的 top（需安装：sudo apt install htop）

kill <PID>                # 给进程发信号（默认 TERM）
kill -9 <PID>             # 强制杀（SIGKILL，最后手段）
pkill -f "<关键字>"        # 按命令行匹配杀进程（谨慎）

uptime                    # 运行时长/负载
free -h                   # 内存使用（人类可读）
uname -a                  # 内核信息
cat /etc/os-release       # 发行版信息
```

> 说明：`systemctl/journalctl` 依赖 systemd；WSL 是否启用取决于你的配置与版本。

## 磁盘与空间

```bash
df -h                     # 磁盘分区可用空间
du -sh <目录>              # 目录总大小
du -ah . | sort -hr | head -n 20  # 当前目录下最大的 20 个条目
lsblk                     # 块设备概览（WSL 场景可能有限）
```

## 包管理（Ubuntu/Debian：apt）

```bash
sudo apt update                    # 刷新索引
sudo apt install <包名>             # 安装
sudo apt remove <包名>              # 卸载（保留配置）
sudo apt purge <包名>               # 卸载（删除配置）
sudo apt autoremove                 # 清理不再需要的依赖

apt search <关键字>                 # 搜索包
apt show <包名>                     # 查看包信息
apt list --installed | rg <关键字>  # 列出已安装（配合 rg/grep）

dpkg -l | rg <关键字>               # 从 dpkg 角度看已安装
sudo dpkg -i <文件>.deb             # 安装本地 deb（常需要再跑一次 sudo apt -f install）
```

## SSH / 远程拷贝

```bash
ssh <用户>@<主机>                   # 远程登录
ssh -p <端口> <用户>@<主机>          # 指定端口

scp <文件> <用户>@<主机>:/path/      # 复制到远端
scp <用户>@<主机>:/path/<文件> .     # 从远端复制到本地

rsync -avh --progress <源> <目标>    # 同步/增量拷贝（更可靠，适合大文件/目录）

ssh-keygen -t ed25519 -C "<备注>"    # 生成密钥
ssh-copy-id <用户>@<主机>            # 拷贝公钥到远端（免密登录）
```

## 文本处理（管道常用组合）

```bash
cat <文件> | head -n 20                 # 取前 20 行（也可直接 head <文件>）
rg "<关键字>" <文件> | head             # 搜索并截断输出

cut -d, -f1,3 <文件>                    # 按分隔符取列（这里是逗号分隔）
sort <文件> | uniq -c | sort -nr | head  # 统计词频（示例）

awk '{print $1, $3}' <文件>             # 按列处理（空白分隔）
sed -n '1,20p' <文件>                   # 打印 1-20 行
tr -d '\r' < in.txt > out.txt           # 去掉 Windows CR（也可用 dos2unix）

<命令> 2>&1 | tee output.log            # 同时输出到屏幕与文件
```

## WSL 常用（Linux ↔ Windows 互操作）

```bash
explorer.exe .                          # 用 Windows 文件管理器打开当前目录
notepad.exe <文件>                      # 用记事本打开文件

wslpath -w /home/tr135                  # Linux 路径 -> Windows 路径
wslpath -u 'C:\\Users\\<你>\\Desktop'   # Windows 路径 -> Linux 路径

cd /mnt/c                               # 进入 Windows C 盘挂载点（路径：/mnt/<盘符>）
cmd.exe /c dir                          # 直接调用 Windows 命令（示例）
powershell.exe -Command "Get-Date"      # 调用 PowerShell（示例）
```

> 建议：开发/构建尽量放在 Linux 文件系统（如 `~/project`），避免在 `/mnt/c` 下频繁读写导致性能与权限差异问题。

## 高风险命令提示（务必小心）

```bash
rm -rf <路径>            # 极其危险：一旦写错路径几乎无法恢复
sudo rm -rf <路径>       # 更危险：权限放大 + 不可逆
chmod -R 777 <路径>      # 通常不推荐：权限过大，容易埋坑
curl <URL> | bash        # 不推荐：先下载落盘、审查，再执行
```
