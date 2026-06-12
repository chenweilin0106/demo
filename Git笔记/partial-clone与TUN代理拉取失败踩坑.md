# Git partial clone 与 TUN 代理导致拉取失败

## 现象

开启 TUN 代理后，`git pull` / `git fetch` 失败：

```bash
client_loop: send disconnect: Broken pipe
fetch-pack: unexpected disconnect while reading sideband packet
fatal: protocol error: bad pack header
fatal: could not fetch <object_id> from promisor remote
```

关闭 TUN 代理后可能恢复正常。

## 先检查

在仓库目录执行：

```bash
git remote -v
git config --local --get-regexp 'extensions\.partialClone|remote\..*\.(promisor|partialclonefilter)' || true
git rev-list --objects --missing=print --all | grep '^?' | wc -l
find .git/objects/pack -name '*.promisor' | wc -l
```

如果看到类似：

```bash
remote.origin.promisor true
remote.origin.partialclonefilter blob:none
```

说明当前仓库被改成了 partial clone。

## 临时拉取方案

如果只是想先把代码拉下来，用本地 HTTP 代理绕过 TUN：

```bash
GIT_SSH_COMMAND="ssh -o ProxyCommand='nc -X connect -x 127.0.0.1:7892 %h %p'" git pull --ff-only
```

注意：

- `7892` 换成代理软件的 HTTP 代理端口；
- 需要本机 `nc` 支持 `-X connect -x`。

## 永久修复方案

最稳方案：重新普通 clone 一份仓库。

先关闭 TUN 代理，然后在仓库的上级目录执行：

```bash
cd ..
mv demo demo_partial_backup_$(date +%Y%m%d_%H%M%S)
git clone git@github.com:chenweilin0106/demo.git
cd demo
```

验证：

```bash
git config --local --get-regexp 'extensions\.partialClone|remote\..*\.(promisor|partialclonefilter)' || true
git remote -v
git rev-list --objects --missing=print --all | grep '^?' | wc -l
find .git/objects/pack -name '*.promisor' | wc -l
git fetch
git pull --ff-only
```

正常结果：

```bash
# partial clone 配置无输出
# git remote -v 不显示 [blob:none]
# 缺失对象数量为 0
# .promisor 文件数量为 0
# git fetch / git pull --ff-only 正常
```

## 本次根因

当前仓库后来被改成了 partial clone：

```bash
remote.origin.promisor=true
remote.origin.partialclonefilter=blob:none
```

partial clone 会在需要文件内容时临时拉取缺失 blob。开启 TUN 代理时，这一步 SSH pack 流被中断，所以报错。

## 未确认原因

目前不知道是什么命令把仓库改成了 partial clone。

Git reflog 不能追踪 `.git/config` 是被哪个命令修改的，所以不要猜。
