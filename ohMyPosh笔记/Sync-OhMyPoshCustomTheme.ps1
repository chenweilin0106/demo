$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

# 同步说明：
# - 源文件：脚本同目录下的 the-unnamed.custom.omp.json
# - 目标文件：优先使用当前会话的 $ompTheme；若未设置则使用 $env:POSH_THEMES_PATH\the-unnamed.custom.omp.json
# - 同步前会自动备份目标文件：*.bak_yyyyMMdd_HHmmss

function Resolve-AbsolutePath {
    param(
        [Parameter(Mandatory)]
        [string]$Path
    )

    return $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($Path)
}

try {
    $scriptDir = Split-Path -Parent $PSCommandPath
    $sourcePath = Join-Path $scriptDir 'the-unnamed.custom.omp.json'

    if (-not (Test-Path -LiteralPath $sourcePath)) {
        throw "未找到源主题文件：$sourcePath"
    }

    $targetPath = $null

    if (Get-Variable -Name 'ompTheme' -Scope Global -ErrorAction SilentlyContinue) {
        $candidate = [string]$Global:ompTheme
        if (-not [string]::IsNullOrWhiteSpace($candidate)) {
            $targetPath = Resolve-AbsolutePath -Path $candidate
        }
    }

    if (-not $targetPath) {
        $themesRoot = $env:POSH_THEMES_PATH
        if (-not [string]::IsNullOrWhiteSpace($themesRoot)) {
            $targetPath = Join-Path (Resolve-AbsolutePath -Path $themesRoot) 'the-unnamed.custom.omp.json'
        }
    }

    if (-not $targetPath) {
        throw "未能确定目标主题路径：请在会话中设置 `$ompTheme（推荐），或设置环境变量 POSH_THEMES_PATH。"
    }

    $targetDir = Split-Path -Parent $targetPath
    if (-not (Test-Path -LiteralPath $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    }

    if (Test-Path -LiteralPath $targetPath) {
        $backupPath = '{0}.bak_{1}' -f $targetPath, (Get-Date -Format 'yyyyMMdd_HHmmss')
        Copy-Item -LiteralPath $targetPath -Destination $backupPath -Force
        Write-Host "已备份：$backupPath"
    }

    Copy-Item -LiteralPath $sourcePath -Destination $targetPath -Force
    Write-Host "已同步主题到：$targetPath"

    Write-Host "可选预览命令：oh-my-posh print preview --config `"$targetPath`""
}
catch {
    Write-Error $_
    exit 1
}
