param(
  [string]$Env,
  [string]$Profile,
  [string]$ProjectRoot,
  [string]$TargetRootRel,
  [string]$TargetRel,
  [string]$Message,
  [string]$BuildScript,
  [switch]$NoBuild,
  [switch]$NoCommit,
  [switch]$DebugSvn
)

$ErrorActionPreference = 'Stop'

function Clear-InputBuffer {
  try {
    if ($Host.Name -ne 'ConsoleHost') {
      return
    }

    while ([Console]::KeyAvailable) {
      [Console]::ReadKey($true) | Out-Null
    }
  } catch {
    # Ignore non-interactive or redirected input scenarios.
  }
}

function Read-HostSafe {
  param(
    [string]$Prompt
  )

  Clear-InputBuffer
  if ($PSBoundParameters.ContainsKey('Prompt')) {
    return Read-Host $Prompt
  }

  return Read-Host
}

function Prompt-WithDefault {
  param(
    [string]$Value,
    [string]$Prompt,
    [string]$Default
  )

  if ([string]::IsNullOrWhiteSpace($Value)) {
    if ([string]::IsNullOrWhiteSpace($Default)) {
      return Read-HostSafe $Prompt
    }

    $input = Read-HostSafe "$Prompt [$Default]"
    if ([string]::IsNullOrWhiteSpace($input)) {
      return $Default
    }

    return $input
  }

  return $Value
}

function Invoke-Svn {
  param(
    [string[]]$SvnArgs,
    [string]$ErrorMessage
  )

  $output = & svn @SvnArgs 2>&1
  $output | Out-Host
  if ($LASTEXITCODE -ne 0) {
    $details = ($output | Out-String).Trim()
    if ($details) {
      throw "$ErrorMessage`n$details"
    }

    throw $ErrorMessage
  }
}

function Test-SvnWorkingCopy {
  param(
    [string]$PathValue
  )

  if ([string]::IsNullOrWhiteSpace($PathValue)) {
    return $false
  }

  & svn info $PathValue 2>$null | Out-Null
  return ($LASTEXITCODE -eq 0)
}

