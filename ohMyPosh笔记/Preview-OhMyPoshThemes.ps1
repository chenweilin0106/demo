#Requires -Version 7.0

<#
.SYNOPSIS
  一次性滚动预览 oh-my-posh 主题，并提供“当前会话/永久启用”的选项。

.DESCRIPTION
  - 对筛选后的所有 *.omp.json 主题执行：oh-my-posh print preview --config THEME
  - 预览会一次性连续输出（像看文章一样滚动查看）
  - 输出完毕后进入循环输入：
      1) 选择主题（序号/关键字）
      2) 选择启用方式：仅当前会话 / 永久写入 Profile

  交互不会退出；停止请用 Ctrl+C（或直接关窗口）。

.PARAMETER Filter
  主题文件名筛选（支持通配符），例如：'*robby*'。

.PARAMETER ThemePath
  主题目录路径；默认使用 $env:POSH_THEMES_PATH，若为空则尝试常见安装路径。

.PARAMETER Limit
  最多预览多少个主题。

.PARAMETER Random
  随机顺序预览。

.PARAMETER Plain
  纯文本输出：为 oh-my-posh print 追加 --plain（适合重定向到文件，不含 ANSI 颜色控制符）。

.PARAMETER ListOnly
  只列出主题文件名，不预览。

.EXAMPLE
  # 一次性滚动预览全部主题（推荐在当前 pwsh 内执行，便于“当前会话启用”立刻生效）
  & "D:\Project\demo\ohMyPosh笔记\Preview-OhMyPoshThemes.ps1"

.EXAMPLE
  # 只预览包含 robby 的主题
  & "D:\Project\demo\ohMyPosh笔记\Preview-OhMyPoshThemes.ps1" -Filter '*robby*'

.EXAMPLE
  # 纯文本输出到文件（仅输出预览，不进入交互）
  pwsh -NoProfile -ExecutionPolicy Bypass -File "D:\Project\demo\ohMyPosh笔记\Preview-OhMyPoshThemes.ps1" -Plain > themes.txt
#>

