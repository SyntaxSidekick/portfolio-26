$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$target = Join-Path $root "scripts\start-dev.cmd"
$desktop = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktop "Start Portfolio Dev Stack.lnk"

if (-not (Test-Path -LiteralPath $target)) {
    throw "Launcher target not found: $target"
}

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $target
$shortcut.WorkingDirectory = $root
$shortcut.IconLocation = "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe,0"
$shortcut.Description = "Start the Portfolio dev stack tray app."
$shortcut.Save()

Write-Host "Created desktop shortcut: $shortcutPath" -ForegroundColor Green
