# Git SSH 大 pack 下载与 TUN 代理 MTU 断流

## 现象

开启 TUN 代理后，GitHub SSH 拉取大 pack 时失败：

```bash
client_loop: send disconnect: Broken pipe
fetch-pack: unexpected disconnect while reading sideband packet
fatal: early EOF
fatal: fetch-pack: invalid index-pack output
```

小流量命令可能正常：

```bash
git ls-remote origin refs/heads/main
git fetch
```

如果远端没有更新，`fetch` / `pull` 也可能正常，因为没有真正下载新的 pack。

## 本次排除

这次不是 partial clone 问题。

检查结果：

```bash
git config --local --get-regexp 'extensions\.partialClone|remote\..*\.(promisor|partialclonefilter)'
find .git/objects/pack -name '*.promisor' -print
git rev-list --objects --missing=print --all | grep '^?'
git fsck --full --connectivity-only
```

正常结果：

```bash
# 没有 promisor / partialclonefilter 配置
# 没有 .promisor 文件
# 没有缺失对象
# fsck 通过
```

## 复现

不使用 Git 本地 SSH 代理，直接走默认 SSH + TUN：

```bash
git clone --no-checkout git@github.com:chenweilin0106/demo.git /tmp/demo-tun-direct-clone-test
```

失败：

```bash
client_loop: send disconnect: Broken pipe
fetch-pack: unexpected disconnect while reading sideband packet
fatal: early EOF
fatal: fetch-pack: invalid index-pack output
```

## 定位

WSL 里 TUN 路径对应的网卡：

```bash
ip route
ip link show dev eth0
```

当时看到：

```bash
default via 198.18.0.2 dev eth0
eth0 mtu 9000
```

临时把 MTU 改成 1500 后复测：

```bash
sudo ip link set dev eth0 mtu 1500
git clone --no-checkout git@github.com:chenweilin0106/demo.git /tmp/demo-tun-mtu1500-clone-test
sudo ip link set dev eth0 mtu 9000
```

结果：

```bash
# mtu 9000：clone 失败
# mtu 1500：clone 成功
```

所以根因基本是 TUN 代理链路的 MTU / MSS 处理问题，导致大 pack 传输中断。

## 仓库级兜底方案

如果代理软件不支持调整 TUN MTU / MSS，可以只给当前仓库配置 SSH 走本地 HTTP 代理：

```bash
git config --local core.sshCommand "ssh -o ProxyCommand='nc -X connect -x 127.0.0.1:7892 %h %p'"
```

验证：

```bash
git fetch origin --verbose --progress
git pull --ff-only
```

查看配置：

```bash
git config --local --get core.sshCommand
```

## 注意

这个配置写在当前仓库的 `.git/config`：

```bash
.git/config
```

它不会提交到远程，也不会跟着 clone 到另一台机器。

如果另一台机器上的同一个仓库也需要，需要在那台机器的仓库目录再执行一次：

```bash
git config --local core.sshCommand "ssh -o ProxyCommand='nc -X connect -x 127.0.0.1:7892 %h %p'"
```

## 结论

这个问题和 partial clone 是两个问题：

```bash
partial clone 问题：缺失对象 + promisor remote
本次问题：普通 SSH 大 pack 下载 + TUN MTU/MSS 断流
```

正式最优解是修 TUN 代理的 MTU / MSS。

如果代理软件不能配置，就用仓库级 `core.sshCommand` 兜底。
