Function TransferHandler {
    [CmdletBinding()]

    param (
        [Parameter(Mandatory)] [PSObject]$Session,
        [Parameter(Mandatory)] [PSObject]$Options,
        [Parameter(Mandatory)] [ValidateSet('Env', 'Config', 'Public', 'Site', 'Kirby', 'Vendor', 'CloneContent', 'CloneStorage')] [String]$Switch
    )

    if ($Switch -eq 'Env') {

        Write-Host "# $((Get-Culture).TextInfo.ToUpper($Switch)) # TRANSFER"
        Write-Host

        $FileMasks = '.env'

        foreach ($Mask in $FileMasks) {

            $Done = $Null

            while ($Done -eq $Null) {

                $Transfer = $Session.PutFiles("$(Get-Location)\dist\$Mask", ('/*__up'), $False, $Options)
                $Transfer.Check()

                if ($Transfer.IsSuccess) {

                    $Done = $True
                }
                else {

                    Write-Host
                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Retry..."
                }
            }
        }

        return
    }

    if ($Switch -eq 'Public') {

        Write-Host
        Write-Host "# $((Get-Culture).TextInfo.ToUpper($Switch)) # TRANSFER"
        Write-Host

        $FileMasks = 'assets', '.*', '*.php', '*.js', '*.css', '*.txt', '*.map'

        foreach ($Mask in $FileMasks) {

            $Done = $Null

            while ($Done -eq $Null) {

                $Transfer = $Session.PutFiles("$(Get-Location)\dist\$((Get-Culture).TextInfo.ToLower($Switch))\$Mask", ("/$((Get-Culture).TextInfo.ToLower($Switch))/*__up"), $False, $Options)
                $Transfer.Check()

                if ($Transfer.IsSuccess) {

                    $Done = $True
                }
                else {

                    Write-Host
                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Retry..."
                }
            }
        }

        return
    }

    if ($Switch -eq 'Config' -OR $Switch -eq 'Site' -OR $Switch -eq 'Kirby' -OR $Switch -eq 'Vendor') {

        Write-Host
        Write-Host "# $((Get-Culture).TextInfo.ToUpper($Switch)) # TRANSFER"
        Write-Host

        $Done = $Null

        while ($Done -eq $Null) {

            $Transfer = $Session.PutFiles("$(Get-Location)\dist\$((Get-Culture).TextInfo.ToLower($Switch))", ("/$((Get-Culture).TextInfo.ToLower($Switch))__up"), $False, $Options)
            $Transfer.Check()

            if ($Transfer.IsSuccess) {

                $Done = $True
            }
            else {

                Write-Host
                Write-Host "$(Get-Date -Format 'HH:mm:ss') Retry..."
            }
        }

        return
    }

    if ($Switch -eq 'CloneContent') {

        Write-Host
        Write-Host "# $((Get-Culture).TextInfo.ToUpper($Switch)) # TRANSFER"
        Write-Host

        Remove-Item ("$(Get-Location)\db\*") -Recurse

        $Transfer = $Session.GetFiles('/content/*', "$(Get-Location)\db\*")
    }

    if ($Switch -eq 'CloneStorage') {

        Write-Host
        Write-Host "# $((Get-Culture).TextInfo.ToUpper($Switch)) # TRANSFER"
        Write-Host

        Remove-Item ("$(Get-Location)\dist\storage\*") -Recurse

        $Transfer = $Session.GetFiles('/storage/*', "$(Get-Location)\dist\storage\*")
    }
}

