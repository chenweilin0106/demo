# TUN模式访问局域网网页

## 情况

开启代理后，部分局域网或内部管理网站无法访问。

常见报错：

```txt
net::ERR_HTTP_RESPONSE_CODE_FAILURE 502 (Bad Gateway)
net::ERR_CONNECTION_CLOSED
```

关闭代理后访问正常。

## 原因

问题通常不是网站本身故障，而是代理软件同时影响了两层：

1. 系统代理把内部域名送进代理端口。
2. DNS 的 FakeIP 把内部域名解析成 `198.18.x.x`。

如果只排除系统代理，但没有排除 FakeIP，浏览器会直连到假 IP，仍然打不开。

如果只排除 FakeIP，但没有排除系统代理，请求仍可能进入代理链，导致 `502`。

## 解决方案

需要同时配置三项。

### 1. 网络：排除域名

添加需要直连的域名：

```txt
*.dandanvoice.com
*.dandan818.com
```

### 2. DNS：开启覆写DNS

```txt
DNS -> 覆写DNS：开启
```

### 3. DNS：FakeIP过滤

添加同样的域名：

```txt
*.dandanvoice.com
*.dandan818.com
```

### 4. 让配置生效

FlClash 中重启内核可能不生效，需要：

```txt
关闭代理 -> 再开启代理
```

### 结论

凡是要绕过代理的内部域名，都要同时加入：

```txt
网络 -> 排除域名
DNS -> FakeIP过滤
```
