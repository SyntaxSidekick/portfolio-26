$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$logRoot = Join-Path $root "storage\logs\dev-tray"
$mongoServiceName = "MongoDB"

if (-not (Test-Path -LiteralPath $logRoot)) {
    New-Item -ItemType Directory -Path $logRoot -Force | Out-Null
}

function Get-TimeStamp {
    Get-Date -Format "yyyyMMdd-HHmmss"
}

function Test-Port {
    param([Parameter(Mandatory = $true)][int] $Port)

    try {
        $client = New-Object System.Net.Sockets.TcpClient
        $async = $client.BeginConnect("127.0.0.1", $Port, $null, $null)
        $connected = $async.AsyncWaitHandle.WaitOne(200, $false)
        if ($connected) {
            $client.EndConnect($async)
        }
        $client.Close()
        return $connected
    } catch {
        return $false
    }
}

function New-DevProcess {
    param(
        [Parameter(Mandatory = $true)][string] $Name,
        [Parameter(Mandatory = $true)][string] $Command,
        [Parameter(Mandatory = $true)][string] $LogPrefix
    )

    $stamp = Get-TimeStamp
    $stdout = Join-Path $logRoot "$LogPrefix-$stamp.out.log"
    $stderr = Join-Path $logRoot "$LogPrefix-$stamp.err.log"

    $startInfo = New-Object System.Diagnostics.ProcessStartInfo
    $startInfo.FileName = "cmd.exe"
    $startInfo.Arguments = "/d /s /c `"$Command`""
    $startInfo.WorkingDirectory = $root
    $startInfo.UseShellExecute = $false
    $startInfo.CreateNoWindow = $true
    $startInfo.RedirectStandardOutput = $true
    $startInfo.RedirectStandardError = $true

    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = $startInfo
    $process.EnableRaisingEvents = $true

    $outputWriter = [System.IO.StreamWriter]::new($stdout, $true)
    $errorWriter = [System.IO.StreamWriter]::new($stderr, $true)

    $process.add_OutputDataReceived({
        param($sender, $eventArgs)
        if ($null -ne $eventArgs.Data) {
            $outputWriter.WriteLine($eventArgs.Data)
            $outputWriter.Flush()
        }
    })

    $process.add_ErrorDataReceived({
        param($sender, $eventArgs)
        if ($null -ne $eventArgs.Data) {
            $errorWriter.WriteLine($eventArgs.Data)
            $errorWriter.Flush()
        }
    })

    if (-not $process.Start()) {
        throw "Failed to start $Name."
    }

    $process.BeginOutputReadLine()
    $process.BeginErrorReadLine()

    return [pscustomobject]@{
        Name = $Name
        Process = $process
        OutputLog = $stdout
        ErrorLog = $stderr
        OutputWriter = $outputWriter
        ErrorWriter = $errorWriter
    }
}

function Stop-DevProcess {
    param([Parameter(Mandatory = $true)] $Entry)

    if ($null -eq $Entry -or $null -eq $Entry.Process) {
        return
    }

    try {
        if (-not $Entry.Process.HasExited) {
            $Entry.Process.Kill($true)
            $Entry.Process.WaitForExit(5000) | Out-Null
        }
    } catch {
        # Ignore shutdown races. The status timer will refresh the UI.
    } finally {
        foreach ($writerName in @("OutputWriter", "ErrorWriter")) {
            try {
                if ($Entry.$writerName) {
                    $Entry.$writerName.Dispose()
                }
            } catch {
            }
        }
    }
}

$apps = [ordered]@{
    api = [pscustomobject]@{
        Label = "API"
        Command = "pnpm --filter @portfolio/api dev"
        Url = "http://localhost:4000"
        Port = 4000
        LogPrefix = "api"
    }
    admin = [pscustomobject]@{
        Label = "Admin"
        Command = "pnpm --filter @portfolio/admin dev"
        Url = "http://localhost:5173"
        Port = 5173
        LogPrefix = "admin"
    }
    web = [pscustomobject]@{
        Label = "Web"
        Command = "pnpm --filter @portfolio/web dev"
        Url = "http://localhost:3000"
        Port = 3000
        LogPrefix = "web"
    }
}

$state = @{
    Processes = @{}
    LastError = $null
}

function Start-MongoService {
    $mongoService = Get-Service -Name $mongoServiceName -ErrorAction SilentlyContinue
    if (-not $mongoService) {
        $state.LastError = "MongoDB service '$mongoServiceName' was not found."
        return
    }

    if ($mongoService.Status -eq "Running") {
        return
    }

    try {
        Start-Service -Name $mongoServiceName
        $mongoService.WaitForStatus("Running", "00:00:20")
    } catch {
        $state.LastError = "Could not start MongoDB service. Start it manually or run this launcher as admin."
    }
}

function Start-DevStack {
    if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
        [System.Windows.Forms.MessageBox]::Show(
            "pnpm was not found on PATH. Enable Corepack or install pnpm, then try again.",
            "Portfolio Dev Stack",
            [System.Windows.Forms.MessageBoxButtons]::OK,
            [System.Windows.Forms.MessageBoxIcon]::Error
        ) | Out-Null
        return
    }

    Start-MongoService

    foreach ($key in $apps.Keys) {
        $existing = $state.Processes[$key]
        if ($existing -and -not $existing.Process.HasExited) {
            continue
        }

        try {
            $state.Processes[$key] = New-DevProcess `
                -Name $apps[$key].Label `
                -Command $apps[$key].Command `
                -LogPrefix $apps[$key].LogPrefix
        } catch {
            $state.LastError = "Failed to start $($apps[$key].Label): $($_.Exception.Message)"
        }

        Start-Sleep -Milliseconds 750
    }
}

