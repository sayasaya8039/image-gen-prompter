# Create ZIP package for Chrome Web Store
$srcDir = "D:\extensions\ImageGenPrompter"
$distDir = "$srcDir\dist"
$tempDir = "$distDir\temp_pkg"
$zipPath = "$distDir\ImageGenPrompter_v4.0.6.zip"

# Create directories
New-Item -ItemType Directory -Force -Path $distDir | Out-Null
if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir }
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null
if (Test-Path $zipPath) { Remove-Item $zipPath }

# Copy required files
$files = @("manifest.json", "background.js", "popup.html", "popup.js", "result.html", "result.js")
foreach ($file in $files) {
    Copy-Item "$srcDir\$file" $tempDir
    Write-Host "Copied: $file"
}

# Copy icons folder
New-Item -ItemType Directory -Force -Path "$tempDir\icons" | Out-Null
Copy-Item "$srcDir\icons\*" "$tempDir\icons\"
Write-Host "Copied: icons/"

# Create ZIP
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath -Force

# Cleanup
Remove-Item -Recurse -Force $tempDir

# Show result
$zip = Get-Item $zipPath
Write-Host ""
Write-Host "ZIP created: $zipPath"
Write-Host "Size: $([math]::Round($zip.Length / 1024)) KB"
