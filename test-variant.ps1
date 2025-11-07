# Script de test rapide pour vérifier que tout fonctionne
param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("a", "c", "d")]
    [string]$Variant
)

$ports = @{
    "a" = 8081
    "c" = 8082
    "d" = 8083
}

$port = $ports[$Variant]
$baseUrl = "http://localhost:$port"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Test de la Variante $($Variant.ToUpper()) - Port $port" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Vérifier que le serveur répond
Write-Host "`n[1/6] Test de connectivité..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/categories?page=0&size=1" -UseBasicParsing -TimeoutSec 5
    Write-Host "[OK] Serveur accessible" -ForegroundColor Green
} catch {
    Write-Host "[ERREUR] Serveur inaccessible sur le port $port" -ForegroundColor Red
    Write-Host "Assurez-vous que la variante est démarrée : .\run-variant.ps1 -Variant $Variant" -ForegroundColor Yellow
    exit 1
}

# Test GET /categories
Write-Host "`n[2/6] GET /categories?page=0&size=10..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/categories?page=0&size=10"
    $count = if ($Variant -eq "d") { $response._embedded.categories.Count } else { $response.content.Count }
    Write-Host "[OK] Reçu $count catégories" -ForegroundColor Green
} catch {
    Write-Host "[ERREUR] $($_.Exception.Message)" -ForegroundColor Red
}

# Test GET /categories/{id}
Write-Host "`n[3/6] GET /categories/1..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/categories/1"
    $name = if ($Variant -eq "d") { $response.name } else { $response.name }
    Write-Host "[OK] Catégorie : $name" -ForegroundColor Green
} catch {
    Write-Host "[ERREUR] $($_.Exception.Message)" -ForegroundColor Red
}

# Test GET /items
Write-Host "`n[4/6] GET /items?page=0&size=10..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/items?page=0&size=10"
    $count = if ($Variant -eq "d") { $response._embedded.items.Count } else { $response.content.Count }
    Write-Host "[OK] Reçu $count items" -ForegroundColor Green
} catch {
    Write-Host "[ERREUR] $($_.Exception.Message)" -ForegroundColor Red
}

# Test GET /items?categoryId=
Write-Host "`n[5/6] GET /items?categoryId=1&page=0&size=10..." -ForegroundColor Yellow
try {
    if ($Variant -eq "d") {
        $url = "$baseUrl/items/search/by-category?categoryId=1&page=0&size=10"
    } else {
        $url = "$baseUrl/items?categoryId=1&page=0&size=10"
    }
    $response = Invoke-RestMethod -Uri $url
    $count = if ($Variant -eq "d") { $response._embedded.items.Count } else { $response.content.Count }
    Write-Host "[OK] Reçu $count items de la catégorie 1" -ForegroundColor Green
} catch {
    Write-Host "[ERREUR] $($_.Exception.Message)" -ForegroundColor Red
}

# Test GET /categories/{id}/items (sauf pour Variante D)
if ($Variant -ne "d") {
    Write-Host "`n[6/6] GET /categories/1/items?page=0&size=10..." -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/categories/1/items?page=0&size=10"
        $count = $response.content.Count
        Write-Host "[OK] Reçu $count items de la catégorie 1" -ForegroundColor Green
    } catch {
        Write-Host "[ERREUR] $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "`n[6/6] GET /categories/1/items..." -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/categories/1/items"
        Write-Host "[OK] Relation HAL accessible" -ForegroundColor Green
    } catch {
        Write-Host "[ERREUR] $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "[SUCCES] Tests terminés !" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
