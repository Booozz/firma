Write-Host '### TASK ### BUILD ###'
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
Write-Host 'LINT'
Write-Host

.\dist\vendor\bin\phpcs --standard='.\phpcs.ruleset.xml' --report=summary '.\app' -v
npx stylelint './app/snippets/**/*.scss' './app/resources/**/*.scss'
npx eslint './app/resources/main.js' './app/resources/panel.js' './app/snippets/**/script.js'

Write-Host 'BUILD'
Write-Host

if ($env:DEBUG -eq $True) {
  gulp --verbose
}
Else {
  gulp
}

Write-Host
Write-Host 'COMPOSER'
Write-Host

composer install -d '.\dist' --no-dev

Write-Host
Write-Host 'COMPLETE'
Write-Host
