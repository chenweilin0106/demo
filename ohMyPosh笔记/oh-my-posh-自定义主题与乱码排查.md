# oh-my-posh：自定义主题与“乱码”排查记录（Windows + pwsh）

更新时间：2026-03-17

## 结论先说

- 这次看到的“乱码”（如 `顐?` / `鈫?` / `�`）不是字体缺字形，而是 **oh-my-posh 输出在 PowerShell 管道/重定向时被按错误编码解码**。
- 另一个看似“乱码”的现象是：在 **非 Git 仓库目录（尤其是 C 盘）**，主题的 `git` 段探测失败会回退到 `no_commits_icon`（默认是 ``），导致在不该显示 git 信息的地方出现图标/异常字符。

为避免升级覆盖，我们把修复后的主题做成了自定义主题，并让 Profile 永远指向它。

## 当前配置（最终形态）

- 自定义主题文件：`C:\Users\dcw220\.poshthemes\the-unnamed.custom.omp.json`
- PowerShell Profile：`C:\Users\dcw220\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`
  - 用 `$ompTheme = Join-Path $HOME '.poshthemes\the-unnamed.custom.omp.json'`
  - 用 `function oh-my-posh { ... }` 包装调用，调用期间临时切 UTF-8，结束后还原
  - PSReadLine：把 `Command` 颜色设为 `DefaultTokenColor`，取消“命令位（第一个词）”黄色高亮

> 备份：Profile 会有 `Microsoft.PowerShell_profile.ps1.bak.*`。

## 踩坑现象与复现

### 1) 只要进管道就乱码

同样的命令：

- 直接运行（不进管道）通常正常：
  - `oh-my-posh debug --config $global:ompTheme --pwd $pwd`
- 进管道/被捕获后就可能乱码：
  - `oh-my-posh debug --config $global:ompTheme --plain --pwd $pwd | % { "[$_]" }`

在乱码时，常见环境特征：

- `chcp` 为 936
- `[Console]::OutputEncoding.WebName` 为 `gb2312`

### 2) 非仓库目录出现 `on ` / 异常字符

在 `C:\Users\dcw220` 这类非仓库目录，日志里会看到类似行为：

- 试图读取 `C:\.git\HEAD`
- 试图执行 `git.exe -C C:`
- 探测失败后使用 `no_commits_icon`（默认 ``）

## 修复方案（已落地）

### A) Profile：只对 oh-my-posh 调用期间切 UTF-8

目的：让 **oh-my-posh 在管道/重定向时**也按 UTF-8 解码，避免 `顐?` / `鈫?` / `�`。

实现位置：`Microsoft.PowerShell_profile.ps1` 里的 `function oh-my-posh`。

### B) 主题：git 段只有在拿到 `.HEAD` 才显示

目的：避免“非仓库探测失败时”也显示 git 段（以及 `no_commits_icon`）。

做法：

- 在 git 段 properties 加：`"no_commits_icon": ""`
- 把 git 段 template 包一层：`{{ if .HEAD }} ... {{ end }}`

### C) 自定义主题：避免升级覆盖

`oh-my-posh` 升级/重装可能覆盖安装目录里的主题（例如 `...\oh-my-posh\themes\*.omp.json`）。

所以把主题复制到：

- `C:\Users\dcw220\.poshthemes\the-unnamed.custom.omp.json`

并让 Profile 永远引用这份。

## 验证命令（建议保存）

- 在 Git 仓库目录：
  - `cd D:\Project\demo`
  - `oh-my-posh debug --config $global:ompTheme --plain --pwd $PWD.Path | % { "[$_]" }`
  - 预期：`demo on  main via  20.18.0` 之类不乱码

- 在非仓库目录：
  - `cd $HOME`
  - 预期：不显示 `on ...` 的 git 段（只剩路径 + 下一行提示符）

## 备注

- 如果以后运行了 `D:\Project\demo\ohMyPosh笔记\Preview-OhMyPoshThemes.ps1` 这类脚本，注意它可能会改写 Profile 的主题选择逻辑；如发现主题突然变了，先检查 Profile 里 `$ompTheme` 是否还指向自定义主题。
