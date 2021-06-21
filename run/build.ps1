Write-Host '### TASK ### BUILD ###'
Write-Host

$env:DEBUG = $False

if ($Args[0] -match 'debug') {
  $env:DEBUG = $True
}

Import-Module '.\run\module\env.psm1'
Update-Composer -Mode 'Init' -ErrorAction Stop

Write-Host 'LINT'

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

Update-Composer -Mode 'Clear'

Write-Host
Write-Host 'COMPLETE'
Write-Host
