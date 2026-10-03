param(
    [Parameter(Mandatory = $true)]
    [string]$ZipPath
)

$ErrorActionPreference = "Stop"

$repoRoot = (& git rev-parse --show-toplevel 2>$null)
if (-not $repoRoot) {
    $repoRoot = (Get-Location).Path
}

$zip = (Resolve-Path $ZipPath).Path
$dest = Join-Path $repoRoot "frontend\public\media\colus\landing"
$temp = Join-Path ([System.IO.Path]::GetTempPath()) ("colus-assets-" + [guid]::NewGuid().ToString("N"))

try {
    New-Item -ItemType Directory -Force -Path $temp | Out-Null
    Expand-Archive -Path $zip -DestinationPath $temp -Force

    $src = Join-Path $temp "colus-assets-final-v03"
    if (-not (Test-Path $src -PathType Container)) {
        throw "Unexpected ZIP layout. Expected folder: colus-assets-final-v03/"
    }

    New-Item -ItemType Directory -Force -Path $dest | Out-Null

    $folders = @(
        "00-brand",
        "01-hero",
        "02-manifesto",
        "03-aprender",
        "04-futuro",
        "05-vida-colus",
        "06-pertencer",
        "07-transformar",
        "manifest"
    )

    foreach ($folder in $folders) {
        $from = Join-Path $src $folder
        if (Test-Path $from -PathType Container) {
            $to = Join-Path $dest $folder
            New-Item -ItemType Directory -Force -Path $to | Out-Null
            Copy-Item -Path (Join-Path $from "*") -Destination $to -Recurse -Force
        }
    }

    Write-Host ""
    Write-Host "Installed COLUS landing assets into:" -ForegroundColor Green
    Write-Host "  $dest"
    Write-Host ""
    Write-Host "Verify:"
    Write-Host "  git status --short frontend/public/media/colus/landing"
    Write-Host ""
    Write-Host "Then commit:"
    Write-Host "  git add frontend/public/media/colus/landing"
    Write-Host "  git commit -m \"assets: add curated COLUS landing media V0.3\""
    Write-Host "  git push origin main"
}
finally {
    if (Test-Path $temp) {
        Remove-Item -Path $temp -Recurse -Force
    }
}
