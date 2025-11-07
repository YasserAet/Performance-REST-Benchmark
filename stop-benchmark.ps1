# Script pour arrêter tous les services
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Arrêt de l'environnement de benchmark" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`n[1/2] Arrêt de l'infrastructure Docker..." -ForegroundColor Yellow
Set-Location docker
docker-compose down
Set-Location ..
Write-Host "[OK] Infrastructure arrêtée" -ForegroundColor Green

Write-Host "`n[2/2] Nettoyage des processus Java..." -ForegroundColor Yellow
$javaProcesses = Get-Process java -ErrorAction SilentlyContinue
if ($javaProcesses) {
    $javaProcesses | ForEach-Object {
        Write-Host "Arrêt du processus Java (PID: $($_.Id))..." -ForegroundColor Gray
        Stop-Process -Id $_.Id -Force
    }
    Write-Host "[OK] Processus Java arrêtés" -ForegroundColor Green
} else {
    Write-Host "[INFO] Aucun processus Java en cours" -ForegroundColor Cyan
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "[SUCCES] Environnement arrêté" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
