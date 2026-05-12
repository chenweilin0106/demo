# ipatool 授权 App 使用笔记

用途：在电脑上给 Apple ID 获取某个 App 的授权，然后去低系统 iPhone/iPad 的 App Store 已购项目里下载兼容旧版本。

## 1. 打开 PowerShell

打开 PowerShell，进入这个目录：

```powershell
cd "\\wsl.localhost\Ubuntu\home\dcw220\projects\demo\ipatool笔记"
```

如果上面的路径打不开，先在文件资源管理器地址栏打开：

```text
\\wsl.localhost\Ubuntu\home\dcw220\projects\demo\ipatool笔记
```

然后在这个目录里右键打开 PowerShell。

## 2. 设置工具路径

在 PowerShell 里执行：

```powershell
$tool = ".\ipatool-2.3.0-windows-amd64.exe"
```

检查工具是否可用：

```powershell
& $tool help
```

能看到 `auth`、`search`、`purchase` 等命令就说明正常。

## 3. 登录 Apple ID

如果 Apple ID 是邮箱，用邮箱登录：

```powershell
& $tool auth login --email "你的AppleID邮箱"
```

如果 Apple ID 是手机号，使用国家区号加手机号。

中国大陆手机号示例：

```powershell
& $tool auth login --email "+86你的手机号"
```

然后按提示输入 Apple ID 密码。

如果出现 2FA 验证码提示，输入 Apple 设备或短信收到的验证码。

登录成功后会看到类似：

```text
success=true
```

## 4. 关于 passphrase 提示

如果看到这个提示：

```text
enter passphrase to unlock "C:\Users\dcw220\.ipatool" (this is separate from your Apple ID password):
```

这里不是 Apple ID 密码。

这是 ipatool 本地凭据库的解锁口令。你之前直接回车可以通过，所以以后这里也直接回车即可。

## 5. 搜索要授权的 App

比如搜索 Outlook：

```powershell
& $tool search "outlook" --limit 10
```

在结果里找到目标 App 的 `bundleIdentifier`。

Outlook 的 bundle identifier 通常是：

```text
com.microsoft.Office.Outlook
```

如果搜索别的 App，就把 `outlook` 换成 App 名称。

## 6. 获取 App 授权

用搜索结果里的 `bundleIdentifier` 执行授权。

示例：

```powershell
& $tool purchase -b "com.microsoft.Office.Outlook"
```

看到 `success=true` 就说明授权成功。

## 7. 去低系统设备下载旧版本

在低系统 iPhone/iPad 上操作：

1. 打开 App Store。
2. 登录同一个 Apple ID。
3. 进入已购项目。
4. 找到刚刚授权的 App。
5. 点击下载。
6. 如果 App Store 提示下载兼容旧版本，选择下载。

## 8. 常见问题

### 搜不到 App

换成更准确的 App 名称再搜。

也可以搜索英文名、中文名、开发商名称。

### 授权失败

常见原因：

- Apple ID 没有完成 App Store 账户设置。
- 该 App 在当前 Apple ID 所属地区不可用。
- 该 App 已下架。
- 网络或 Apple 服务临时异常。

### 低系统设备里还是下载不了

常见原因：

- 这个 App 没有提供兼容旧系统的历史版本。
- 旧设备系统太低，连 App Store 的兼容旧版下载也不支持。
- 授权用的 Apple ID 和旧设备登录的 Apple ID 不是同一个。

### 不要做的事

- 不要把 Apple ID 密码写进笔记。
- 不要把手机号、验证码、密码发给别人。
- 不要把 `C:\Users\dcw220\.ipatool` 目录随便发给别人。
