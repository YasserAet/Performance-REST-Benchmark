# Script principal pour démarrer l'infrastructure et exécuter les benchmarks
# PowerShell

param(
    [string]$Variant = "all",  # a, c, d, ou all
    [switch]$SkipBuild = $false,
    [switch]$OnlyInfra = $false
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "BENCHMARK REST - Démarrage" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Fonction pour vérifier si un port est utilisé
function Test-Port {
    param([int]$Port)
    $connection = Test-NetConnection -ComputerName localhost -Port $Port -WarningAction SilentlyContinue
    return $connection.TcpTestSucceeded
}

# Étape 1: Démarrer l'infrastructure Docker
Write-Host "`n[1/5] Démarrage de l'infrastructure Docker..." -ForegroundColor Yellow
Set-Location docker
docker-compose down 2>$null
docker-compose up -d
Set-Location ..

Write-Host "Attente du démarrage de PostgreSQL (30s)..." -ForegroundColor Gray
Start-Sleep -Seconds 30

# Vérification de PostgreSQL
if (Test-Port -Port 5432) {
    Write-Host "[OK] PostgreSQL démarré sur le port 5432" -ForegroundColor Green
} else {
    Write-Host "[ERREUR] PostgreSQL ne répond pas" -ForegroundColor Red
    exit 1
}

# Étape 2: Charger les données SQL
Write-Host "`n[2/5] Chargement des données SQL..." -ForegroundColor Yellow

$container = "benchmark-postgres"
$dbUser = "benchmark"
$dbName = "benchmark"

# Vérifier si les données existent déjà
$checkData = docker exec $container psql -U $dbUser -d $dbName -t -c "SELECT COUNT(*) FROM category" 2>$null
if ($checkData -and [int]$checkData.Trim() -gt 0) {
    Write-Host "[INFO] Les données existent déjà ($($checkData.Trim()) catégories)" -ForegroundColor Cyan
} else {
    Write-Host "Chargement du schéma..." -ForegroundColor Gray
    Get-Content sql\schema.sql | docker exec -i $container psql -U $dbUser -d $dbName
    
    Write-Host "Chargement des données (cela peut prendre 1-2 minutes)..." -ForegroundColor Gray
    Get-Content sql\data.sql | docker exec -i $container psql -U $dbUser -d $dbName
    
    Write-Host "[OK] Données chargées" -ForegroundColor Green
}

# Étape 3: Générer les CSV pour JMeter
Write-Host "`n[3/5] Génération des fichiers CSV pour JMeter..." -ForegroundColor Yellow
.\generate-jmeter-csv.ps1

if ($OnlyInfra) {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "[SUCCES] Infrastructure prête !" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "`nServices disponibles:" -ForegroundColor Yellow
    Write-Host "  - PostgreSQL  : localhost:5432" -ForegroundColor White
    Write-Host "  - Prometheus  : http://localhost:9090" -ForegroundColor White
    Write-Host "  - Grafana     : http://localhost:3000 (admin/admin)" -ForegroundColor White
    Write-Host "  - InfluxDB    : http://localhost:8086" -ForegroundColor White
    Write-Host ""
    exit 0
}

# Étape 4: Compiler les variantes
Write-Host "`n[4/5] Compilation des variantes..." -ForegroundColor Yellow

if (-not $SkipBuild) {
    if ($Variant -eq "all" -or $Variant -eq "a") {
        Write-Host "Compilation Variante A (Jersey)..." -ForegroundColor Gray
        Set-Location variante-a-jersey
        mvn clean package -DskipTests -q
        Set-Location ..
        Write-Host "[OK] Variante A compilée" -ForegroundColor Green
    }

    if ($Variant -eq "all" -or $Variant -eq "c") {
        Write-Host "Compilation Variante C (Spring MVC)..." -ForegroundColor Gray
        Set-Location variante-c-spring-mvc
        mvn clean package -DskipTests -q
        Set-Location ..
        Write-Host "[OK] Variante C compilée" -ForegroundColor Green
    }

    if ($Variant -eq "all" -or $Variant -eq "d") {
        Write-Host "Compilation Variante D (Spring Data REST)..." -ForegroundColor Gray
        Set-Location variante-d-spring-data-rest
        mvn clean package -DskipTests -q
        Set-Location ..
        Write-Host "[OK] Variante D compilée" -ForegroundColor Green
    }
} else {
    Write-Host "[INFO] Compilation ignorée (--SkipBuild)" -ForegroundColor Cyan
}

# Étape 5: Informations finales
Write-Host "`n[5/5] Configuration terminée !" -ForegroundColor Yellow

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "[SUCCES] Environnement prêt !" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nPour lancer une variante:" -ForegroundColor Yellow
Write-Host "  .\run-variant.ps1 -Variant a   # Jersey (port 8081)" -ForegroundColor White
Write-Host "  .\run-variant.ps1 -Variant c   # Spring MVC (port 8082)" -ForegroundColor White
Write-Host "  .\run-variant.ps1 -Variant d   # Spring Data REST (port 8083)" -ForegroundColor White

Write-Host "`nPour exécuter les tests JMeter:" -ForegroundColor Yellow
Write-Host "  .\run-jmeter.ps1 -Variant a -Scenario read-heavy" -ForegroundColor White

Write-Host "`nServices disponibles:" -ForegroundColor Yellow
Write-Host "  - PostgreSQL  : localhost:5432" -ForegroundColor White
Write-Host "  - Prometheus  : http://localhost:9090" -ForegroundColor White
Write-Host "  - Grafana     : http://localhost:3000 (admin/admin)" -ForegroundColor White
Write-Host "  - InfluxDB    : http://localhost:8086" -ForegroundColor White
Write-Host ""
