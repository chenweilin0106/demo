<#
用途：批量预览 oh-my-posh 主题（按键翻页）。

用法：
  # 交互预览（默认）
  .\omp-preview.ps1

  # 按名称过滤（支持通配符；不带通配符会自动做 contains 匹配）
  .\omp-preview.ps1 -Pattern robby

  # 仅列出匹配的主题名（适合非交互环境）
  .\omp-preview.ps1 -List -Pattern minimal
#>

[CmdletBinding()]
param(
  [string]$Pattern = '*',
  [switch]$List
)

function Resolve-OhMyPoshExe {
  $preferred = Join-Path $env:LOCALAPPDATA 'Programs\oh-my-posh\bin\oh-my-posh.exe'
  if (Test-Path -LiteralPath $preferred) {
    return $preferred
  }

  $cmd = Get-Command oh-my-posh -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($cmd -and $cmd.CommandType -eq 'Application' -and (Test-Path -LiteralPath $cmd.Source)) {
    $item = Get-Item -LiteralPath $cmd.Source -ErrorAction SilentlyContinue
    if ($item -and $item.Length -gt 0) {
      return $cmd.Source
    }
  }

  throw '未找到可执行的 oh-my-posh.exe（建议确认已安装并可在当前会话直接运行）。'
}

function Resolve-ThemesRoot {
  $root = $env:POSH_THEMES_PATH
  if (-not [string]::IsNullOrWhiteSpace($root) -and (Test-Path -LiteralPath $root)) {
    return $root
  }

  $fallback = Join-Path $env:LOCALAPPDATA 'Programs\oh-my-posh\themes'
  if (Test-Path -LiteralPath $fallback) {
    return $fallback
  }

  throw '未找到主题目录：请先设置环境变量 POSH_THEMES_PATH，或确认已安装主题文件（*.omp.json）。'
}

$ohMyPoshExe = Resolve-OhMyPoshExe
$themesRoot = Resolve-ThemesRoot

$normalizedPattern = $Pattern
if ($normalizedPattern -notmatch '[\*\?\[]') {
  $normalizedPattern = "*${normalizedPattern}*"
}

$themes = Get-ChildItem -LiteralPath $themesRoot -Filter '*.omp.json' -File |
  Where-Object { $_.BaseName -like $normalizedPattern } |
  Sort-Object Name

if (-not $themes -or $themes.Count -eq 0) {
  Write-Host "未匹配到主题：$Pattern" -ForegroundColor Yellow
  return
}

$nonInteractive = $List -or [Console]::IsInputRedirected
if ($nonInteractive) {
  $themes | ForEach-Object { $_.BaseName }
  return
}

function Show-Theme([int]$index) {
  $t = $themes[$index]
  Clear-Host
  Write-Host "[$($index+1)/$($themes.Count)] $($t.BaseName)" -ForegroundColor Cyan
  Write-Host "(任意键=下一个, p=上一个, q=退出)" -ForegroundColor DarkGray
  Write-Host "" 

  & $ohMyPoshExe print preview --config $t.FullName --force
}

$i = 0
Show-Theme -index $i

while ($true) {
  try {
    $k = [Console]::ReadKey($true)
  } catch {
    Write-Host "\n当前环境无法读取按键输入（ReadKey 失败），已退出。" -ForegroundColor Yellow
    break
  }

  switch ($k.KeyChar) {
    'q' { break }
    'p' {
      $i = if ($i -le 0) { $themes.Count - 1 } else { $i - 1 }
      Show-Theme -index $i
    }
    default {
      $i = if ($i -ge $themes.Count - 1) { 0 } else { $i + 1 }
      Show-Theme -index $i
    }
  }
}
