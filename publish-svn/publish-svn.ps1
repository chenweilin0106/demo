param(
  [string]$Env,
  [string]$Profile,
  [string]$ProjectRoot,
  [string]$TargetRootRel,
  [string]$TargetRel,
  [string]$Message,
  [string]$BuildScript,
  [string]$OfficialDistRoot,
  [string]$OfficialProjectRel,
  [switch]$NoBuild,
  [switch]$NoCommit,
  [switch]$DebugSvn,
  [switch]$DebugNotify
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

function Prompt-Required {
  param(
    [string]$Value,
    [string]$Prompt,
    [string]$Default,
    [string]$Warning = '输入不能为空，请重新输入。'
  )

  while ($true) {
    $resolved = Prompt-WithDefault $Value $Prompt $Default
    if (-not [string]::IsNullOrWhiteSpace($resolved)) {
      return $resolved
    }
    if (-not [string]::IsNullOrWhiteSpace($Warning)) {
      Write-Host $Warning
    }
    $Value = $null
    $Default = $null
  }
}

function Test-FileNameSegmentValid {
  param(
    [string]$Value
  )

  if ([string]::IsNullOrWhiteSpace($Value)) {
    return $false
  }

  $invalidChars = [System.IO.Path]::GetInvalidFileNameChars()
  return ($Value.IndexOfAny($invalidChars) -lt 0)
}

function Prompt-RequiredFileNameSegment {
  param(
    [string]$Value,
    [string]$Prompt,
    [string]$Default
  )

  while ($true) {
    $resolved = Prompt-WithDefault $Value $Prompt $Default
    if ([string]::IsNullOrWhiteSpace($resolved)) {
      Write-Host '提交信息不能为空，请重新输入。'
      $Value = $null
      continue
    }
    if (-not (Test-FileNameSegmentValid -Value $resolved)) {
      Write-Host '提交信息包含非法字符，请重新输入。'
      $Value = $null
      continue
    }
    return $resolved
  }
}

function Prompt-OptionalFileNameSegment {
  param(
    [string]$Value,
    [string]$Prompt,
    [string]$Suggestion,
    [string]$Hint
  )

  while ($true) {
    if (-not [string]::IsNullOrWhiteSpace($Value)) {
      if (-not (Test-FileNameSegmentValid -Value $Value)) {
        throw '提交信息包含非法字符，请重新输入。'
      }
      return $Value
    }

    $promptText = $Prompt
    if (-not [string]::IsNullOrWhiteSpace($Hint)) {
      $promptText += " $Hint"
    }
    if (-not [string]::IsNullOrWhiteSpace($Suggestion)) {
      $promptText += " [$Suggestion]"
    }
    $resolved = Read-HostSafe $promptText
    if ([string]::IsNullOrWhiteSpace($resolved)) {
      return $null
    }
    if (-not (Test-FileNameSegmentValid -Value $resolved)) {
      Write-Host '提交信息包含非法字符，请重新输入。'
      $Value = $null
      continue
    }
    return $resolved
  }
}

function Invoke-Svn {
  param(
    [string[]]$SvnArgs,
    [string]$ErrorMessage
  )

  $output = & svn @SvnArgs 2>&1
  $output | Out-Host
  if ($DebugSvn) {
    $argText = ($SvnArgs | ForEach-Object { Format-ArgValue $_ }) -join ' '
    $workDir = (Get-Location).Path
    $exitCode = $LASTEXITCODE
    Write-SvnDebugLog -Command ("svn {0}" -f $argText) -WorkDir $workDir -ExitCode $exitCode -Output $output
  }
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

function Write-SvnDebugLog {
  param(
    [string]$Command,
    [string]$WorkDir,
    [int]$ExitCode,
    [string[]]$Output
  )

  if (-not $DebugSvn) {
    return
  }

  $debugPath = Join-Path $PSScriptRoot 'publish-svn.svn-debug.log'
  $timestamp = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss')
  $outputText = ($Output | Out-String).TrimEnd()
  @(
    "[$timestamp]",
    "Command: $Command",
    "WorkDir: $WorkDir",
    "ExitCode: $ExitCode",
    '--- OUTPUT ---',
    $outputText,
    '--- END ---',
    ''
  ) | Add-Content -Path $debugPath -Encoding UTF8
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

function Format-ByteSize {
  param(
    [int64]$Bytes
  )

  if ($Bytes -lt 1024) {
    return ('{0} B' -f $Bytes)
  }
  $kb = $Bytes / 1024
  if ($kb -lt 1024) {
    return ('{0:N2} KB' -f $kb)
  }
  $mb = $kb / 1024
  if ($mb -lt 1024) {
    return ('{0:N2} MB' -f $mb)
  }
  $gb = $mb / 1024
  return ('{0:N2} GB' -f $gb)
}

function Get-FolderByteSize {
  param(
    [string]$FolderPath
  )

  if ([string]::IsNullOrWhiteSpace($FolderPath) -or -not (Test-Path $FolderPath -PathType Container)) {
    return 0
  }

  $total = [int64]0
  try {
    foreach ($file in (Get-ChildItem -LiteralPath $FolderPath -File -Recurse -Force -ErrorAction SilentlyContinue)) {
      $total += [int64]$file.Length
    }
  } catch {
  }

  return $total
}

function Format-Duration {
  param(
    [TimeSpan]$Span
  )

  $totalHours = [int][Math]::Floor($Span.TotalHours)
  return ('{0:00}:{1:00}:{2:00}.{3:000}' -f $totalHours, $Span.Minutes, $Span.Seconds, $Span.Milliseconds)
}

function Format-Timestamp {
  param(
    [DateTime]$Value,
    [string]$Pattern = 'yyyy-MM-dd HH:mm:ss'
  )

  return $Value.ToString($Pattern)
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

function Get-EnvValueFromFiles {
  param(
    [string[]]$FilePaths,
    [string]$Key
  )

  if ([string]::IsNullOrWhiteSpace($Key)) {
    return $null
  }

  foreach ($filePath in $FilePaths) {
    if ([string]::IsNullOrWhiteSpace($filePath)) {
      continue
    }

    $value = Get-EnvValue -FilePath $filePath -Key $Key
    if ($null -ne $value) {
      return $value
    }
  }

  return $null
}

function Find-BandizipCli {
  $cmd = Get-Command bz.exe -ErrorAction SilentlyContinue
  if ($cmd -and $cmd.Source -and (Test-Path $cmd.Source)) {
    return [ordered]@{
      Kind = 'bz'
      Path = [string]$cmd.Source
    }
  }

  $cmd = Get-Command Bandizip.exe -ErrorAction SilentlyContinue
  if ($cmd -and $cmd.Source -and (Test-Path $cmd.Source)) {
    return [ordered]@{
      Kind = 'gui'
      Path = [string]$cmd.Source
    }
  }

  $candidatePaths = @(
    (Join-Path $env:ProgramFiles 'Bandizip\\bz.exe'),
    (Join-Path $env:ProgramFiles 'Bandizip\\Bandizip.exe')
  )
  $programFilesX86 = ${env:ProgramFiles(x86)}
  if (-not [string]::IsNullOrWhiteSpace($programFilesX86)) {
    $candidatePaths += @(
      (Join-Path $programFilesX86 'Bandizip\\bz.exe'),
      (Join-Path $programFilesX86 'Bandizip\\Bandizip.exe')
    )
  }
  foreach ($candidate in $candidatePaths) {
    if ($candidate -and (Test-Path $candidate)) {
      $kind = if ([System.IO.Path]::GetFileName($candidate) -ieq 'bz.exe') { 'bz' } else { 'gui' }
      return [ordered]@{
        Kind = $kind
        Path = [string]$candidate
      }
    }
  }

  return $null
}

function Compress-FolderWithBandizipZip {
  param(
    [Parameter(Mandatory = $true)][string]$FolderPath,
    [Parameter(Mandatory = $true)][string]$ZipPath
  )

  if (-not (Test-Path $FolderPath -PathType Container)) {
    throw "压缩失败：目录不存在: $FolderPath"
  }

  $cli = Find-BandizipCli
  if (-not $cli -or -not $cli.Path) {
    return [ordered]@{
      Skipped = $true
      Reason = '未找到 Bandizip CLI（bz.exe / Bandizip.exe）'
      ZipPath = $ZipPath
      ExitCode = $null
      Output = @()
    }
  }

  $workDir = Split-Path -Parent $FolderPath
  $folderName = Split-Path -Leaf $FolderPath
  $folderFull = (Resolve-Path -LiteralPath $FolderPath -ErrorAction SilentlyContinue)
  if ($folderFull) {
    $FolderPath = $folderFull.Path
  }
  $zipFull = (Resolve-Path -LiteralPath (Split-Path -Parent $ZipPath) -ErrorAction SilentlyContinue)
  if ($zipFull) {
    $ZipPath = Join-Path $zipFull.Path (Split-Path -Leaf $ZipPath)
  }

  $bzArgs = @('c', '-fmt:zip', '-y', '-r')
  $bzArgs += @($ZipPath, '*')

  $output = @()
  $exitCode = 0
  Push-Location $FolderPath
  try {
    $output = @(Invoke-CommandUtf8 { & $cli.Path @bzArgs 2>&1 })
    $exitCode = $LASTEXITCODE
  } finally {
    Pop-Location
  }

  $outputTextForCheck = ($output | Out-String).Trim()
  if ($outputTextForCheck -match '(?m)^Usage:\s*$') {
    $details = $outputTextForCheck
    if ($details) {
      throw "压缩失败（$($cli.Path)）：命令行参数可能不兼容。`n$details"
    }
    throw "压缩失败（$($cli.Path)）：命令行参数可能不兼容。"
  }

  if ($exitCode -ne 0) {
    $details = ($output | Out-String).Trim()
    if ($details) {
      throw "压缩失败（$($cli.Path)），退出码: $exitCode`n$details"
    }
    throw "压缩失败（$($cli.Path)），退出码: $exitCode"
  }

  if (-not (Test-Path $ZipPath -PathType Leaf)) {
    $details = ($output | Out-String).Trim()
    if ($details) {
      throw "压缩失败：未生成压缩包: $ZipPath`n$details"
    }
    throw "压缩失败：未生成压缩包: $ZipPath"
  }

  return [ordered]@{
    Skipped = $false
    Reason = $null
    ZipPath = $ZipPath
    ExitCode = $exitCode
    Output = $output
  }
}

function Get-EnvValueForRun {
  param(
    [string]$ProjectRoot,
    [string]$EnvValue,
    [string]$Key,
    [string]$OverrideEnvFileName
  )

  if ([string]::IsNullOrWhiteSpace($ProjectRoot)) {
    return $null
  }

  $filePaths = @()
  if (-not [string]::IsNullOrWhiteSpace($OverrideEnvFileName)) {
    $filePaths += Join-Path $ProjectRoot $OverrideEnvFileName
  } elseif (-not [string]::IsNullOrWhiteSpace($EnvValue)) {
    $filePaths += Join-Path $ProjectRoot (".env.$EnvValue")
  }
  $filePaths += Join-Path $ProjectRoot '.env'

  return Get-EnvValueFromFiles -FilePaths $filePaths -Key $Key
}

function Get-GitCommitMessage {
  param(
    [string]$ProjectRoot
  )

  if ([string]::IsNullOrWhiteSpace($ProjectRoot)) {
    return $null
  }

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

  if (-not $gitRoot) {
    return $null
  }

  try {
    $gitMessage = $null
    $isMergeCommit = $false

    try {
      $headParents = Invoke-CommandUtf8 { & git -C $gitRoot rev-list --parents -n 1 HEAD 2>$null }
      if ($LASTEXITCODE -eq 0 -and $headParents) {
        $parentParts = (($headParents | Out-String).Trim() -split '\s+')
        $isMergeCommit = ($parentParts.Count -gt 2)
      }
    } catch {
      $isMergeCommit = $false
    }

    if ($isMergeCommit) {
      $gitMessage = Invoke-CommandUtf8 { & git -C $gitRoot -c i18n.logOutputEncoding=utf-8 log --first-parent --no-merges -1 --pretty=%B 2>$null }
      if ($LASTEXITCODE -ne 0 -or -not $gitMessage) {
        $gitMessage = $null
      }
    }
    if (-not $gitMessage) {
      $gitMessage = Invoke-CommandUtf8 { & git -C $gitRoot -c i18n.logOutputEncoding=utf-8 log -1 --pretty=%B 2>$null }
    }
    if ($LASTEXITCODE -eq 0 -and $gitMessage) {
      $logMessage = ($gitMessage | Out-String).Trim()
      if ($logMessage) {
        return $logMessage
      }
    }
  } catch {
    return $null
  }

  return $null
}

function Get-EnvFileLines {
  param(
    [string]$FilePath
  )

  if (-not (Test-Path $FilePath)) {
    return @()
  }

  return Get-Content -Encoding UTF8 $FilePath
}

function Test-ToastRegistration {
  param(
    [string]$AppId
  )

  if ([string]::IsNullOrWhiteSpace($AppId)) {
    return $false
  }

  $startMenuDir = Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs'
  $shortcutPath = Join-Path $startMenuDir 'publish-svn.lnk'
  $regPath = "HKCU:\Software\Classes\AppUserModelId\$AppId"

  return (Test-Path -LiteralPath $shortcutPath) -and (Test-Path $regPath)
}

function Ensure-ToastRegistration {
  param(
    [string]$AppId,
    [string]$DisplayName
  )

  if ([string]::IsNullOrWhiteSpace($AppId)) {
    return $null
  }

  $startMenuDir = Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs'
  $shortcutPath = Join-Path $startMenuDir 'publish-svn.lnk'
  $regPath = "HKCU:\Software\Classes\AppUserModelId\$AppId"

  try {
    if (-not (Test-Path -LiteralPath $startMenuDir)) {
      New-Item -ItemType Directory -Path $startMenuDir -Force | Out-Null
    }

    try {
      New-Item -Path $regPath -Force | Out-Null
      if (-not [string]::IsNullOrWhiteSpace($DisplayName)) {
        New-ItemProperty -Path $regPath -Name 'DisplayName' -Value $DisplayName -PropertyType String -Force | Out-Null
      }
      New-ItemProperty -Path $regPath -Name 'ShowInSettings' -Value 0 -PropertyType DWord -Force | Out-Null
    } catch {
    }

    $exePath = $null
    try {
      $exePath = (Get-Process -Id $PID -ErrorAction Stop).Path
    } catch {
      $exePath = $null
    }
    if ([string]::IsNullOrWhiteSpace($exePath)) {
      $exePath = Join-Path $PSHOME 'powershell.exe'
    }

    if (-not (Test-Path -LiteralPath $shortcutPath)) {
      $wsh = New-Object -ComObject WScript.Shell
      $lnk = $wsh.CreateShortcut($shortcutPath)
      $lnk.TargetPath = $exePath
      $lnk.Arguments = '-NoProfile -WindowStyle Hidden -Command "exit"'
      $lnk.WorkingDirectory = $PSScriptRoot
      $lnk.IconLocation = $exePath
      $lnk.Save()

      try {
        if ($lnk) { [Runtime.InteropServices.Marshal]::FinalReleaseComObject($lnk) | Out-Null }
      } catch {
      }
      try {
        if ($wsh) { [Runtime.InteropServices.Marshal]::FinalReleaseComObject($wsh) | Out-Null }
      } catch {
      }
      [GC]::Collect()
      [GC]::WaitForPendingFinalizers()
    }

    if (-not ('PublishSvn.ShortcutHelper' -as [type])) {
      $typeDef = @(
        'using System;',
        'using System.Runtime.InteropServices;',
        'using System.Runtime.InteropServices.ComTypes;',
        '',
        'namespace PublishSvn {',
        '  [StructLayout(LayoutKind.Sequential, Pack = 4)]',
        '  public struct PropertyKey {',
        '    public Guid fmtid;',
        '    public uint pid;',
        '    public PropertyKey(Guid fmtid, uint pid) {',
        '      this.fmtid = fmtid;',
        '      this.pid = pid;',
        '    }',
        '  }',
        '',
        '  [StructLayout(LayoutKind.Explicit)]',
        '  public struct PropVariant {',
        '    [FieldOffset(0)] public ushort vt;',
        '    [FieldOffset(8)] public IntPtr pointerValue;',
        '    public static PropVariant FromString(string value) {',
        '      var pv = new PropVariant();',
        '      pv.vt = 31;',
        '      pv.pointerValue = Marshal.StringToCoTaskMemUni(value);',
        '      return pv;',
        '    }',
        '    public void Clear() {',
        '      PropVariantClear(ref this);',
        '    }',
        '    [DllImport("ole32.dll")]',
        '    private static extern int PropVariantClear(ref PropVariant pvar);',
        '  }',
        '',
        '  [ComImport]',
        '  [Guid("000214F9-0000-0000-C000-000000000046")]',
        '  [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]',
        '  public interface IShellLinkW {',
        '    void GetPath([Out, MarshalAs(UnmanagedType.LPWStr)] System.Text.StringBuilder pszFile, int cchMaxPath, out IntPtr pfd, int fFlags);',
        '    void GetIDList(out IntPtr ppidl);',
        '    void SetIDList(IntPtr pidl);',
        '    void GetDescription([Out, MarshalAs(UnmanagedType.LPWStr)] System.Text.StringBuilder pszName, int cchMaxName);',
        '    void SetDescription([MarshalAs(UnmanagedType.LPWStr)] string pszName);',
        '    void GetWorkingDirectory([Out, MarshalAs(UnmanagedType.LPWStr)] System.Text.StringBuilder pszDir, int cchMaxPath);',
        '    void SetWorkingDirectory([MarshalAs(UnmanagedType.LPWStr)] string pszDir);',
        '    void GetArguments([Out, MarshalAs(UnmanagedType.LPWStr)] System.Text.StringBuilder pszArgs, int cchMaxPath);',
        '    void SetArguments([MarshalAs(UnmanagedType.LPWStr)] string pszArgs);',
        '    void GetHotkey(out short pwHotkey);',
        '    void SetHotkey(short wHotkey);',
        '    void GetShowCmd(out int piShowCmd);',
        '    void SetShowCmd(int iShowCmd);',
        '    void GetIconLocation([Out, MarshalAs(UnmanagedType.LPWStr)] System.Text.StringBuilder pszIconPath, int cchIconPath, out int piIcon);',
        '    void SetIconLocation([MarshalAs(UnmanagedType.LPWStr)] string pszIconPath, int iIcon);',
        '    void SetRelativePath([MarshalAs(UnmanagedType.LPWStr)] string pszPathRel, int dwReserved);',
        '    void Resolve(IntPtr hwnd, int fFlags);',
        '    void SetPath([MarshalAs(UnmanagedType.LPWStr)] string pszFile);',
        '  }',
        '',
        '  [ComImport]',
        '  [Guid("886D8EEB-8CF2-4446-8D02-CDBA1DBDCF99")]',
        '  [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]',
        '  public interface IPropertyStore {',
        '    uint GetCount([Out] out uint cProps);',
        '    uint GetAt([In] uint iProp, out PropertyKey pkey);',
        '    uint GetValue([In] ref PropertyKey key, out PropVariant pv);',
        '    uint SetValue([In] ref PropertyKey key, [In] ref PropVariant pv);',
        '    uint Commit();',
        '  }',
        '',
        '  [ComImport]',
        '  [Guid("0000010b-0000-0000-C000-000000000046")]',
        '  [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]',
        '  public interface IPersistFile {',
        '    void GetClassID(out Guid pClassID);',
        '    [PreserveSig] int IsDirty();',
        '    void Load([MarshalAs(UnmanagedType.LPWStr)] string pszFileName, uint dwMode);',
        '    void Save([MarshalAs(UnmanagedType.LPWStr)] string pszFileName, bool fRemember);',
        '    void SaveCompleted([MarshalAs(UnmanagedType.LPWStr)] string pszFileName);',
        '    void GetCurFile([MarshalAs(UnmanagedType.LPWStr)] out string ppszFileName);',
        '  }',
        '',
        '  [ComImport]',
        '  [Guid("00021401-0000-0000-C000-000000000046")]',
        '  public class ShellLink { }',
        '',
        '  public static class ShortcutHelper {',
        '    private static readonly PropertyKey AppIdKey = new PropertyKey(new Guid("9F4C2855-9F79-4B39-A8D0-E1D42DE1D5F3"), 5);',
        '    public static void SetAppUserModelId(string shortcutPath, string appId) {',
        '      if (string.IsNullOrWhiteSpace(shortcutPath) || string.IsNullOrWhiteSpace(appId)) {',
        '        return;',
        '      }',
        '      var link = (IShellLinkW)new ShellLink();',
        '      var persist = (IPersistFile)link;',
        '      persist.Load(shortcutPath, 2);',
        '      var store = (IPropertyStore)link;',
        '      var pv = PropVariant.FromString(appId);',
        '      try {',
        '        var key = AppIdKey;',
        '        store.SetValue(ref key, ref pv);',
        '        store.Commit();',
        '      } finally {',
        '        pv.Clear();',
        '      }',
        '      persist.Save(shortcutPath, true);',
        '    }',
        '  }',
        '}'
      ) -join [Environment]::NewLine

      Add-Type -Language CSharp -TypeDefinition $typeDef | Out-Null
    }

    for ($i = 0; $i -lt 5; $i++) {
      try {
        [PublishSvn.ShortcutHelper]::SetAppUserModelId($shortcutPath, $AppId)
        break
      } catch {
        if ($i -ge 4) {
          if ($DebugNotify) {
            Write-Host "通知警告: 写入快捷方式 AppId 失败: $($_.Exception.Message)"
          }
          throw
        }
        Start-Sleep -Milliseconds 120
      }
    }
    return $shortcutPath
  } catch {
    return $null
  }
}

function Send-ToastNotification {
  param(
    [string]$Title,
    [string[]]$Lines,
    [string]$AppId
  )

  if ([string]::IsNullOrWhiteSpace($Title)) {
    return $false
  }

  try {
    Add-Type -AssemblyName System.Runtime.WindowsRuntime -ErrorAction SilentlyContinue | Out-Null

    if (-not ('PublishSvn.ProcessAppId' -as [type])) {
      Add-Type -Language CSharp -TypeDefinition @'
using System;
using System.Runtime.InteropServices;

namespace PublishSvn {
  public static class ProcessAppId {
    [DllImport("shell32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern int SetCurrentProcessExplicitAppUserModelID(string appID);
  }
}
'@ | Out-Null
    }

    if (-not [string]::IsNullOrWhiteSpace($AppId)) {
      # Per-candidate AppId is applied below.
    }

    $xml = [Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime]::new()
    $xml.LoadXml("<toast><visual><binding template='ToastGeneric'></binding></visual></toast>")
    $binding = $xml.SelectSingleNode('//binding')

    $text = $xml.CreateElement('text')
    $text.InnerText = $Title
    $binding.AppendChild($text) | Out-Null

    foreach ($line in ($Lines | Where-Object { -not [string]::IsNullOrWhiteSpace($_) })) {
      $node = $xml.CreateElement('text')
      $node.InnerText = $line
      $binding.AppendChild($node) | Out-Null
    }

    $toast = [Windows.UI.Notifications.ToastNotification, Windows.UI.Notifications, ContentType = WindowsRuntime]::new($xml)

    $appIdsToTry = @()
    if (-not [string]::IsNullOrWhiteSpace($AppId)) {
      $appIdsToTry += $AppId
    }
    $appIdsToTry += @('Microsoft.Windows.PowerShell', 'Windows PowerShell', 'Microsoft.PowerShell', 'PowerShell')

    try {
      $startAppIds = Get-StartApps 2>$null | Where-Object { $_.Name -match 'PowerShell|Terminal|终端|命令提示符|cmd' } | Select-Object -ExpandProperty AppID
      if ($startAppIds) {
        $appIdsToTry += $startAppIds
      }
    } catch {
    }

    foreach ($candidate in ($appIdsToTry | Select-Object -Unique)) {
      try {
        try {
          [void][PublishSvn.ProcessAppId]::SetCurrentProcessExplicitAppUserModelID($candidate)
        } catch {
          if ($DebugNotify) {
            Write-Host "通知警告: 设置进程 AppId 失败 (AppId=$candidate): $($_.Exception.Message)"
          }
        }

        $notifier = [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime]::CreateToastNotifier($candidate)
        $notifier.Show($toast)
        if ($DebugNotify) {
          Write-Host "通知提示: Toast 已发送 (AppId=$candidate)"
        }
        return $true
      } catch {
        if ($DebugNotify) {
          Write-Host "通知警告: 发送 Toast 失败 (AppId=$candidate): $($_.Exception.Message)"
        }
      }
    }

  } catch {
    if ($DebugNotify) {
      Write-Host "通知警告: 初始化 Toast 失败: $($_.Exception.Message)"
    }
  }

  return $false
}

function Truncate-Text {
  param(
    [string]$Text,
    [int]$MaxLength = 80
  )

  if ([string]::IsNullOrWhiteSpace($Text)) {
    return $Text
  }

  $normalized = ($Text -replace '\s+', ' ').Trim()
  if ($normalized.Length -le $MaxLength) {
    return $normalized
  }

  if ($MaxLength -le 1) {
    return $normalized.Substring(0, [Math]::Max(0, $MaxLength))
  }

  return $normalized.Substring(0, $MaxLength - 1) + '…'
}

function Write-ResultSummary {
  param(
    [string]$Status,
    [string]$EnvValue,
    [string]$ProfileValue,
    [string]$TargetPathValue,
    [string]$SourcePathValue,
    [string]$MessageValue,
    [string]$CompressStatus,
    [string]$CompressDetail,
    [DateTime]$StartTime,
    [DateTime]$EndTime,
    [string]$Duration,
    [string]$SvnRevision,
    [string]$CommitStatus,
    [string]$ErrorMessage
  )

  $showCommitStatus = $CommitStatus -and ($EnvValue -ine 'official')

  Write-Host ''
  Write-Host '--- 结果 ---'
  Write-Host ''
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
  if ($showCommitStatus) {
    Write-Host " - 提交SVN: $CommitStatus"
  }
  if (-not [string]::IsNullOrWhiteSpace($CompressStatus)) {
    if (-not [string]::IsNullOrWhiteSpace($CompressDetail)) {
      Write-Host (" - 压缩: {0} | {1}" -f $CompressStatus, $CompressDetail)
    } else {
      Write-Host (" - 压缩: {0}" -f $CompressStatus)
    }
  }
  Write-Host '运行结束。'

  $title = "publish-svn：$Status"

  $line1 = "环境: $EnvValue | 配置: $ProfileValue | 耗时: $Duration"
  if ([string]::IsNullOrWhiteSpace($ErrorMessage) -and -not [string]::IsNullOrWhiteSpace($CompressStatus)) {
    $line1 += " | 压缩: $CompressStatus"
  }
  $line2 = $null

  if (-not [string]::IsNullOrWhiteSpace($ErrorMessage)) {
    $line2 = "错误: $(Truncate-Text -Text $ErrorMessage -MaxLength 120)"
  } else {
    $parts = @()
    if (-not [string]::IsNullOrWhiteSpace($CompressDetail)) {
      $parts += "压缩: $(Truncate-Text -Text $CompressDetail -MaxLength 60)"
    }
    if ($showCommitStatus) {
      $parts += "提交SVN: $CommitStatus"
    }
    if ($SvnRevision) {
      $parts += "SVN: $SvnRevision"
    }
    if (-not [string]::IsNullOrWhiteSpace($MessageValue)) {
      $parts += (Truncate-Text -Text $MessageValue -MaxLength 45)
    }
    $line2 = ($parts -join ' | ')
  }

  $lines = @($line1, $line2) | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }

  $appId = 'publish-svn'

  if (-not (Test-ToastRegistration -AppId $appId)) {
    if ($DebugNotify) {
      Write-Host '通知提示: 未检测到 publish-svn 注册，尝试注册...'
    }
    $registration = Ensure-ToastRegistration -AppId $appId -DisplayName 'publish-svn'
    if (-not $registration -and $DebugNotify) {
      Write-Host '通知警告: publish-svn 注册失败，将降级使用系统 AppId 发送。'
    }
  } elseif ($DebugNotify) {
    Write-Host '通知提示: publish-svn 已注册，直接发送。'
  }

  $sent = Send-ToastNotification -Title $title -Lines $lines -AppId $appId
  if (-not $sent) {
    Write-Warning '通知警告: 系统通知发送失败（所有候选 AppId 均失败）。如需排查请加 -DebugNotify 查看详细日志。'
    if ($DebugNotify) {
      Write-Host '通知警告: 所有候选 AppId 均发送失败。'
    }
  }
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

function Get-MapKeysInOrder {
  param(
    [object]$Map
  )

  if (-not $Map) {
    return @()
  }

  if ($Map -is [System.Collections.IDictionary]) {
    return @($Map.Keys)
  }

  return @($Map.PSObject.Properties | ForEach-Object { $_.Name })
}

function Write-SelectedProfileSummary {
  param(
    [object]$Profile,
    [string]$ResolvedProjectRoot
  )

  if (-not $Profile) {
    return
  }

  Write-Host '已选择配置:'

  foreach ($prop in $Profile.PSObject.Properties) {
    $key = $prop.Name
    $val = $prop.Value

    switch ($key) {
      'name' {
        Write-Host " - name: $($Profile.name)"
        continue
      }
      'projectRoot' {
        $display = if (-not [string]::IsNullOrWhiteSpace($ResolvedProjectRoot)) { $ResolvedProjectRoot } else { $val }
        Write-Host " - projectRoot: $display"
        continue
      }
      'svnRoots' {
        if ($val) {
          Write-Host ' - svnRoots:'
          foreach ($k in (Get-MapKeysInOrder -Map $val)) {
            Write-Host ("   {0} = {1}" -f $k, $val.$k)
          }
        }
        continue
      }
      'defaultBuildScripts' {
        if ($val) {
          Write-Host ' - defaultBuildScripts:'
          foreach ($k in (Get-MapKeysInOrder -Map $val)) {
            Write-Host ("   {0} = {1}" -f $k, $val.$k)
          }
        }
        continue
      }
      'svnDefaultTargetRelMap' {
        if ($val) {
          Write-Host ' - svnDefaultTargetRelMap:'
          foreach ($k in (Get-MapKeysInOrder -Map $val)) {
            Write-Host ("   {0} = {1}" -f $k, $val.$k)
          }
        }
        continue
      }
      'officialProjectRelMap' {
        if ($val) {
          Write-Host ' - officialProjectRelMap:'
          foreach ($k in (Get-MapKeysInOrder -Map $val)) {
            Write-Host ("   {0} = {1}" -f $k, $val.$k)
          }
        }
        continue
      }
      default {
        if ($null -eq $val) {
          continue
        }
        Write-Host (" - {0}: {1}" -f $key, $val)
      }
    }
  }
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
    officialDistRoot = $Profile.officialDistRoot
    officialProjectRel = $Profile.officialProjectRel
    officialProjectRelFromEnv = $Profile.officialProjectRelFromEnv
    officialProjectRelMap = Convert-ProfileMap $Profile.officialProjectRelMap
    svnTargetRootRel    = $Profile.svnTargetRootRel
    svnDefaultTargetRel = $Profile.svnDefaultTargetRel
    svnDefaultTargetRelFromEnv = $Profile.svnDefaultTargetRelFromEnv
    svnDefaultTargetRelMap = Convert-ProfileMap $Profile.svnDefaultTargetRelMap
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

    Write-SelectedProfileSummary -Profile $selectedProfile -ResolvedProjectRoot $ProjectRoot

  }

  if ($ProjectRoot) {
    $ProjectRoot = (Resolve-Path $ProjectRoot -ErrorAction Stop).Path
  } else {
    $ProjectRoot = (Get-Location).Path
  }

  $envDefault = if ($Env) { $Env } elseif ($lastForProfile -and -not [string]::IsNullOrWhiteSpace($lastForProfile.Env)) { $lastForProfile.Env } else { 'dev' }
  $envOptions = @()
  $defaultBuildScriptKeys = @()
  $svnRootKeys = @()
  if ($selectedProfile) {
    $defaultBuildScriptKeys = Get-MapKeysInOrder -Map $selectedProfile.defaultBuildScripts
    $svnRootKeys = Get-MapKeysInOrder -Map $selectedProfile.svnRoots
  }
  if ($defaultBuildScriptKeys.Count -eq 0 -and $defaultBuildScripts.Count -gt 0) {
    $defaultBuildScriptKeys = @($defaultBuildScripts.Keys)
  }
  if ($svnRootKeys.Count -eq 0 -and $svnRoots.Count -gt 0) {
    $svnRootKeys = @($svnRoots.Keys)
  }

  if ($defaultBuildScriptKeys.Count -gt 0) {
    $envOptions += $defaultBuildScriptKeys
  }
  if ($svnRootKeys.Count -gt 0) {
    foreach ($key in $svnRootKeys) {
      if ($envOptions -notcontains $key) {
        $envOptions += $key
      }
    }
  }
  if ($envOptions.Count -gt 0) {
    $Env = Select-Env -Options $envOptions -SelectedName $envDefault -AutoSelect:([bool]$Env)
  } else {
    $Env = Prompt-WithDefault $Env 'Env' $envDefault
  }

  $isOfficialPro = $Env -ieq 'official'
  $envOverrideFileName = if ($isOfficialPro) { '.env.officialPro' } else { $null }
  if (-not $isOfficialPro) {
    $targetRootDefault = if ($TargetRootRel) { $TargetRootRel } elseif ($lastForProfile -and -not [string]::IsNullOrWhiteSpace($lastForProfile.TargetRootRel)) { $lastForProfile.TargetRootRel } elseif ($selectedProfile -and $selectedProfile.svnTargetRootRel) { $selectedProfile.svnTargetRootRel } else { '' }
    $TargetRootRel = Prompt-WithDefault $TargetRootRel 'TargetRootRel (e.g. weekly || normal)' $targetRootDefault
  } else {
    $officialDistRootDefault = if ($OfficialDistRoot) { $OfficialDistRoot } elseif ($lastForProfile -and -not [string]::IsNullOrWhiteSpace($lastForProfile.OfficialDistRoot)) { $lastForProfile.OfficialDistRoot } elseif ($selectedProfile -and $selectedProfile.officialDistRoot) { $selectedProfile.officialDistRoot } else { '' }
    if ([string]::IsNullOrWhiteSpace($officialDistRootDefault) -and $lastForProfile -and -not [string]::IsNullOrWhiteSpace($lastForProfile.OfficialProDistRoot)) {
      $officialDistRootDefault = $lastForProfile.OfficialProDistRoot
    }
    $OfficialDistRoot = Prompt-WithDefault $OfficialDistRoot 'OfficialDistRoot (e.g. D:\\officialDist)' $officialDistRootDefault

    $officialProjectRelFromEnvKey = if ($selectedProfile -and $selectedProfile.officialProjectRelFromEnv) { [string]$selectedProfile.officialProjectRelFromEnv } else { $null }
    $officialProjectRelMap = $null
    if ($selectedProfile -and $selectedProfile.officialProjectRelMap) {
      $officialProjectRelMap = Convert-ProfileMap $selectedProfile.officialProjectRelMap
    }
    $hasOfficialProjectRelFromEnv = -not [string]::IsNullOrWhiteSpace($officialProjectRelFromEnvKey)
    $hasOfficialProjectRelMap = $selectedProfile -and ($selectedProfile.officialProjectRelMap -ne $null)
    if ($hasOfficialProjectRelFromEnv -and -not $hasOfficialProjectRelMap) {
      throw "Profile 配置 officialProjectRelFromEnv 但缺少 officialProjectRelMap: $($selectedProfile.name)"
    }
    if (-not $hasOfficialProjectRelFromEnv -and $hasOfficialProjectRelMap) {
      throw "Profile 配置 officialProjectRelMap 但缺少 officialProjectRelFromEnv: $($selectedProfile.name)"
    }
    $useMappedOfficialProjectRel = $hasOfficialProjectRelFromEnv -and $officialProjectRelMap -and ($officialProjectRelMap.Count -gt 0)

    if ($OfficialProjectRel -and $useMappedOfficialProjectRel) {
      $profileName = if ($selectedProfile -and $selectedProfile.name) { $selectedProfile.name } else { $Profile }
      if (-not $profileName) {
        $profileName = 'unknown'
      }
      throw "配置 $profileName 已启用环境映射，不允许手动传入 OfficialProjectRel。"
    }

    if (-not $OfficialProjectRel -and $useMappedOfficialProjectRel) {
      $profileName = if ($selectedProfile -and $selectedProfile.name) { $selectedProfile.name } else { $Profile }
      if (-not $profileName) {
        $profileName = 'unknown'
      }
      $envValue = Get-EnvValueForRun -ProjectRoot $ProjectRoot -EnvValue $Env -Key $officialProjectRelFromEnvKey -OverrideEnvFileName $envOverrideFileName
      if ([string]::IsNullOrWhiteSpace($envValue)) {
        throw "配置 $profileName 未在 .env / $envOverrideFileName 中找到 $officialProjectRelFromEnvKey，请确认配置。"
      }
      if (-not $officialProjectRelMap.Contains($envValue)) {
        throw "配置 $profileName 的 $officialProjectRelFromEnvKey=$envValue 未匹配到配置映射，请检查 officialProjectRelMap。"
      }

      $OfficialProjectRel = $officialProjectRelMap[$envValue]
      Write-Host ("环境映射: env {0}={1} -> official {2}" -f $officialProjectRelFromEnvKey, $envValue, $OfficialProjectRel)
      Write-Host ("OfficialProjectRel: {0}" -f $OfficialProjectRel)
    } else {
      $officialProjectDefault = if ($OfficialProjectRel) { $OfficialProjectRel } elseif ($lastForProfile -and -not [string]::IsNullOrWhiteSpace($lastForProfile.OfficialProjectRel)) { $lastForProfile.OfficialProjectRel } elseif ($selectedProfile -and $selectedProfile.officialProjectRel) { $selectedProfile.officialProjectRel } else { '' }
      if ([string]::IsNullOrWhiteSpace($officialProjectDefault) -and $lastForProfile -and -not [string]::IsNullOrWhiteSpace($lastForProfile.OfficialProProjectRel)) {
        $officialProjectDefault = $lastForProfile.OfficialProProjectRel
      }
      $OfficialProjectRel = Prompt-WithDefault $OfficialProjectRel 'OfficialProjectRel (e.g. activity1)' $officialProjectDefault
    }
  }

  if (-not $isOfficialPro) {
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
      $envValue = Get-EnvValueForRun -ProjectRoot $ProjectRoot -EnvValue $Env -Key $targetRelFromEnvKey -OverrideEnvFileName $envOverrideFileName
      if ([string]::IsNullOrWhiteSpace($envValue)) {
        throw "配置 $profileName 未在 .env 或 .env.$Env 中找到 $targetRelFromEnvKey，请确认配置。"
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
  if (-not $isOfficialPro) {
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
  } else {
    if (-not $NoBuild -and -not $envInBuildScripts) {
      throw "环境未配置在 defaultBuildScripts: $Env"
    }
    if ([string]::IsNullOrWhiteSpace($OfficialDistRoot)) {
      throw '必须指定 OfficialDistRoot。'
    }
    if (-not [System.IO.Path]::IsPathRooted($OfficialDistRoot)) {
      throw "OfficialDistRoot 必须为绝对路径: $OfficialDistRoot"
    }
    if ([string]::IsNullOrWhiteSpace($OfficialProjectRel)) {
      throw '必须指定 OfficialProjectRel。'
    }
    if (-not (Test-RelativePath $OfficialProjectRel)) {
      throw "OfficialProjectRel 必须为相对路径且不能包含 ..: $OfficialProjectRel"
    }
  }

  $messageWasBound = $PSBoundParameters.ContainsKey('Message')
  $gitMessageForPrompt = Get-GitCommitMessage -ProjectRoot $ProjectRoot
  $messagePrompt = if ($gitMessageForPrompt) { '提交信息 (来自 Git)' } else { '提交信息' }
  if (-not $NoCommit -and -not $isOfficialPro) {
    $Message = Prompt-Required $Message $messagePrompt $gitMessageForPrompt '提交信息不能为空，请重新输入。'
  }
  if ($isOfficialPro) {
    if ($messageWasBound) {
      if (-not [string]::IsNullOrWhiteSpace($Message) -and -not (Test-FileNameSegmentValid -Value $Message)) {
        throw '提交信息包含非法字符，请重新输入。'
      }
    } else {
      $officialHint = if ($gitMessageForPrompt) { '(来自 Git，留空不拼接)' } else { '(留空不拼接)' }
      $officialSuggestion = $null
      if (-not [string]::IsNullOrWhiteSpace($gitMessageForPrompt)) {
        if (Test-FileNameSegmentValid -Value $gitMessageForPrompt) {
          $officialSuggestion = $gitMessageForPrompt
        } else {
          Write-Host '提示: Git 提交信息包含换行或文件名非法字符，不能直接作为默认值（official 会把提交信息拼进目录名）。'
          Write-Host ("Git 提交信息原文（可复制后自行修改）：{0}" -f $gitMessageForPrompt)
        }
      }
      $Message = Prompt-OptionalFileNameSegment $Message '提交信息' $officialSuggestion $officialHint
    }
  }
  if ($isOfficialPro) {
    $envPath = Join-Path $ProjectRoot '.env'
    $envOfficialPath = Join-Path $ProjectRoot '.env.officialPro'
    $mergedEnvLines = @()
    $envLines = Get-EnvFileLines -FilePath $envPath
    if ($envLines.Count -gt 0) {
      $mergedEnvLines += $envLines
    } else {
      Write-Host "警告: 未找到或内容为空: $envPath"
    }
    $officialLines = Get-EnvFileLines -FilePath $envOfficialPath
    if ($officialLines.Count -gt 0) {
      $mergedEnvLines += $officialLines
    } else {
      Write-Host "警告: 未找到或内容为空: $envOfficialPath"
    }

    Write-Host ''
    Write-Host '--- 环境变量确认 ---'
    Write-Host ''
    if ($mergedEnvLines.Count -gt 0) {
      foreach ($line in $mergedEnvLines) {
        Write-Host $line
      }
    } else {
      Write-Host '（无内容可显示）'
    }
    Write-Host ''
    [void](Read-HostSafe '请确认后按回车开始构建')
  }

  $buildEndTime = $null
  if (-not $NoBuild -and $BuildScript) {
    Write-Host ''
    Write-Host '--- 构建 ---'
    Write-Host ''
    Write-Host "执行构建: $BuildScript"
    Push-Location $ProjectRoot
    try {
      $buildCommand = $BuildScript
      cmd /s /c ('"' + $buildCommand + '"')
      if ($LASTEXITCODE -ne 0) {
        throw "构建失败，退出码: $LASTEXITCODE"
      }
      $buildEndTime = Get-Date
    } finally {
      Pop-Location
    }
  }
  if (-not $buildEndTime) {
    $buildEndTime = Get-Date
  }

  $distResolved = Resolve-Path (Join-Path $ProjectRoot 'dist') -ErrorAction Stop
  $distPath = $distResolved.Path
  $distFiles = Get-ChildItem $distPath -File
  $distDirs = Get-ChildItem $distPath -Directory

  $iconSubDir = Get-EnvValueForRun -ProjectRoot $ProjectRoot -EnvValue $Env -Key 'VUE_APP_ICON_PATH' -OverrideEnvFileName $envOverrideFileName

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

  $commitSkipped = $false
  $compressStatus = $null
  $compressDetail = $null
  $compressZipPath = $null
  $compressBeforeBytes = $null
  $compressAfterBytes = $null
  if ($isOfficialPro) {
    Write-Host ''
    Write-Host '--- Official 构建转移 ---'
    Write-Host ''

    $activityData = Get-EnvValueForRun -ProjectRoot $ProjectRoot -EnvValue $Env -Key 'VUE_APP_THINKING_ACTIVITY_DATA' -OverrideEnvFileName $envOverrideFileName
    $activityName = Get-EnvValueForRun -ProjectRoot $ProjectRoot -EnvValue $Env -Key 'VUE_APP_THINKING_ACTIVITY_NAME' -OverrideEnvFileName $envOverrideFileName
    if ([string]::IsNullOrWhiteSpace($activityData) -and [string]::IsNullOrWhiteSpace($activityName)) {
      $activityData = (Get-Date).ToString('yyyyMMdd')
      $activityName = 'dist'
    }

    $gitSegment = $Message
    if (-not [string]::IsNullOrWhiteSpace($gitSegment) -and -not (Test-FileNameSegmentValid -Value $gitSegment)) {
      throw '提交信息包含非法字符，请重新输入。'
    }

    $timestampText = Format-Timestamp -Value $buildEndTime -Pattern 'yyyy-MM-dd HH-mm-ss'
    $nameParts = @($activityData, $activityName)
    if (-not [string]::IsNullOrWhiteSpace($gitSegment)) {
      $nameParts += $gitSegment
    }
    $nameParts += $timestampText
    $resultFolderName = ($nameParts -join '_')
    $invalidChars = [System.IO.Path]::GetInvalidFileNameChars()
    if ($resultFolderName.IndexOfAny($invalidChars) -ge 0) {
      throw "目录名包含非法字符，请检查 VUE_APP_THINKING_ACTIVITY_DATA 或 VUE_APP_THINKING_ACTIVITY_NAME: $resultFolderName"
    }

    if (-not (Test-Path $OfficialDistRoot)) {
      New-Item -ItemType Directory -Path $OfficialDistRoot -Force | Out-Null
    }
    $officialProjectRoot = Join-Path $OfficialDistRoot $OfficialProjectRel
    if (-not (Test-Path $officialProjectRoot)) {
      New-Item -ItemType Directory -Path $officialProjectRoot -Force | Out-Null
    }

    $TargetPath = Join-Path $officialProjectRoot $resultFolderName
    if (Test-Path $TargetPath) {
      throw "目标目录已存在: $TargetPath"
    }
    New-Item -ItemType Directory -Path $TargetPath -Force | Out-Null

    if (Test-Path $SourcePath -PathType Leaf) {
      Copy-Item -LiteralPath $SourcePath -Destination $TargetPath -Force
    } else {
      Copy-Item -Path (Join-Path $SourcePath '*') -Destination $TargetPath -Recurse -Force
    }

    Write-Host "已复制到: $TargetPath"

    $targetFolderName = Split-Path -Leaf $TargetPath
    $zipTempPath = "$TargetPath.zip"
    $zipFinalPath = Join-Path $TargetPath ("{0}.zip" -f $targetFolderName)
    try {
      $compressZipPath = $zipFinalPath
      $compressBeforeBytes = Get-FolderByteSize -FolderPath $TargetPath
      $zipResult = Compress-FolderWithBandizipZip -FolderPath $TargetPath -ZipPath $zipTempPath
      if ($zipResult -and $zipResult.Skipped) {
        Write-Host ("压缩: 已跳过（{0}）" -f $zipResult.Reason)
        $compressStatus = '已跳过'
        $compressDetail = if ($compressBeforeBytes -ne $null) { ("前: {0}" -f (Format-ByteSize -Bytes $compressBeforeBytes)) } else { $null }
      } else {
        $zipMoved = $false
        $tempZipPath = $zipResult.ZipPath
        $compressZipPath = $tempZipPath
        if (-not [string]::IsNullOrWhiteSpace($tempZipPath) -and (Test-Path -LiteralPath $tempZipPath -PathType Leaf)) {
          try {
            Move-Item -LiteralPath $tempZipPath -Destination $zipFinalPath -Force
            $zipMoved = $true
            $compressZipPath = $zipFinalPath
          } catch {
            $zipMoved = $false
            Write-Warning "压缩包移动失败，已保留在原位置: $tempZipPath。错误: $($_.Exception.Message)"
          }
        }

        $compressAfterBytes = (Get-Item -LiteralPath $compressZipPath -ErrorAction SilentlyContinue).Length
        Write-Host ("已压缩: {0}" -f $compressZipPath)
        $compressStatus = '成功'
        $beforeText = if ($compressBeforeBytes -ne $null) { Format-ByteSize -Bytes $compressBeforeBytes } else { $null }
        $afterText = if ($compressAfterBytes -ne $null) { Format-ByteSize -Bytes $compressAfterBytes } else { $null }
        if ($beforeText -and $afterText) {
          $compressDetail = "前: $beforeText -> 后: $afterText"
        } elseif ($afterText) {
          $compressDetail = "后: $afterText"
        } elseif ($beforeText) {
          $compressDetail = "前: $beforeText"
        } else {
          $compressDetail = $null
        }
        if (-not [string]::IsNullOrWhiteSpace($compressZipPath)) {
          if ([string]::IsNullOrWhiteSpace($compressDetail)) {
            $compressDetail = $compressZipPath
          } else {
            $compressDetail = "$compressDetail | $compressZipPath"
          }
        }
      }
    } catch {
      $reason = $_.Exception.Message
      if ([string]::IsNullOrWhiteSpace($reason)) {
        $reason = ($_ | Out-String).Trim()
      }
      Write-Warning "压缩失败，已跳过: $reason"
      $compressStatus = '失败(已跳过)'
      $beforeText = if ($compressBeforeBytes -ne $null) { Format-ByteSize -Bytes $compressBeforeBytes } else { $null }
      if ($beforeText) {
        $compressDetail = "前: $beforeText | 错误: $(Truncate-Text -Text $reason -MaxLength 120)"
      } else {
        $compressDetail = "错误: $(Truncate-Text -Text $reason -MaxLength 120)"
      }
    }

    $commitSkipped = $true
  } else {
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
      Write-Host ''
      Write-Host '--- SVN 更新 ---'
      Write-Host ''
      Push-Location $TargetPath
      try {
        Invoke-Svn -SvnArgs @('update') -ErrorMessage "svn update 失败: $TargetPath"
      } finally {
        Pop-Location
      }
    } else {
      $isNewTarget = $true
      Write-Host ''
      Write-Host '--- SVN 更新 ---'
      Write-Host ''
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


    Write-Host ''
    Write-Host '--- 同步 ---'
    Write-Host ''
    Write-Host "源路径: $SourcePath"
    Write-Host "目标路径: $TargetPath"
    Write-Host '同步策略: hash 文件仅按文件名同步; 非 hash 文件强制覆盖'

    $sourceRoot = (Resolve-Path $SourcePath -ErrorAction Stop).Path.TrimEnd('\')
    $targetRoot = (Resolve-Path $TargetPath -ErrorAction Stop).Path.TrimEnd('\')
    $hashPattern = '\.[0-9a-f]{8,}\.'
    $sourceRelSet = New-Object 'System.Collections.Generic.HashSet[string]' ([StringComparer]::OrdinalIgnoreCase)
    $createdDirs = New-Object 'System.Collections.Generic.HashSet[string]' ([StringComparer]::OrdinalIgnoreCase)
    $syncDetails = New-Object 'System.Collections.Generic.List[string]'
    $addedCount = 0
    $overwriteCount = 0
    $skipCount = 0
    $deleteCount = 0
    $copiedBytes = [int64]0
    $deletedBytes = [int64]0

    $sourceFiles = Get-ChildItem -Path $sourceRoot -Recurse -File
    foreach ($file in $sourceFiles) {
      $relPath = $file.FullName.Substring($sourceRoot.Length + 1)
      [void]$sourceRelSet.Add($relPath)

      $targetFile = Join-Path $targetRoot $relPath
      $isHashFile = $file.Name -match $hashPattern
      $shouldCopy = -not $isHashFile -or -not (Test-Path $targetFile)
      if ($shouldCopy) {
        $targetDir = Split-Path $targetFile -Parent
        if (-not (Test-Path $targetDir)) {
          New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
          if (-not $createdDirs.Contains($targetDir)) {
            [void]$createdDirs.Add($targetDir)
            $relDir = $targetDir.Substring($targetRoot.Length + 1)
            $syncDetails.Add(("新目录 {0}" -f $relDir))
          }
        }
        Copy-Item -LiteralPath $file.FullName -Destination $targetFile -Force
        if (Test-Path $targetFile) {
          $sizeText = Format-ByteSize $file.Length
          if ($isHashFile) {
            $addedCount++
            $syncDetails.Add(("新文件 {0,12} {1}" -f $sizeText, $relPath))
          } else {
            $overwriteCount++
            $syncDetails.Add(("覆盖   {0,12} {1}" -f $sizeText, $relPath))
          }
        }
        $copiedBytes += $file.Length
      } else {
        $skipCount++
        $sizeText = Format-ByteSize $file.Length
        $syncDetails.Add(("已存在 {0,12} {1}" -f $sizeText, $relPath))
      }
    }

    $targetFiles = Get-ChildItem -Path $targetRoot -Recurse -File -Force | Where-Object {
      $_.FullName -notmatch '\\\.svn(\\|$)'
    }
    foreach ($file in $targetFiles) {
      $relPath = $file.FullName.Substring($targetRoot.Length + 1)
      if (-not $sourceRelSet.Contains($relPath)) {
        $deleteCount++
        $deletedBytes += $file.Length
        $sizeText = Format-ByteSize $file.Length
        $syncDetails.Add(("删除   {0,12} {1}" -f $sizeText, $relPath))
        Remove-Item -LiteralPath $file.FullName -Force
      }
    }

    $targetDirs = Get-ChildItem -Path $targetRoot -Recurse -Directory -Force | Where-Object {
      $_.FullName -notmatch '\\\.svn(\\|$)'
    } | Sort-Object { $_.FullName.Length } -Descending
    foreach ($dir in $targetDirs) {
      $items = Get-ChildItem -LiteralPath $dir.FullName -Force
      if (-not $items) {
        Remove-Item -LiteralPath $dir.FullName -Force
      }
    }

    if ($syncDetails.Count -gt 0) {
      Write-Host '同步详情:'
      foreach ($line in $syncDetails) {
        Write-Host $line
      }
    } else {
      Write-Host '同步详情: 无'
    }
    Write-Host ("统计: 新增 {0} 覆盖 {1} 已存在 {2} 删除 {3} 复制 {4} 删除 {5}" -f `
      $addedCount, $overwriteCount, $skipCount, $deleteCount, (Format-ByteSize $copiedBytes), (Format-ByteSize $deletedBytes))

    $forceFiles = @('index.html', 'favicon.ico')
    foreach ($forceFile in $forceFiles) {
      $sourceFile = Join-Path $SourcePath $forceFile
      if (Test-Path $sourceFile) {
        $targetFile = Join-Path $TargetPath $forceFile
        Copy-Item -LiteralPath $sourceFile -Destination $targetFile -Force
      }
    }

    Write-Host ''
    Write-Host '--- SVN 状态 ---'
    Write-Host ''

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

      $statusLines = & svn status
      $statusText = ($statusLines | Out-String).Trim()
      if ($statusText) {
        $statusLines | Out-Host
      } else {
        Write-Host 'svn status: 无改动'
      }

      if (-not $NoCommit) {
        if (-not $statusText) {
          Write-Host '无变更，跳过提交。'
          $commitSkipped = $true
        } else {
          Write-Host ''
          Write-Host '--- SVN 提交 ---'
          Write-Host ''
          $commitStart = Get-Date
          $commitOutput = & svn commit -m $Message 2>&1
          $commitOutput | Out-Host
          $commitExitCode = $LASTEXITCODE
          if ($DebugSvn) {
            $argText = @('commit', '-m', $Message) | ForEach-Object { Format-ArgValue $_ }
            $argText = $argText -join ' '
            $workDir = (Get-Location).Path
            Write-SvnDebugLog -Command ("svn {0}" -f $argText) -WorkDir $workDir -ExitCode $commitExitCode -Output $commitOutput
          }
          if ($commitExitCode -ne 0) {
            $details = ($commitOutput | Out-String).Trim()
            if ($details) {
              throw "svn commit 失败。`n$details"
            }
            throw 'svn commit 失败。'
          }
          $commitText = ($commitOutput | Out-String).Trim()
          if ($commitText -match '(?m)^Committed revision\s+(?<rev>\d+)\b') {
            $lastRev = $Matches['rev']
          } elseif ($commitText -match '(?m)^Committed revision:\s*(?<rev>\d+)\b') {
            $lastRev = $Matches['rev']
          } elseif ($commitText -match '(?m)^提交(?:修订版|版本)?\s*(?<rev>\d+)\b') {
            $lastRev = $Matches['rev']
          } else {
            throw "svn commit 未返回新版本号，请检查提交日志。"
          }
          $commitEnd = Get-Date
          $commitDuration = Format-Duration ($commitEnd - $commitStart)
          Write-Host "svn commit 耗时: $commitDuration"
          Invoke-Svn -SvnArgs @('cleanup', $TargetPath) -ErrorMessage 'svn cleanup 失败。'
        }
      } else {
        $commitSkipped = $true
      }
    } finally {
      Pop-Location
    }
  }

  $scriptEnd = Get-Date
  $durationText = Format-Duration ($scriptEnd - $scriptStart)
  $profileForLast = if ($Profile) { $Profile } elseif ($selectedProfile) { $selectedProfile.name } else { '' }
  $targetRootRelForHistory = $TargetRootRel
  $targetRelForHistory = $TargetRel
  if ($isOfficialPro -and $lastForProfile) {
    if (-not [string]::IsNullOrWhiteSpace($lastForProfile.TargetRootRel)) {
      $targetRootRelForHistory = $lastForProfile.TargetRootRel
    }
    if (-not [string]::IsNullOrWhiteSpace($lastForProfile.TargetRel)) {
      $targetRelForHistory = $lastForProfile.TargetRel
    }
  }
  $newLast = [ordered]@{
    Env = $Env
    TargetRootRel = $targetRootRelForHistory
    TargetRel = $targetRelForHistory
    Message = $Message
    BuildScript = $BuildScript
    OfficialDistRoot = $OfficialDistRoot
    OfficialProjectRel = $OfficialProjectRel
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

  $commitStatus = if ($isOfficialPro) { '已跳过(official)' } elseif ($NoCommit) { '已跳过' } elseif ($commitSkipped) { '已跳过(无改动)' } else { '已完成' }
  Write-ResultSummary `
    -Status '成功' `
    -EnvValue $Env `
    -ProfileValue $profileForLast `
    -TargetPathValue $TargetPath `
    -SourcePathValue $SourcePath `
    -MessageValue $Message `
    -CompressStatus $compressStatus `
    -CompressDetail $compressDetail `
    -StartTime $scriptStart `
    -EndTime $scriptEnd `
    -Duration $durationText `
    -SvnRevision $lastRev `
    -CommitStatus $commitStatus

  if ($isOfficialPro -and -not [string]::IsNullOrWhiteSpace($TargetPath)) {
    try {
      $selectPath = $null
      $targetFolderName = Split-Path -Leaf $TargetPath
      $zipCandidateFinal = Join-Path $TargetPath ("{0}.zip" -f $targetFolderName)
      $zipCandidateTemp = "$TargetPath.zip"
      if (Test-Path -LiteralPath $zipCandidateFinal -PathType Leaf) {
        $selectPath = $zipCandidateFinal
      } elseif (Test-Path -LiteralPath $zipCandidateTemp -PathType Leaf) {
        $selectPath = $zipCandidateTemp
      } elseif (Test-Path -LiteralPath $TargetPath) {
        $selectPath = $TargetPath
      }
      if ($selectPath) {
        Start-Process explorer.exe -ArgumentList "/select,`"$selectPath`"" | Out-Null
      }
    } catch {
      Write-Warning "打开目录失败，已跳过: $($_.Exception.Message)"
    }
  }
  Clear-InputBuffer
} catch {
  $scriptEnd = Get-Date
  $errorMessage = $_.Exception.Message
  if ([string]::IsNullOrWhiteSpace($errorMessage)) {
    $errorMessage = ($_ | Out-String).Trim()
  }
  $durationText = Format-Duration ($scriptEnd - $scriptStart)

  $profileForLast = if ($Profile) { $Profile } elseif ($selectedProfile) { $selectedProfile.name } else { '' }
  $targetRootRelForHistory = $TargetRootRel
  $targetRelForHistory = $TargetRel
  if ($isOfficialPro -and $lastForProfile) {
    if (-not [string]::IsNullOrWhiteSpace($lastForProfile.TargetRootRel)) {
      $targetRootRelForHistory = $lastForProfile.TargetRootRel
    }
    if (-not [string]::IsNullOrWhiteSpace($lastForProfile.TargetRel)) {
      $targetRelForHistory = $lastForProfile.TargetRel
    }
  }
  $failedEntry = [ordered]@{
    Env = $Env
    TargetRootRel = $targetRootRelForHistory
    TargetRel = $targetRelForHistory
    Message = $Message
    BuildScript = $BuildScript
    OfficialDistRoot = $OfficialDistRoot
    OfficialProjectRel = $OfficialProjectRel
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

  $commitStatus = if ($isOfficialPro) { '已跳过(official)' } elseif ($NoCommit) { '已跳过' } else { '未完成' }
  Write-ResultSummary `
    -Status '失败' `
    -EnvValue $Env `
    -ProfileValue $profileForLast `
    -TargetPathValue $TargetPath `
    -SourcePathValue $SourcePath `
    -MessageValue $Message `
    -CompressStatus $compressStatus `
    -CompressDetail $compressDetail `
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