function Stop-DevStack {
    foreach ($entry in @($state.Processes.Values)) {
        Stop-DevProcess -Entry $entry
    }
    $state.Processes.Clear()
}

function Restart-DevStack {
    Stop-DevStack
    Start-Sleep -Milliseconds 500
    Start-DevStack
}

function Open-Url {
    param([Parameter(Mandatory = $true)][string] $Url)
    Start-Process $Url
}

function Open-LogFolder {
    Start-Process explorer.exe -ArgumentList "`"$logRoot`""
}

$contextMenu = New-Object System.Windows.Forms.ContextMenuStrip
$statusItem = $contextMenu.Items.Add("Portfolio Dev Stack")
$statusItem.Enabled = $false
$contextMenu.Items.Add("-") | Out-Null

$startItem = $contextMenu.Items.Add("Start All")
$restartItem = $contextMenu.Items.Add("Restart All")
$stopItem = $contextMenu.Items.Add("Stop All")
$contextMenu.Items.Add("-") | Out-Null

$openWebItem = $contextMenu.Items.Add("Open Web")
$openAdminItem = $contextMenu.Items.Add("Open Admin")
$openApiItem = $contextMenu.Items.Add("Open API")
$contextMenu.Items.Add("-") | Out-Null

$logsItem = $contextMenu.Items.Add("Show Logs")
$errorItem = $contextMenu.Items.Add("Last Error")
$contextMenu.Items.Add("-") | Out-Null

$exitItem = $contextMenu.Items.Add("Exit")

$notifyIcon = New-Object System.Windows.Forms.NotifyIcon
$notifyIcon.Icon = [System.Drawing.SystemIcons]::Application
$notifyIcon.Text = "Portfolio Dev Stack"
$notifyIcon.ContextMenuStrip = $contextMenu
$notifyIcon.Visible = $true

$startItem.add_Click({ Start-DevStack })
$restartItem.add_Click({ Restart-DevStack })
$stopItem.add_Click({ Stop-DevStack })
$openWebItem.add_Click({ Open-Url $apps.web.Url })
$openAdminItem.add_Click({ Open-Url $apps.admin.Url })
$openApiItem.add_Click({ Open-Url $apps.api.Url })
$logsItem.add_Click({ Open-LogFolder })
$errorItem.add_Click({
    $message = if ($state.LastError) { $state.LastError } else { "No errors recorded." }
    [System.Windows.Forms.MessageBox]::Show(
        $message,
        "Portfolio Dev Stack",
        [System.Windows.Forms.MessageBoxButtons]::OK,
        [System.Windows.Forms.MessageBoxIcon]::Information
    ) | Out-Null
})

$exitItem.add_Click({
    Stop-DevStack
    $notifyIcon.Visible = $false
    $notifyIcon.Dispose()
    [System.Windows.Forms.Application]::Exit()
})

$timer = New-Object System.Windows.Forms.Timer
$timer.Interval = 1500
$timer.add_Tick({
    $parts = New-Object System.Collections.Generic.List[string]
    foreach ($key in $apps.Keys) {
        $entry = $state.Processes[$key]
        $processRunning = $entry -and -not $entry.Process.HasExited
        $portOpen = Test-Port -Port $apps[$key].Port
        $status = if ($processRunning -or $portOpen) { "on" } else { "off" }
        $parts.Add("$($apps[$key].Label): $status")
    }

    $notifyIcon.Text = ($parts -join " | ")
    $statusItem.Text = $notifyIcon.Text
    $errorItem.Enabled = [bool]$state.LastError
})
$timer.Start()

Start-DevStack

[System.Windows.Forms.Application]::Run()