[CmdletBinding()]
param(
  [string]$Filter = '*',
  [string]$ThemePath,
  [int]$Limit = 0,
  [switch]$Random,
  [switch]$Plain,
  [switch]$ListOnly
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Resolve-ThemePath {
  param([string]$InputPath)

  if ($InputPath) {
    if (Test-Path -LiteralPath $InputPath) { return $InputPath }
    throw "ThemePath 不存在：$InputPath"
  }

  if ($env:POSH_THEMES_PATH -and (Test-Path -LiteralPath $env:POSH_THEMES_PATH)) {
    return $env:POSH_THEMES_PATH
  }

  $candidates = @(
    (Join-Path $env:LOCALAPPDATA 'Programs\oh-my-posh\themes'),
    (Join-Path $env:ProgramFiles 'oh-my-posh\themes'),
    (Join-Path ${env:ProgramFiles(x86)} 'oh-my-posh\themes')
  ) | Where-Object { $_ -and (Test-Path -LiteralPath $_) } | Select-Object -Unique

  if ($candidates.Count -gt 0) { return $candidates[0] }

  throw '未找到主题目录：请传入 -ThemePath，或先正确安装 oh-my-posh 并确保设置了 POSH_THEMES_PATH。'
}

function Get-OhMyPoshExecutable {
  # 可能存在同名函数/别名遮蔽；优先取真正的可执行程序路径
  $cmds = @(Get-Command 'oh-my-posh' -All -ErrorAction SilentlyContinue)
  if ($cmds.Count -eq 0) {
    throw '未找到命令 oh-my-posh：请确认已安装并在 PATH 中。'
  }

  $exe = $cmds | Where-Object { $_.CommandType -in @('Application', 'ExternalScript') } | Select-Object -First 1
  if ($exe) { return $exe.Source }

  return $cmds[0].Name
}

function Write-Separator {
  Write-Host ''
  Write-Host ('-' * 80) -ForegroundColor DarkGray
  Write-Host ''
}

function Set-OhMyPoshProfile {
  param(
    [Parameter(Mandatory)]
    [string]$ThemeConfigPath
  )

  $profilePath = $PROFILE.CurrentUserCurrentHost
  $profileDir = Split-Path -Parent $profilePath
  if ($profileDir -and -not (Test-Path -LiteralPath $profileDir)) {
    New-Item -ItemType Directory -Path $profileDir -Force | Out-Null
  }

  $original = if (Test-Path -LiteralPath $profilePath) {
    Get-Content -LiteralPath $profilePath -Raw
  } else { '' }

  $start = '# >>> oh-my-posh theme (managed by Preview-OhMyPoshThemes.ps1) >>>'
  $end = '# <<< oh-my-posh theme (managed by Preview-OhMyPoshThemes.ps1) <<<'
  $escapedTheme = $ThemeConfigPath.Replace("'", "''")

  $block = @(
    $start,
    "`$ompTheme = '$escapedTheme'",
    'oh-my-posh init pwsh --config $ompTheme | Invoke-Expression',
    $end
  ) -join "`r`n"

  $pattern = '(?s)' + [regex]::Escape($start) + '.*?' + [regex]::Escape($end)
  if ($original -match $pattern) {
    $updated = [regex]::Replace($original, $pattern, $block, 1)
  } else {
    $trimmed = $original.TrimEnd("`r", "`n")
    $updated = if ($trimmed.Length -gt 0) {
      $trimmed + "`r`n`r`n" + $block + "`r`n"
    } else {
      $block + "`r`n"
    }

    if ($original -match '(?m)^\s*oh-my-posh\s+init\s+pwsh\b') {
      Write-Host '提示：检测到 Profile 里已有 oh-my-posh init 配置，可能会重复初始化；建议手动清理旧配置。' -ForegroundColor Yellow
    }
  }

  if (Test-Path -LiteralPath $profilePath) {
    $bak = "$profilePath.bak.$(Get-Date -Format yyyyMMddHHmmss)"
    Copy-Item -LiteralPath $profilePath -Destination $bak -Force
    Write-Host "已备份 Profile：$bak" -ForegroundColor DarkGray
  }

  Set-Content -LiteralPath $profilePath -Value $updated -Encoding utf8
  Write-Host "已写入 Profile：$profilePath" -ForegroundColor Green
}

$resolvedThemePath = Resolve-ThemePath -InputPath $ThemePath
$omp = Get-OhMyPoshExecutable

$themes = @(
  Get-ChildItem -LiteralPath $resolvedThemePath -File -Filter '*.omp.json' |
    Where-Object { $_.Name -like $Filter } |
    Sort-Object Name
)

if ($Random -and $themes.Count -gt 1) {
  $themes = @($themes | Get-Random -Count $themes.Count)
}

if ($Limit -gt 0) {
  $themes = @($themes | Select-Object -First $Limit)
}

if ($themes.Count -eq 0) {
  Write-Host "未匹配到主题：ThemePath=$resolvedThemePath, Filter=$Filter" -ForegroundColor Yellow
  exit 1
}

if ($ListOnly) {
  $themes | ForEach-Object { $_.Name }
  exit 0
}

Write-Host "ThemePath: $resolvedThemePath" -ForegroundColor DarkGray
Write-Host "总数: $($themes.Count)" -ForegroundColor DarkGray

for ($i = 0; $i -lt $themes.Count; $i++) {
  $theme = $themes[$i]
  $index = $i + 1

  if ($index -gt 1) { Write-Separator }

  $plainSuffix = if ($Plain) { ' --plain' } else { '' }

  Write-Host ("[{0}/{1}] {2}" -f $index, $themes.Count, $theme.Name) -ForegroundColor Cyan
  Write-Host ('{0} print{1} preview --config "{2}"' -f $omp, $plainSuffix, $theme.FullName) -ForegroundColor DarkGray
  Write-Host ''

  try {
    $previewArgs = @('print')
    if ($Plain) { $previewArgs += '--plain' }
    $previewArgs += @('preview', '--config', $theme.FullName)
    & $omp @previewArgs
  } catch {
    Write-Host "预览失败：$($theme.Name)" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
  }
}

# 末尾交互：选择主题并选择启用方式
if (-not [Console]::IsInputRedirected -and -not [Console]::IsOutputRedirected) {
  Write-Separator
  Write-Host '已输出全部预览。现在可以选择主题并选择启用方式（交互不退出，停止请用 Ctrl+C）。' -ForegroundColor Green
  Write-Host '输入主题序号（1..N）或主题名关键字；空回车重新提示。' -ForegroundColor DarkGray

  while ($true) {
    $q = Read-Host '选择主题'
    if ([string]::IsNullOrWhiteSpace($q)) { continue }

    $chosen = $null

    if ($q -match '^\d+$') {
      $n = [int]$q
      if ($n -ge 1 -and $n -le $themes.Count) {
        $chosen = $themes[$n - 1]
      } else {
        Write-Host "序号超出范围：1..$($themes.Count)" -ForegroundColor Yellow
        continue
      }
    } else {
      $exact = $themes | Where-Object { $_.Name -ieq $q -or $_.BaseName -ieq $q } | Select-Object -First 1
      if ($exact) {
        $chosen = $exact
      } else {
        $matches = @($themes | Where-Object { $_.Name -ilike "*$q*" -or $_.BaseName -ilike "*$q*" })
        if ($matches.Count -eq 0) {
          Write-Host '未匹配到主题，请换个关键字或输入序号。' -ForegroundColor Yellow
          continue
        }
        if ($matches.Count -gt 1) {
          Write-Host "匹配到多个主题（$($matches.Count) 个），请更精确一些。以下为前 20 个：" -ForegroundColor Yellow
          $matches | Select-Object -First 20 | ForEach-Object {
            $idx = [array]::IndexOf($themes, $_) + 1
            Write-Host ("  [{0}] {1}" -f $idx, $_.Name) -ForegroundColor DarkGray
          }
          continue
        }
        $chosen = $matches[0]
      }
    }

    $idxChosen = [array]::IndexOf($themes, $chosen) + 1
    Write-Host ''
    Write-Host ("已选中：[{0}] {1}" -f $idxChosen, $chosen.Name) -ForegroundColor Cyan
    Write-Host '请选择启用方式：' -ForegroundColor DarkGray
    Write-Host '  [1] 仅当前会话启用（立刻生效）' -ForegroundColor DarkGray
    Write-Host "  [2] 永久启用（写入 $($PROFILE.CurrentUserCurrentHost)）" -ForegroundColor DarkGray

    $mode = $null
    while ($true) {
      $mode = Read-Host '输入 1 或 2'
      if ($mode -eq '1' -or $mode -eq '2') { break }
      Write-Host '无效输入，请输入 1 或 2（空回车将重新提示）。' -ForegroundColor Yellow
    }

    try {
      if ($mode -eq '2') {
        Set-OhMyPoshProfile -ThemeConfigPath $chosen.FullName
      }

      & $omp init pwsh --config $chosen.FullName | Invoke-Expression
      Write-Host "已在当前会话启用主题：$($chosen.Name)" -ForegroundColor Green
    } catch {
      Write-Host "启用失败：$($chosen.Name)" -ForegroundColor Red
      Write-Host $_.Exception.Message -ForegroundColor Red
    }
  }
}