function Invoke-CommandUtf8 {
  param(
    [scriptblock]$Script
  )

  $previousEncoding = [Console]::OutputEncoding
  try {
    [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
    & $Script
  } finally {
    [Console]::OutputEncoding = $previousEncoding
  }
}

function Format-ArgValue {
  param(
    [string]$Value
  )

  if ($Value -match '\s') {
    return '"' + $Value.Replace('"', '""') + '"'
  }

  return $Value
}

function Format-Duration {
  param(
    [TimeSpan]$Span
  )

  $totalHours = [int][Math]::Floor($Span.TotalHours)
  return ('{0:00}:{1:00}:{2:00}' -f $totalHours, $Span.Minutes, $Span.Seconds)
}

function Get-EnvValue {
  param(
    [string]$FilePath,
    [string]$Key
  )

  if (-not (Test-Path $FilePath)) {
    return $null
  }

  $pattern = "^\s*{0}\s*=\s*(.+?)\s*$" -f [Regex]::Escape($Key)
  foreach ($line in Get-Content -Encoding UTF8 $FilePath) {
    if ($line -match '^\s*#') { continue }
    if ($line -match $pattern) {
      return $Matches[1].Trim('"', "'")
    }
  }

  return $null
}

function Write-ResultSummary {
  param(
    [string]$Status,
    [string]$EnvValue,
    [string]$ProfileValue,
    [string]$TargetPathValue,
    [string]$SourcePathValue,
    [string]$MessageValue,
    [DateTime]$StartTime,
    [DateTime]$EndTime,
    [string]$Duration,
    [string]$SvnRevision,
    [string]$CommitStatus,
    [string]$ErrorMessage
  )

  Write-Host '结果:'
  Write-Host " - 状态: $Status"
  if (-not [string]::IsNullOrWhiteSpace($ErrorMessage)) {
    Write-Host " - 错误: $ErrorMessage"
  }
  Write-Host " - 环境: $EnvValue"
  Write-Host " - 配置: $ProfileValue"
  Write-Host " - 目标路径: $TargetPathValue"
  Write-Host " - 源路径: $SourcePathValue"
  Write-Host " - 提交信息: $MessageValue"
  Write-Host " - 开始时间: $($StartTime.ToString('yyyy-MM-dd HH:mm:ss'))"
  Write-Host " - 结束时间: $($EndTime.ToString('yyyy-MM-dd HH:mm:ss'))"
  Write-Host " - 耗时: $Duration"
  if ($SvnRevision) {
    Write-Host " - SVN 版本: $SvnRevision"
  }
  if ($CommitStatus) {
    Write-Host " - 提交: $CommitStatus"
  }
  Write-Host '运行结束。'
}

function Format-Json {
  param(
    [string]$Json,
    [int]$Indent = 2
  )

  if ([string]::IsNullOrWhiteSpace($Json)) {
    return $Json
  }

  $indentText = ' ' * $Indent
  $sb = [System.Text.StringBuilder]::new()
  $depth = 0
  $inString = $false
  $escapeNext = $false

  foreach ($ch in $Json.ToCharArray()) {
    if ($escapeNext) {
      $escapeNext = $false
      [void]$sb.Append($ch)
      continue
    }

    if ($inString) {
      if ($ch -eq '\') {
        $escapeNext = $true
      } elseif ($ch -eq '"') {
        $inString = $false
      }
      [void]$sb.Append($ch)
      continue
    }

    switch ($ch) {
      '"' {
        $inString = $true
        [void]$sb.Append($ch)
      }
      '{' {
        [void]$sb.Append($ch)
        [void]$sb.Append([Environment]::NewLine)
        $depth++
        [void]$sb.Append($indentText * $depth)
      }
      '[' {
        [void]$sb.Append($ch)
        [void]$sb.Append([Environment]::NewLine)
        $depth++
        [void]$sb.Append($indentText * $depth)
      }
      '}' {
        [void]$sb.Append([Environment]::NewLine)
        $depth--
        [void]$sb.Append($indentText * $depth)
        [void]$sb.Append($ch)
      }
      ']' {
        [void]$sb.Append([Environment]::NewLine)
        $depth--
        [void]$sb.Append($indentText * $depth)
        [void]$sb.Append($ch)
      }
      ':' {
        [void]$sb.Append(': ')
      }
      ',' {
        [void]$sb.Append($ch)
        [void]$sb.Append([Environment]::NewLine)
        [void]$sb.Append($indentText * $depth)
      }
      default {
        if (-not [char]::IsWhiteSpace($ch)) {
          [void]$sb.Append($ch)
        }
      }
    }
  }

  return $sb.ToString()
}

function Convert-ProfileMap {
  param(
    [object]$Map
  )

  if (-not $Map) {
    return $null
  }

  $ordered = [ordered]@{}
  if ($Map -is [System.Collections.IDictionary]) {
    foreach ($entry in $Map.GetEnumerator() | Sort-Object Key) {
      $ordered[$entry.Key] = $entry.Value
    }
  } else {
    foreach ($prop in $Map.PSObject.Properties | Sort-Object Name) {
      $ordered[$prop.Name] = $prop.Value
    }
  }

  return $ordered
}

function Get-ProfileHash {
  param(
    [object]$Profile
  )

  if (-not $Profile) {
    return $null
  }

  $payload = [ordered]@{
    projectRoot         = $Profile.projectRoot
    svnTargetRootRel    = $Profile.svnTargetRootRel
    svnDefaultTargetRel = $Profile.svnDefaultTargetRel
    svnRoots            = Convert-ProfileMap $Profile.svnRoots
    defaultBuildScripts = Convert-ProfileMap $Profile.defaultBuildScripts
  }

  $json = $payload | ConvertTo-Json -Depth 6 -Compress
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
  $hashBytes = [System.Security.Cryptography.SHA256]::Create().ComputeHash($bytes)
  return ($hashBytes | ForEach-Object { $_.ToString('x2') }) -join ''
}

function Test-RelativePath {
  param(
    [string]$PathValue
  )

  if ([string]::IsNullOrWhiteSpace($PathValue)) {
    return $false
  }

  $trimmed = $PathValue.Trim()
  if ($trimmed -match '^\.[\\/]*$') {
    return $false
  }

  if ([System.IO.Path]::IsPathRooted($PathValue)) {
    return $false
  }

  if ($PathValue -match '(^|[\\/])\.\.([\\/]|$)') {
    return $false
  }

  return $true
}

function Get-RerunCommand {
  param(
    [hashtable]$BoundParameters
  )

  $parts = @(
    'powershell',
    '-NoProfile',
    '-ExecutionPolicy',
    'Bypass',
    '-File',
    ('"' + $PSCommandPath + '"')
  )

  if (-not $BoundParameters) {
    return ($parts -join ' ')
  }

  foreach ($entry in $BoundParameters.GetEnumerator()) {
    $key = $entry.Key
    $val = $entry.Value
    if ($val -is [switch]) {
      if ($val.IsPresent) {
        $parts += "-$key"
      }
    } else {
      $parts += "-$key"
      $parts += (Format-ArgValue $val)
    }
  }

  return ($parts -join ' ')
}

function Select-Profile {
  param(
    [object[]]$Profiles,
    [string]$SelectedName,
    [switch]$AutoSelect
  )

  if (-not $Profiles -or $Profiles.Count -eq 0) {
    return $null
  }

  if ($SelectedName -and $AutoSelect) {
    $match = $Profiles | Where-Object { $_.name -eq $SelectedName } | Select-Object -First 1
    if (-not $match) {
      throw "未找到配置: $SelectedName"
    }
    return $match
  }

  if ($Profiles.Count -eq 1) {
    return $Profiles[0]
  }

  Write-Host '可用配置:'
  for ($i = 0; $i -lt $Profiles.Count; $i++) {
    $profile = $Profiles[$i]
    $rootHint = if ($profile.projectRoot) { " - $($profile.projectRoot)" } else { '' }
    Write-Host ("[{0}] {1}{2}" -f ($i + 1), $profile.name, $rootHint)
  }

  $defaultIndex = $null
  if ($SelectedName) {
    for ($i = 0; $i -lt $Profiles.Count; $i++) {
      if ($Profiles[$i].name -eq $SelectedName) {
        $defaultIndex = $i
        break
      }
    }
  }

  while ($true) {
    $prompt = if ($defaultIndex -ne $null) { "选择配置序号 [$($defaultIndex + 1)]" } else { '选择配置序号' }
    $input = Read-HostSafe $prompt
    if ([string]::IsNullOrWhiteSpace($input) -and $defaultIndex -ne $null) {
      return $Profiles[$defaultIndex]
    }
    if ($input -match '^\d+$') {
      $index = [int]$input - 1
      if ($index -ge 0 -and $index -lt $Profiles.Count) {
        return $Profiles[$index]
      }
    }
    Write-Host '输入无效，请输入列表中的序号。'
  }
}

function Select-Env {
  param(
    [string[]]$Options,
    [string]$SelectedName,
    [switch]$AutoSelect
  )

  if (-not $Options -or $Options.Count -eq 0) {
    return $null
  }

  if ($SelectedName -and $AutoSelect) {
    return $SelectedName
  }

  if ($Options.Count -eq 1) {
    return $Options[0]
  }

  Write-Host '可用环境:'
  for ($i = 0; $i -lt $Options.Count; $i++) {
    Write-Host ("[{0}] {1}" -f ($i + 1), $Options[$i])
  }

  $defaultIndex = $null
  if ($SelectedName) {
    $index = [Array]::IndexOf($Options, $SelectedName)
    if ($index -ge 0) {
      $defaultIndex = $index
    }
  }

  while ($true) {
    $prompt = if ($defaultIndex -ne $null) { "选择环境序号 [$($defaultIndex + 1)]" } else { '选择环境序号' }
    $input = Read-HostSafe $prompt
    if ([string]::IsNullOrWhiteSpace($input) -and $defaultIndex -ne $null) {
      return $Options[$defaultIndex]
    }
    if ($input -match '^\d+$') {
      $index = [int]$input - 1
      if ($index -ge 0 -and $index -lt $Options.Count) {
        return $Options[$index]
      }
    }
    Write-Host '输入无效，请输入列表中的序号。'
  }
}

function Select-TargetRel {
  param(
    [hashtable]$Map,
    [string]$DefaultValue
  )

  if (-not $Map -or $Map.Count -eq 0) {
    return $null
  }

  $entries = @()
  foreach ($entry in $Map.GetEnumerator()) {
    $entries += [pscustomobject]@{
      Key = $entry.Key
      Value = $entry.Value
    }
  }

  Write-Host '可用目标目录:'
  for ($i = 0; $i -lt $entries.Count; $i++) {
    $entry = $entries[$i]
    Write-Host ("[{0}] {1} => {2}" -f ($i + 1), $entry.Key, $entry.Value)
  }

  $defaultIndex = $null
  if ($DefaultValue) {
    for ($i = 0; $i -lt $entries.Count; $i++) {
      if ($entries[$i].Value -eq $DefaultValue) {
        $defaultIndex = $i
        break
      }
    }
  }

  while ($true) {
    $prompt = if ($defaultIndex -ne $null) { "选择目标目录序号 [$($defaultIndex + 1)]" } else { '选择目标目录序号' }
    $input = Read-HostSafe $prompt
    if ([string]::IsNullOrWhiteSpace($input) -and $defaultIndex -ne $null) {
      return $entries[$defaultIndex].Value
    }
    if ($input -match '^\d+$') {
      $index = [int]$input - 1
      if ($index -ge 0 -and $index -lt $entries.Count) {
        return $entries[$index].Value
      }
    }
    Write-Host '输入无效，请输入列表中的序号。'
  }
}

function Select-Confirm {
  param(
    [string]$Prompt
  )

  $options = @('是', '否')
  Write-Host $Prompt
  for ($i = 0; $i -lt $options.Count; $i++) {
    Write-Host ("[{0}] {1}" -f ($i + 1), $options[$i])
  }

  while ($true) {
    $input = Read-HostSafe '选择序号 [2]'
    if ([string]::IsNullOrWhiteSpace($input)) {
      return $false
    }
    if ($input -match '^\d+$') {
      $index = [int]$input - 1
      if ($index -eq 0) {
        return $true
      }
      if ($index -eq 1) {
        return $false
      }
    }
    Write-Host '输入无效，请输入列表中的序号。'
  }
}

function Update-LastHistory {
  param(
    [object]$NewEntry,
    [object[]]$ExistingEntries,
    [string]$Path
  )

  $entries = @($NewEntry)
  if ($ExistingEntries) {
    $entries += $ExistingEntries
  }
  $maxEntries = 200
  if ($entries.Count -gt $maxEntries) {
    $entries = $entries[0..($maxEntries - 1)]
  }

  $json = $entries | ConvertTo-Json -Depth 5 -Compress
  $formatted = Format-Json -Json $json -Indent 2
  if ($formatted -and -not $formatted.EndsWith([Environment]::NewLine)) {
    $formatted += [Environment]::NewLine
  }
  $formatted | Set-Content -Path $Path -Encoding utf8
  return $entries
}

try {
  $scriptStart = Get-Date
  $svnRoots = @{}
  $defaultBuildScripts = @{}


  $lastPath = Join-Path $PSScriptRoot 'publish-svn.last.json'
  $lastEntries = @()
  $lastSuccessProfile = $null
  if (Test-Path $lastPath) {
    try {
      $lastRaw = Get-Content -Raw -Encoding UTF8 $lastPath | ConvertFrom-Json
      if ($lastRaw -is [System.Collections.IEnumerable] -and -not ($lastRaw -is [string])) {
        $lastEntries = @($lastRaw)
      } elseif ($lastRaw) {
        $lastEntries = @($lastRaw)
      }
      if ($lastEntries.Count -gt 0) {
        $lastSuccessProfile = $lastEntries | Where-Object { $_.Succeeded -eq $true -and $_.Profile } | Select-Object -First 1
      }
    } catch {
      Write-Host "警告: 读取上次参数失败: $lastPath"
    }
  }

  $configPath = Join-Path $PSScriptRoot 'publish-svn.config.json'
  $config = $null
  if (Test-Path $configPath) {
    try {
      $config = Get-Content -Raw -Encoding UTF8 $configPath | ConvertFrom-Json
    } catch {
      Write-Host "警告: 读取配置失败: $configPath"
    }
  }

  if (-not $config -or -not $config.profiles -or @($config.profiles).Count -eq 0) {
    throw "未找到配置，请检查: $configPath"
  }

  $selectedProfile = $null
  $selectedProfileName = $null
  if ($Profile) {
    $selectedProfileName = $Profile
  } elseif ($lastSuccessProfile -and $lastSuccessProfile.Profile) {
    $match = $config.profiles | Where-Object { $_.name -eq $lastSuccessProfile.Profile } | Select-Object -First 1
    if ($match) {
      $selectedProfileName = $lastSuccessProfile.Profile
    }
  }
  $autoSelect = [bool]$Profile
  $selectedProfile = Select-Profile -Profiles $config.profiles -SelectedName $selectedProfileName -AutoSelect:$autoSelect

  if ($selectedProfile) {
    $Profile = $selectedProfile.name

    $svnRootsMap = Convert-ProfileMap $selectedProfile.svnRoots
    if (-not $svnRootsMap -or $svnRootsMap.Count -eq 0) {
      throw "Profile 未配置 svnRoots: $($selectedProfile.name)"
    }
    $svnRoots = @{}
    foreach ($entry in $svnRootsMap.GetEnumerator()) {
      $svnRoots[$entry.Key] = $entry.Value
    }

    $buildScriptsMap = Convert-ProfileMap $selectedProfile.defaultBuildScripts
    if (-not $NoBuild -and (-not $buildScriptsMap -or $buildScriptsMap.Count -eq 0)) {
      throw "Profile 未配置 defaultBuildScripts: $($selectedProfile.name)"
    }
    $defaultBuildScripts = @{}
    if ($buildScriptsMap) {
      foreach ($entry in $buildScriptsMap.GetEnumerator()) {
        $defaultBuildScripts[$entry.Key] = $entry.Value
      }
    }
  }

  $profileHash = if ($selectedProfile) { Get-ProfileHash -Profile $selectedProfile } else { $null }

  $lastForProfile = $null
  if ($selectedProfile -and $lastEntries.Count -gt 0) {
    $lastForProfile = $lastEntries | Where-Object {
      $_.Profile -eq $selectedProfile.name -and
      $_.Succeeded -eq $true -and
      $_.ProfileHash -eq $profileHash
    } | Select-Object -First 1
  }

  if (-not $ProjectRoot -and $lastForProfile -and -not [string]::IsNullOrWhiteSpace($lastForProfile.ProjectRoot)) {
    if (Test-Path $lastForProfile.ProjectRoot) {
      $ProjectRoot = $lastForProfile.ProjectRoot
    }
  }
  if (-not $ProjectRoot -and $selectedProfile -and $selectedProfile.projectRoot) {
    $ProjectRoot = $selectedProfile.projectRoot
  }

  if ($selectedProfile) {
    if (-not $ProjectRoot) {
      throw "Profile 缺少 projectRoot: $($selectedProfile.name)"
    }

    if (-not $selectedProfile.svnTargetRootRel) {
      throw "Profile 缺少 svnTargetRootRel: $($selectedProfile.name)"
    }
    $hasDefaultTargetRel = -not [string]::IsNullOrWhiteSpace($selectedProfile.svnDefaultTargetRel)
    $hasTargetRelFromEnv = -not [string]::IsNullOrWhiteSpace($selectedProfile.svnDefaultTargetRelFromEnv)
    $hasTargetRelMap = $selectedProfile.svnDefaultTargetRelMap -ne $null
    if (-not $hasDefaultTargetRel -and -not ($hasTargetRelFromEnv -and $hasTargetRelMap)) {
      throw "Profile 缺少 svnDefaultTargetRel 或 svnDefaultTargetRelFromEnv+svnDefaultTargetRelMap: $($selectedProfile.name)"
    }

    Write-Host '已选择配置:'
    Write-Host " - name: $($selectedProfile.name)"
    Write-Host " - projectRoot: $ProjectRoot"
    Write-Host " - svnTargetRootRel: $($selectedProfile.svnTargetRootRel)"
    if ($selectedProfile.svnDefaultTargetRel) {
      Write-Host " - svnDefaultTargetRel: $($selectedProfile.svnDefaultTargetRel)"
    }
    if ($selectedProfile.svnDefaultTargetRelFromEnv) {
      Write-Host " - svnDefaultTargetRelFromEnv: $($selectedProfile.svnDefaultTargetRelFromEnv)"
    }
    if ($selectedProfile.svnDefaultTargetRelMap) {
      Write-Host ' - svnDefaultTargetRelMap:'
      $targetRelMap = Convert-ProfileMap $selectedProfile.svnDefaultTargetRelMap
      if ($targetRelMap) {
        foreach ($entry in $targetRelMap.GetEnumerator()) {
          Write-Host ("   {0} = {1}" -f $entry.Key, $entry.Value)
        }
      }
    }
    if ($svnRoots.Count -gt 0) {
      Write-Host ' - svnRoots:'
      foreach ($entry in $svnRoots.GetEnumerator()) {
        Write-Host ("   {0} = {1}" -f $entry.Key, $entry.Value)
      }
    }
    if ($defaultBuildScripts.Count -gt 0) {
      Write-Host ' - defaultBuildScripts:'
      foreach ($entry in $defaultBuildScripts.GetEnumerator()) {
        Write-Host ("   {0} = {1}" -f $entry.Key, $entry.Value)
      }
    }

  }

  if ($ProjectRoot) {
    $ProjectRoot = (Resolve-Path $ProjectRoot -ErrorAction Stop).Path
  } else {
    $ProjectRoot = (Get-Location).Path
  }

  $envDefault = if ($Env) { $Env } elseif ($lastForProfile -and -not [string]::IsNullOrWhiteSpace($lastForProfile.Env)) { $lastForProfile.Env } else { 'dev' }
  $envOptions = @()
  if ($svnRoots.Count -gt 0) {
    $envOptions = $svnRoots.Keys | Sort-Object
  }
  if ($envOptions.Count -gt 0) {
    $Env = Select-Env -Options $envOptions -SelectedName $envDefault -AutoSelect:([bool]$Env)
  } else {
    $Env = Prompt-WithDefault $Env 'Env' $envDefault
  }

  $targetRootDefault = if ($TargetRootRel) { $TargetRootRel } elseif ($lastForProfile -and -not [string]::IsNullOrWhiteSpace($lastForProfile.TargetRootRel)) { $lastForProfile.TargetRootRel } elseif ($selectedProfile -and $selectedProfile.svnTargetRootRel) { $selectedProfile.svnTargetRootRel } else { '' }
  $TargetRootRel = Prompt-WithDefault $TargetRootRel 'TargetRootRel (e.g. weekly || normal)' $targetRootDefault

  $targetRelFromEnvKey = if ($selectedProfile -and $selectedProfile.svnDefaultTargetRelFromEnv) { [string]$selectedProfile.svnDefaultTargetRelFromEnv } else { $null }
  $targetRelMap = $null
  if ($selectedProfile -and $selectedProfile.svnDefaultTargetRelMap) {
    $targetRelMap = Convert-ProfileMap $selectedProfile.svnDefaultTargetRelMap
  }
  $useMappedTargetRel = (-not [string]::IsNullOrWhiteSpace($targetRelFromEnvKey)) -and $targetRelMap -and ($targetRelMap.Count -gt 0)

  if ($TargetRel -and $useMappedTargetRel) {
    $profileName = if ($selectedProfile -and $selectedProfile.name) { $selectedProfile.name } else { $Profile }
    if (-not $profileName) {
      $profileName = 'unknown'
    }
    throw "配置 $profileName 已启用环境映射，不允许手动传入 TargetRel。"
  }

  if (-not $TargetRel -and $useMappedTargetRel) {
    $profileName = if ($selectedProfile -and $selectedProfile.name) { $selectedProfile.name } else { $Profile }
    if (-not $profileName) {
      $profileName = 'unknown'
    }
    $envValue = Get-EnvValue -FilePath (Join-Path $ProjectRoot '.env') -Key $targetRelFromEnvKey
    if ([string]::IsNullOrWhiteSpace($envValue)) {
      throw "配置 $profileName 未在 .env 中找到 $targetRelFromEnvKey，请确认配置。"
    }
    if (-not $targetRelMap.Contains($envValue)) {
      throw "配置 $profileName 的 .env 中 $targetRelFromEnvKey=$envValue 未匹配到配置映射，请检查 svnDefaultTargetRelMap。"
    }

    $TargetRel = $targetRelMap[$envValue]
    Write-Host ("环境映射: env {0}={1} -> svn {2}" -f $targetRelFromEnvKey, $envValue, $TargetRel)
    Write-Host ("TargetRel (relative to svnTargetRootRel): {0}" -f $TargetRel)
  } else {
    $targetDefault = ''
    if ($TargetRel) {
      $targetDefault = $TargetRel
    } elseif ($lastForProfile -and -not [string]::IsNullOrWhiteSpace($lastForProfile.TargetRel)) {
      $targetDefault = $lastForProfile.TargetRel
    } elseif ($selectedProfile -and $selectedProfile.svnDefaultTargetRel) {
      $targetDefault = $selectedProfile.svnDefaultTargetRel
    }
    $TargetRel = Prompt-WithDefault $TargetRel 'TargetRel (relative to svnTargetRootRel, e.g. page || love2026)' $targetDefault
  }

  if (-not $BuildScript -and $lastForProfile -and -not [string]::IsNullOrWhiteSpace($lastForProfile.BuildScript)) {
    if ($lastForProfile.Env -eq $Env) {
      $BuildScript = $lastForProfile.BuildScript
    }
  }

  if (-not $BuildScript -and $Env) {
    $BuildScript = $defaultBuildScripts[$Env]
  }

  if (-not $Env) {
    throw '必须指定环境。'
  }

  $envInSvnRoots = $svnRoots.ContainsKey($Env)
  $envInBuildScripts = $defaultBuildScripts.ContainsKey($Env)
  if (-not $envInSvnRoots -and (-not $NoBuild -and -not $envInBuildScripts)) {
    throw "环境未配置在 svnRoots 与 defaultBuildScripts: $Env"
  }
  if (-not $envInSvnRoots) {
    throw "环境未配置在 svnRoots: $Env"
  }
  if (-not $NoBuild -and -not $envInBuildScripts) {
    throw "环境未配置在 defaultBuildScripts: $Env"
  }

  if (-not $TargetRel) {
    throw '必须指定目标相对路径。'
  }
  if (-not (Test-RelativePath $TargetRel)) {
    throw "TargetRel 必须为相对路径且不能包含 ..: $TargetRel"
  }

  if (-not $TargetRootRel) {
    throw '必须指定目标工作副本根相对路径。'
  }
  if (-not (Test-RelativePath $TargetRootRel)) {
    throw "svnTargetRootRel 必须为相对路径且不能包含 ..: $TargetRootRel"
  }

  if (-not $NoCommit) {
    $logMessage = $null
    $messageSource = $null

    if ([string]::IsNullOrWhiteSpace($Message)) {
      $gitRoot = $null
      try {
        $git = Get-Command git -ErrorAction SilentlyContinue
        if ($git) {
          $gitRoot = Invoke-CommandUtf8 { & git -C $ProjectRoot rev-parse --show-toplevel 2>$null }
          if ($LASTEXITCODE -eq 0 -and $gitRoot) {
            $gitRoot = ($gitRoot | Out-String).Trim()
          } else {
            $gitRoot = $null
          }
        }
      } catch {
        $gitRoot = $null
      }

      if ($gitRoot) {
        try {
          $gitMessage = Invoke-CommandUtf8 { & git -C $gitRoot -c i18n.logOutputEncoding=utf-8 log -1 --pretty=%B 2>$null }
          if ($LASTEXITCODE -eq 0 -and $gitMessage) {
            $logMessage = ($gitMessage | Out-String).Trim()
            if ($logMessage) {
              $messageSource = 'Git'
            }
          }
        } catch {
          $logMessage = $null
        }
      }
    }

    $defaultMsg = $logMessage
    $messagePrompt = if ($messageSource) { "提交信息 (来自 $messageSource)" } else { '提交信息' }
    $Message = Prompt-WithDefault $Message $messagePrompt $defaultMsg

    if ([string]::IsNullOrWhiteSpace($Message)) {
      throw '未使用 -NoCommit 时必须填写提交信息。'
    }
  }
  if (-not $NoBuild -and $BuildScript) {
    Write-Host "执行构建: $BuildScript"
    Push-Location $ProjectRoot
    try {
      $buildCommand = $BuildScript
      cmd /s /c ('"' + $buildCommand + '"')
      if ($LASTEXITCODE -ne 0) {
        throw "构建失败，退出码: $LASTEXITCODE"
      }
    } finally {
      Pop-Location
    }
  }

  $distResolved = Resolve-Path (Join-Path $ProjectRoot 'dist') -ErrorAction Stop
  $distPath = $distResolved.Path
  $distFiles = Get-ChildItem $distPath -File
  $distDirs = Get-ChildItem $distPath -Directory

  $iconSubDir = Get-EnvValue -FilePath (Join-Path $ProjectRoot '.env') -Key 'VUE_APP_ICON_PATH'

  if ($iconSubDir) {
    $SourcePath = Join-Path $distPath $iconSubDir
  } elseif ($distFiles.Count -eq 0 -and $distDirs.Count -eq 1) {
    $SourcePath = $distDirs[0].FullName
  } else {
    $SourcePath = $distPath
  }

  if (-not (Test-Path $SourcePath)) {
    throw "源路径不存在: $SourcePath"
  }

  $svnRoot = $svnRoots[$Env]
  if (-not (Test-Path $svnRoot)) {
    throw "目标根目录不存在: $svnRoot"
  }

  $svn = Get-Command svn -ErrorAction SilentlyContinue
  if (-not $svn) {
    throw '未在 PATH 中找到 svn。'
  }

  $TargetRoot = Join-Path $svnRoot $TargetRootRel
  if (-not (Test-Path $TargetRoot)) {
    throw "目标工作副本根目录不存在: $TargetRoot"
  }

  if (-not (Test-SvnWorkingCopy -PathValue $TargetRoot)) {
    throw "目标工作副本根目录不是 SVN 工作副本: $TargetRoot"
  }

  $TargetPath = Join-Path $TargetRoot $TargetRel

  $isNewTarget = $false
  $targetExists = Test-Path $TargetPath
  $targetIsWorkingCopy = $false
  if ($targetExists) {
    if (Test-SvnWorkingCopy -PathValue $TargetPath) {
      $targetIsWorkingCopy = $true
    }
  }

  if ($targetIsWorkingCopy) {
    Push-Location $TargetPath
    try {
      Invoke-Svn -SvnArgs @('update') -ErrorMessage "svn update 失败: $TargetPath"
    } finally {
      Pop-Location
    }
  } else {
    $isNewTarget = $true
    if ($targetExists) {
      Write-Host "目标目录存在但未加入版本控制（未 svn add/commit），先更新父目录: $TargetRoot"
    } else {
      Write-Host "目标目录不存在，先更新父目录: $TargetRoot"
    }
    Push-Location $TargetRoot
    try {
      Invoke-Svn -SvnArgs @('update') -ErrorMessage "svn update 失败: $TargetRoot"
    } finally {
      Pop-Location
    }
    if (Test-Path $TargetPath) {
      if (Test-SvnWorkingCopy -PathValue $TargetPath) {
        $targetIsWorkingCopy = $true
        $isNewTarget = $false
      }
    } else {
      $confirmCreate = Select-Confirm -Prompt "目标目录不存在，将创建并继续: $TargetPath，是否继续"
      if (-not $confirmCreate) {
        throw '已取消创建目标目录。'
      }
      New-Item -ItemType Directory -Path $TargetPath | Out-Null
    }
  }


  if (Test-Path $TargetPath) {
    $existingItems = Get-ChildItem -Force -LiteralPath $TargetPath | Where-Object { $_.Name -ne '.svn' }
    if (-not $targetIsWorkingCopy) {
      foreach ($item in $existingItems) {
        Remove-Item -LiteralPath $item.FullName -Recurse -Force
      }
    } else {
      $unversionedTop = New-Object 'System.Collections.Generic.HashSet[string]' ([StringComparer]::OrdinalIgnoreCase)
      $statusLines = $null
      $statusExitCode = 0
      Push-Location $TargetPath
      try {
        $statusLines = & svn status --depth immediates . 2>&1
        $statusExitCode = $LASTEXITCODE
      } finally {
        Pop-Location
      }
      if ($statusExitCode -ne 0) {
        $details = ($statusLines | Out-String).Trim()
        if ($details) {
          throw "svn status 失败: $TargetPath`n$details"
        }
        throw "svn status 失败: $TargetPath"
      }
      foreach ($line in $statusLines) {
        if ($line -match '^\?\s+(?<path>.+)$') {
          $name = $Matches['path'].Trim()
          if ($name) {
            [void]$unversionedTop.Add($name)
          }
        }
      }
      foreach ($item in $existingItems) {
        if ($unversionedTop.Contains($item.Name)) {
          Remove-Item -LiteralPath $item.FullName -Recurse -Force
        } else {
          Invoke-Svn -SvnArgs @('delete', '--force', $item.FullName) -ErrorMessage "svn delete 失败: $($item.FullName)"
        }
      }
    }
  }

  $roboArgs = @(
    $SourcePath,
    $TargetPath,
    '/E',
    '/COPY:DAT',
    '/DCOPY:DAT',
    '/R:1',
    '/W:1',
    '/XD',
    '.svn'
  )

  Write-Host "同步 $SourcePath -> $TargetPath"
  & robocopy @roboArgs | Out-Host
  if ($LASTEXITCODE -ge 8) {
    throw "robocopy 失败，退出码: $LASTEXITCODE"
  }

  Push-Location $TargetPath
  try {
    if ($isNewTarget) {
      Invoke-Svn -SvnArgs @('add', '.') -ErrorMessage 'svn add 失败。'
    } else {
      Invoke-Svn -SvnArgs @('add', '--force', '.') -ErrorMessage 'svn add 失败。'
    }
    $missing = & svn status | Where-Object { $_ -match '^!\s+' } | ForEach-Object { $_ -replace '^!\s+', '' }
    foreach ($m in $missing) {
      Invoke-Svn -SvnArgs @('delete', $m) -ErrorMessage "svn delete 失败: $m"
    }

    & svn status | Out-Host

    if (-not $NoCommit) {
      $commitStart = Get-Date
      Invoke-Svn -SvnArgs @('commit', '-m', $Message) -ErrorMessage 'svn commit 失败。'
      $commitEnd = Get-Date
      $commitDuration = Format-Duration ($commitEnd - $commitStart)
      Write-Host "svn commit 耗时: $commitDuration"
      Invoke-Svn -SvnArgs @('cleanup', $TargetPath) -ErrorMessage 'svn cleanup 失败。'
      $svnInfo = & svn info $TargetPath 2>$null
      $lastRev = ($svnInfo | Where-Object { $_ -match '^Revision:\s+' } | Select-Object -First 1) -replace '^Revision:\s+', ''
    }
  } finally {
    Pop-Location
  }

  $scriptEnd = Get-Date
  $durationText = Format-Duration ($scriptEnd - $scriptStart)
  $profileForLast = if ($Profile) { $Profile } elseif ($selectedProfile) { $selectedProfile.name } else { '' }
  $newLast = [ordered]@{
    Env = $Env
    TargetRootRel = $TargetRootRel
    TargetRel = $TargetRel
    Message = $Message
    BuildScript = $BuildScript
    Profile = $profileForLast
    ProfileHash = $profileHash
    ProjectRoot = $ProjectRoot
    StartTime = $scriptStart.ToString('yyyy-MM-dd HH:mm:ss')
    EndTime = $scriptEnd.ToString('yyyy-MM-dd HH:mm:ss')
    Duration = $durationText
    SvnRevision = $lastRev
    Succeeded = $true
    Error = $null
  }

  $lastEntries = Update-LastHistory -NewEntry $newLast -ExistingEntries $lastEntries -Path $lastPath

  $commitStatus = if ($NoCommit) { '已跳过' } else { '已完成' }
  Write-ResultSummary `
    -Status '成功' `
    -EnvValue $Env `
    -ProfileValue $profileForLast `
    -TargetPathValue $TargetPath `
    -SourcePathValue $SourcePath `
    -MessageValue $Message `
    -StartTime $scriptStart `
    -EndTime $scriptEnd `
    -Duration $durationText `
    -SvnRevision $lastRev `
    -CommitStatus $commitStatus
  Clear-InputBuffer
} catch {
  $scriptEnd = Get-Date
  $errorMessage = $_.Exception.Message
  if ([string]::IsNullOrWhiteSpace($errorMessage)) {
    $errorMessage = ($_ | Out-String).Trim()
  }
  $durationText = Format-Duration ($scriptEnd - $scriptStart)

  $profileForLast = if ($Profile) { $Profile } elseif ($selectedProfile) { $selectedProfile.name } else { '' }
  $failedEntry = [ordered]@{
    Env = $Env
    TargetRootRel = $TargetRootRel
    TargetRel = $TargetRel
    Message = $Message
    BuildScript = $BuildScript
    Profile = $profileForLast
    ProfileHash = $profileHash
    ProjectRoot = $ProjectRoot
    StartTime = $scriptStart.ToString('yyyy-MM-dd HH:mm:ss')
    EndTime = $scriptEnd.ToString('yyyy-MM-dd HH:mm:ss')
    Duration = $durationText
    SvnRevision = $lastRev
    Succeeded = $false
    Error = $errorMessage
  }

  try {
    if (-not $lastPath) {
      $lastPath = Join-Path $PSScriptRoot 'publish-svn.last.json'
    }
    if (-not $lastEntries) {
      $lastEntries = @()
    }
    Update-LastHistory -NewEntry $failedEntry -ExistingEntries $lastEntries -Path $lastPath | Out-Null
  } catch {
    Write-Host "警告: 记录失败历史失败: $($_.Exception.Message)"
  }

  $commitStatus = if ($NoCommit) { '已跳过' } else { '未完成' }
  Write-ResultSummary `
    -Status '失败' `
    -EnvValue $Env `
    -ProfileValue $profileForLast `
    -TargetPathValue $TargetPath `
    -SourcePathValue $SourcePath `
    -MessageValue $Message `
    -StartTime $scriptStart `
    -EndTime $scriptEnd `
    -Duration $durationText `
    -SvnRevision $lastRev `
    -CommitStatus $commitStatus `
    -ErrorMessage $errorMessage
  $retry = Select-Confirm -Prompt '是否重新执行脚本?'
  if ($retry) {
    $cmd = Get-RerunCommand -BoundParameters $PSBoundParameters
    Write-Host '请重新执行以下命令:'
    Write-Host $cmd
  }
  Clear-InputBuffer
  exit 1
}



