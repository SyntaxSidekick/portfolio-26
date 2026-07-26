$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$mongoServiceName = "MongoDB"

function Start-DevWindow {
    param(
        [Parameter(Mandatory = $true)]
        [string] $Title,

        [Parameter(Mandatory = $true)]
        [string] $Command
    )

    $windowCommand = @"
`$Host.UI.RawUI.WindowTitle = '$Title'
Set-Location -LiteralPath '$root'
$Command
"@

    Start-Process powershell.exe -ArgumentList @(
        "-NoExit",
        "-ExecutionPolicy",
        "Bypass",
        "-Command",
        $windowCommand
    )
}

Write-Host "Starting Portfolio 2026 dev stack..." -ForegroundColor Cyan

$mongoService = Get-Service -Name $mongoServiceName -ErrorAction SilentlyContinue
if ($mongoService) {
    if ($mongoService.Status -ne "Running") {
        Write-Host "Starting MongoDB service..." -ForegroundColor Yellow
        Start-Service -Name $mongoServiceName
        $mongoService.WaitForStatus("Running", "00:00:20")
    } else {
        Write-Host "MongoDB service is already running." -ForegroundColor Green
    }
} else {
    Write-Warning "MongoDB service '$mongoServiceName' was not found. Install MongoDB as a service or start it manually before using the API."
}

if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    throw "pnpm was not found on PATH. Install pnpm or enable it with Corepack, then run this launcher again."
}

Start-DevWindow -Title "Portfolio API - http://localhost:4000" -Command "pnpm --filter @portfolio/api dev"
Start-Sleep -Seconds 2
Start-DevWindow -Title "Portfolio Admin - http://localhost:5173" -Command "pnpm --filter @portfolio/admin dev"
Start-Sleep -Seconds 1
Start-DevWindow -Title "Portfolio Web - http://localhost:3000" -Command "pnpm --filter @portfolio/web dev"

Write-Host ""
Write-Host "Dev stack launch requested:" -ForegroundColor Green
Write-Host "  API:   http://localhost:4000"
Write-Host "  Admin: http://localhost:5173"
Write-Host "  Web:   http://localhost:3000"
Write-Host ""
Write-Host "Close each opened PowerShell window to stop that dev server."
