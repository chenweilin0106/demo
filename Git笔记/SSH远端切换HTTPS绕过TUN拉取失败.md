# Git SSH 远端切换 HTTPS 绕过 TUN 拉取失败

## 现象

开启 TUN 代理后，当前仓库走 GitHub SSH 执行 `git fetch` / `git pull` 不稳定：

```bash
client_loop: send disconnect: Broken pipe
fetch-pack: unexpected disconnect while reading sideband packet
fatal: protocol error: bad pack header
```

也可能表现为 `git fetch origin --verbose --progress` 长时间无输出后超时。

## 本次排查

先排除 partial clone：

```bash
git config --local --get-regexp 'extensions\.partialClone|remote\..*\.(promisor|partialclonefilter)' || true
git rev-list --objects --missing=print --all | grep '^?' | wc -l
find .git/objects/pack -name '*.promisor' | wc -l
```

本次结果：

```bash
# 没有 partial clone / promisor 配置
# 缺失对象数量为 0
# .promisor 文件数量为 0
```

再看当前仓库本地配置：

```bash
git config --local --get core.sshCommand
```

当时看到旧的 SSH 代理兜底配置：

```bash
ssh -o ProxyCommand='nc -X connect -x 127.0.0.1:7892 %h %p'
```

这个配置写在当前仓库的 `.git/config`，不会提交到远端，也不会自动同步到另一台机器。

绕过这个旧 `core.sshCommand` 后，GitHub SSH 仍会在 pack 下载阶段断开；显式使用 HTTPS 拉取成功。所以本次直接把当前仓库的 GitHub 远端切到 HTTPS。

下面命令里的 URL 适用于 `chenweilin0106/demo` 仓库；其他仓库要替换成自己的 HTTPS / SSH URL。

## 最终方案：fetch / pull / push 全部走 HTTPS

在仓库目录执行：

```bash
git config --local --unset-all core.sshCommand || true
git remote set-url origin https://github.com/chenweilin0106/demo.git
git config --local --unset-all remote.origin.pushurl || true
```

说明：

- 第一行删除旧的仓库级 SSH 代理命令；
- 第二行把 `origin` 改成 HTTPS；
- 第三行删除单独的 push URL，让 push 也继承 HTTPS URL；
- 这些都是当前仓库本地配置，另一台机器上的同一个仓库也需要再执行一次。

HTTPS push 可能需要 GitHub 凭据或 token，这里不展开。

## 保守方案：fetch / pull 走 HTTPS，push 仍走 SSH

如果只想绕过拉取问题，保留原来的 SSH push：

```bash
git config --local --unset-all core.sshCommand || true
git remote set-url origin https://github.com/chenweilin0106/demo.git
git remote set-url --push origin git@github.com:chenweilin0106/demo.git
```

验证结果应类似：

```bash
origin  https://github.com/chenweilin0106/demo.git (fetch)
origin  git@github.com:chenweilin0106/demo.git (push)
```

如果后续 push 的 pack 也比较大，SSH push 仍可能遇到同类 TUN 断流。

## 验证

查看远端：

```bash
git remote -v
```

全 HTTPS 方案的正常结果：

```bash
origin  https://github.com/chenweilin0106/demo.git (fetch)
origin  https://github.com/chenweilin0106/demo.git (push)
```

确认旧 SSH 代理配置已删除：

```bash
git config --local --get core.sshCommand
```

正常结果：没有输出。

如果采用全 HTTPS 方案，再确认没有单独的 push URL：

```bash
git config --local --get-all remote.origin.pushurl
```

正常结果：没有输出。

如果采用保守方案，`remote.origin.pushurl` 应输出 SSH URL：

```bash
git@github.com:chenweilin0106/demo.git
```

验证拉取：

```bash
git fetch origin --verbose --progress
git pull --ff-only
```

正常结果：`fetch` / `pull` 成功，不再走 GitHub SSH。

## 结论

这次不是 partial clone 问题，而是 GitHub SSH 在当前 TUN 路径下拉取 pack 不稳定；旧的仓库级 SSH 代理兜底也不再适合保留。

最简单稳定的仓库级方案是：当前仓库 remote 全部切到 HTTPS。
