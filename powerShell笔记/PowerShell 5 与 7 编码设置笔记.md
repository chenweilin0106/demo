# PowerShell 5 与 7 编码设置笔记

更新时间：2026-04-20

## 调整原因

在 Windows 环境下，PowerShell 5 和 PowerShell 7 都可能出现编码不一致的问题。常见表现是中文输出乱码、管道传递文本异常，或者调用原生命令时结果显示不正常。

这个问题和 `WSL` 没有直接关系，单独在 Windows 中使用 PowerShell 也会遇到。处理思路不是单纯区分 PowerShell 5 或 7，而是把当前会话中与输入、输出相关的编码统一为 `UTF-8`，减少中文处理时的差异。

## 调整方法

建议按“会话级设置”处理，也就是在当前 PowerShell 会话开始后先统一编码，再执行后续命令。

PowerShell 5 可使用以下设置：

```powershell
$utf8 = [System.Text.UTF8Encoding]::new($false)
$OutputEncoding = $utf8
[Console]::InputEncoding = $utf8
[Console]::OutputEncoding = $utf8
```

PowerShell 7 可使用以下设置：

```powershell
$utf8 = [System.Text.UTF8Encoding]::new($false)
$OutputEncoding = $utf8
[Console]::InputEncoding = $utf8
[Console]::OutputEncoding = $utf8
$PSNativeCommandEncoding = $utf8
```

其中，前四项用于统一 PowerShell 会话自身的输入输出编码；`PowerShell 7` 额外设置 `$PSNativeCommandEncoding`，可以让调用原生命令时的文本编码行为更加一致。

## 验证方法

调整完成后，可以先检查当前编码是否已经切换为 `utf-8`：

```powershell
$OutputEncoding.WebName
[Console]::InputEncoding.WebName
[Console]::OutputEncoding.WebName
```

如果当前是 PowerShell 7，还可以继续检查：

```powershell
$PSNativeCommandEncoding.WebName
```

随后执行一条中文输出测试命令：

```powershell
Write-Output "中文测试"
```

如果编码值显示为 `utf-8`，且中文输出正常，就说明这次会话内的编码设置已经生效。
