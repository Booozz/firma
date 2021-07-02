Write-Host '### TASK ### RUN ###'
Write-Host

$env:DEBUG = $False

if ($Args[0] -match 'debug') {
  $env:DEBUG = $True
}

Write-Host 'COMPOSER'
Write-Host

if ((Test-Path '.\dist\composer.json') -and (Test-Path '.\dist\composer.lock')) {

    Write-Host 'Removing..'

    Remove-Item '.\dist\composer.*'

    Write-Host 'Updating..'
    Write-Host

    Copy-Item '.\composer.*' -Destination '.\dist'
}
Else {
    Write-Host 'Updating..'
    Write-Host

    Copy-Item '.\composer.*' -Destination '.\dist'
}

composer update -d '.\dist' --root-reqs

Write-Host
Write-Host 'RUN'
Write-Host

if ($env:DEBUG -eq $True) {
  gulp --verbose
}
Else {
  gulp
}
