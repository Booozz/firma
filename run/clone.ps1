Write-Host '### TASK ### CLONE ###'

# DIAGNOSTICS
$Timer = [system.diagnostics.stopwatch]::startNew()

try {

    # IMPORT
    Import-Module '.\run\module\env.psm1'
    Import-Module '.\run\module\transfer.psm1'

    # DEPENDENCY
    $winSCPexec = 'C:\Apps\_m\apps\winscp\current\WinSCP.exe'
    $winSCPdnet = 'C:\Apps\_m\apps\winscp\current\WinSCPnet.dll'

    Add-Type -Path $winSCPdnet

    # AUTHENTICATION
    $Config = GetEnvConfig '.\'

    $usr = $Config.SESSION_USER
    $hsh = $Config.SESSION_HASH
    $key = "T:\__configs\M-1\sites\$Env:npm_package_name\auth\production"
    $pw = $hsh | ConvertTo-SecureString -Key (Get-Content $key)

    # OPTIONS
    $Options = New-Object WinSCP.TransferOptions
    $Options.TransferMode = [WinSCP.TransferMode]::Automatic

    Function SessionConnect {
        [CmdletBinding()]

        # SESSION
        $Settings = New-Object WinSCP.SessionOptions -Property @{
            Protocol = [WinSCP.Protocol]::Ftp
            FtpSecure = [WinSCP.FtpSecure]::Explicit
            HostName = $Config.SESSION_HOST
            UserName = $usr
            Password = [System.Net.NetworkCredential]::new('', $pw).Password
            TimeoutInMilliseconds = '3200'
        }

        $Settings.AddRawSettings("AddressFamily", "1")
        $Settings.AddRawSettings("FtpUseMlsd", "0")
        $Settings.AddRawSettings("MinTlsVersion", "12")
        $Settings.AddRawSettings("MaxTlsVersion", "12")
        $Settings.AddRawSettings("Utf", "2")

        $Settings.AddRawSettings("Logging\LogProtocol", "-1")
        $Settings.AddRawSettings("Logging\LogFileAppend", "0")
        $Settings.AddRawSettings("Logging\LogMaxCount", "1")

        $WinSCP = New-Object WinSCP.Session
        $WinSCP.ExecutablePath = $winSCPexec

        # LOG
        $WinSCP.SessionLogPath = $Env:Onedrive + '\_mmrhcs\_logs\_winscp\m1.winscp.' + $Env:npm_package_name + '.clone.log'
        $WinSCP.DebugLogPath = $Env:Onedrive + '\_mmrhcs\_logs\_winscp\m1.winscp.' + $Env:npm_package_name + '.clone.debug.log'
        $WinSCP.DebugLogLevel = '-1'
        $WinSCP.add_FileTransferred({LogTransferredFiles($_)})

        # CONNECT
        $WinSCP.Open($Settings)

        return $WinSCP
    }

    try {

        # QUEUE - BACKUP

        $Done = $Null

        while ($Done -eq $Null) {

            $Session = SessionConnect –ErrorAction Stop
            $ExitCode = $Null

            try {

                ActionHandler -Session $Session -Switch 'Clone' –ErrorAction Stop
            }
            catch {

                if ($Session.Opened -eq $True) {

                    Write-Host
                    Write-Host '# CONNECTION # STATUS'
                    Write-Host
                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Terminating..."

                    $Session.Close()
                    $Session.Dispose()

                    Write-Host "$(Get-Date -Format 'HH:mm:ss') $(if ($Session.Opened -ne $True) { 'Connection Status: Closed' } else { 'Connection Status: Open' })"

                    $Session = $Null
                }

                Write-Host
                Write-Host "$(Get-Date -Format 'HH:mm:ss') Retry..."

                $ExitCode = 1
            }

            if ($ExitCode -ne 1) {

                $Session.Close()
                $Session.Dispose()
                $Session = $Null
                $Done = $True
            }
        }

        try {

            # QUEUE - CONTENT

            $Done = $Null

            while ($Done -eq $Null) {

                $Session = SessionConnect –ErrorAction Stop
                $ExitCode = $Null

                try {

                    TransferHandler -Session $Session -Options $Options -Switch 'CloneContent' –ErrorAction Stop
                }
                catch {

                    if ($Session.Opened -eq $True) {

                        Write-Host
                        Write-Host '# CONNECTION # STATUS'
                        Write-Host
                        Write-Host "$(Get-Date -Format 'HH:mm:ss') Terminating..."

                        $Session.Close()
                        $Session.Dispose()

                        Write-Host "$(Get-Date -Format 'HH:mm:ss') $(if ($Session.Opened -ne $True) { 'Connection Status: Closed' } else { 'Connection Status: Open' })"

                        $Session = $Null
                    }

                    Write-Host
                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Retry..."

                    $ExitCode = 1
                }

                if ($ExitCode -ne 1) {

                    $Session.Close()
                    $Session.Dispose()
                    $Session = $Null
                    $Done = $True
                }
            }
        }
        catch {

            Write-Host
            Write-Host '# ERROR # CONTENT'
            Write-Host
            Write-Host $_.Exception.Message
            Write-Host $_.ScriptStackTrace
            Write-Host
        }

        try {

            # QUEUE - STORAGE

            $Done = $Null

            while ($Done -eq $Null) {

                $Session = SessionConnect –ErrorAction Stop
                $ExitCode = $Null

                try {

                    TransferHandler -Session $Session -Options $Options -Switch 'CloneStorage' –ErrorAction Stop
                }
                catch {

                    if ($Session.Opened -eq $True) {

                        Write-Host
                        Write-Host '# CONNECTION # STATUS'
                        Write-Host
                        Write-Host "$(Get-Date -Format 'HH:mm:ss') Terminating..."

                        $Session.Close()

                        Write-Host "$(Get-Date -Format 'HH:mm:ss') $(if ($Session.Opened -ne $True) { 'Connection Status: Closed' } else { 'Connection Status: Open' })"
                    }

                    $Session.Dispose()
                    $Session = $Null

                    Write-Host
                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Retry..."

                    $ExitCode = 1
                }

                if ($ExitCode -ne 1) {

                    $Session.Close()
                    $Session.Dispose()
                    $Session = $Null
                    $Done = $True
                }
            }
        }
        catch {

            Write-Host
            Write-Host '# ERROR # STORAGE'
            Write-Host
            Write-Host $_.Exception.Message
            Write-Host $_.ScriptStackTrace
            Write-Host
        }
    }
    catch {

        Write-Host
        Write-Host '# ERROR # BACKUP'
        Write-Host
        Write-Host $_.Exception.Message
        Write-Host $_.ScriptStackTrace
        Write-Host
    }
}
catch {

    Write-Host
    Write-Host '# ERROR # CONNECTION'
    Write-Host
    Write-Host $_.Exception.Message
    Write-Host $_.ScriptStackTrace
    Write-Host
}
finally {

    if ($Session.Opened -eq $True) {

        Write-Host
        Write-Host '# CONNECTION # STATUS'
        Write-Host
        Write-Host "$(Get-Date -Format 'HH:mm:ss') Terminating..."

        $Session.Close()
        $Session.Dispose()

        Write-Host "$(Get-Date -Format 'HH:mm:ss') $(if ($Session.Opened -ne $True) { 'Connection Status: Closed' } else { 'Connection Status: Open' })"

        $Session = $Null
    }

    $Timer.Stop()

    Write-Host
    Write-Host "### TASK ### CLONE ### END"
    Write-Host
    Write-Host "Time: $($Timer.Elapsed.TotalMinutes) Minutes"
    Write-Host
}