Function ActionHandler {
    [CmdletBinding()]

    param (
        [Parameter(Mandatory)] [PSObject]$Session,
        [Parameter(Mandatory)] [ValidateSet('Env', 'Config', 'Public', 'Site', 'Kirby', 'Vendor', 'Clone')] [String]$Switch,
        [Parameter()] [ValidateSet('Unlink', 'Link', 'Cleanup')] [String]$State
    )

    if ($Switch -eq 'Env') {

        Write-Host
        Write-Host "# $((Get-Culture).TextInfo.ToUpper($Switch)) # $((Get-Culture).TextInfo.ToUpper($State))"
        Write-Host

        if ($State -eq 'Unlink') {

            $Files = $Session.EnumerateRemoteFiles('/', '*', [WinSCP.EnumerationOptions]::None)

            foreach ($File in $Files) {

                if ($File.FullName -notmatch "__up$") {

                    $Session.MoveFile($File.FullName, $File.FullName + '__del')

                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Success... $($File.FullName) => $($File.FullName)__del"
                }
            }

            return
        }

        if ($State -eq 'Link') {

            $Files = $Session.EnumerateRemoteFiles('/', '*', [WinSCP.EnumerationOptions]::None)

            foreach ($File in $Files) {

                if ($File.FullName -notmatch "__del$") {

                    $FileName = $File.FullName -replace "__up"
                    $Session.MoveFile($File.FullName, $FileName)

                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Success... $($File.FullName) => $FileName"
                }
            }

            return
        }

        if ($State -eq 'Cleanup') {

            $Done = $Null

            while ($Done -eq $Null) {

                $Removal = $Session.RemoveFiles('*.*__del')

                if ($Removal.IsSuccess) {

                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Success... /*.*__del => delete"

                    $Done = $True
                }
                else {

                    Write-Host "$(Get-Date -Format 'HH:mm:ss') $(if ($Session.Opened -ne $True) { 'Connection Status: Closed' } else { 'Connection Status: Open' })"
                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Retry..."
                }
            }

            return
        }
    }

    if ($Switch -eq 'Public') {

        Write-Host
        Write-Host "# $((Get-Culture).TextInfo.ToUpper($Switch)) # $((Get-Culture).TextInfo.ToUpper($State))"
        Write-Host

        if ($State -eq 'Unlink') {

            $Files = $Session.EnumerateRemoteFiles("/$((Get-Culture).TextInfo.ToLower($Switch))", '*', [WinSCP.EnumerationOptions]::MatchDirectories)

            foreach ($File in $Files) {

                if ($File.FullName -notmatch "__up$" -AND $File.FullName -notmatch "metrics" -AND $File.FullName -notmatch "media") {

                    $Session.MoveFile($File.FullName, $File.FullName + '__del')

                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Success... $($File.FullName) => $($File.FullName)__del"
                }
            }

            return
        }

        if ($State -eq 'Link') {

            $Files = $Session.EnumerateRemoteFiles("/$((Get-Culture).TextInfo.ToLower($Switch))", '*', [WinSCP.EnumerationOptions]::MatchDirectories)

            foreach ($File in $Files) {

                if ($File.FullName -notmatch "__del$") {

                    $FileName = $File.FullName -replace "__up"

                    $Session.MoveFile($File.FullName, $FileName)

                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Success... $($File.FullName) => $FileName"
                }
            }

            return
        }

        if ($State -eq 'Cleanup') {

            $Done = $Null

            while ($Done -eq $Null) {

                $Removal = $Session.RemoveFiles(('/' + (Get-Culture).TextInfo.ToLower($Switch) + '/*__del'))

                if ($Removal.IsSuccess) {

                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Success... /$((Get-Culture).TextInfo.ToLower($Switch))/*__del => delete"

                    $Done = $True
                }
                else {

                    Write-Host "$(Get-Date -Format 'HH:mm:ss') $(if ($Session.Opened -ne $True) { 'Connection Status: Closed' } else { 'Connection Status: Open' })"
                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Retry..."
                }
            }

            return
        }
    }

    if ($Switch -eq 'Config' -OR $Switch -eq 'Site' -OR $Switch -eq 'Kirby' -OR $Switch -eq 'Vendor') {

        Write-Host
        Write-Host "# $((Get-Culture).TextInfo.ToUpper($Switch)) # $((Get-Culture).TextInfo.ToUpper($State))"
        Write-Host

        if ($State -eq 'Unlink') {

            $Files = $Session.EnumerateRemoteFiles('/', "$((Get-Culture).TextInfo.ToLower($Switch))", [WinSCP.EnumerationOptions]::MatchDirectories)

            foreach ($File in $Files) {

                if ($File.FullName -notmatch "__up$") {

                    $Session.MoveFile($File.FullName, $File.FullName + '__del')

                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Success... $($File.FullName) => $($File.FullName)__del"
                }
            }

            return
        }

        if ($State -eq 'Link') {

            $Files = $Session.EnumerateRemoteFiles('/', "$((Get-Culture).TextInfo.ToLower($Switch))__up", [WinSCP.EnumerationOptions]::MatchDirectories)

            foreach ($File in $Files) {

                if ($File.FullName -notmatch "__del$") {

                    $FileName = $File.FullName -replace "__up"
                    $Session.MoveFile($File.FullName, $FileName)

                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Success... $($File.FullName) => $FileName"
                }
            }

            return
        }

        if ($State -eq 'Cleanup') {

            $Done = $Null

            while ($Done -eq $Null) {

                $Removal = $Session.RemoveFiles(('/' + (Get-Culture).TextInfo.ToLower($Switch) + '__del'))

                if ($Removal.IsSuccess) {

                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Success... /$((Get-Culture).TextInfo.ToLower($Switch))__del => delete"

                    $Done = $True
                }
                else {

                    Write-Host "$(Get-Date -Format 'HH:mm:ss') $(if ($Session.Opened -ne $True) { 'Connection Status: Closed' } else { 'Connection Status: Open' })"
                    Write-Host "$(Get-Date -Format 'HH:mm:ss') Retry..."
                }
            }

            return
        }
    }

    if ($Switch -eq 'Clone') {

        if (!(Test-Path "$(Get-Location)\db" -PathType Container)) {

            New-Item -Path "$(Get-Location)" -Name "db" -ItemType "Directory" | Out-Null
        }
        elseif (!(Get-ChildItem "$(Get-Location)\db" | Measure-Object).Count -eq 0) {

            Write-Host
            Write-Host "# BACKUP # CHECK"
            Write-Host

            $Timestamp = $(Get-Date -Format "yyyyMMddHHmmss")

            if (!(Test-Path "$(Get-Location)\backup" -PathType Container)) {

                New-Item -Path "$(Get-Location)" -Name "backup" -ItemType "Directory" | Out-Null

                Write-Host "$(Get-Date -Format 'HH:mm:ss') Success... /backup => create"
            }

            New-Item -Path "$(Get-Location)\backup" -Name $Timestamp -ItemType "Directory" | Out-Null

            Write-Host "$(Get-Date -Format 'HH:mm:ss') Success... /backup/$Timestamp => create"

            Write-Host
            Write-Host "# BACKUP # TRANSFER"
            Write-Host

            if (Test-Path ("$(Get-Location)\backup\" + $Timestamp) -PathType Container) {

                Copy-Item ("$(Get-Location)\db\" + '*') ("$(Get-Location)\backup\" + $Timestamp) -Recurse

                Write-Host "$(Get-Date -Format 'HH:mm:ss') Success... /backup/$Timestamp/* => copy"
            }
        }

        return
    }
}

Function LogTransferredFiles {

    param($e)

    if ($Null -eq $e.Error) {

        Write-Host "$(Get-Date -Format 'HH:mm:ss') Success... $($e.Destination)"
    }
    else {

        Write-Host
        Write-Host "# ERROR $($e.Error) # $($e.Destination)"
    }
}
