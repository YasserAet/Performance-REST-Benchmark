# Script to extract CSV data from PostgreSQL for JMeter tests
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Extraction des données CSV pour JMeter" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
Write-Host "[1/5] Vérification de Docker..." -ForegroundColor Yellow
$dockerStatus = docker ps 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker n'est pas démarré. Démarrez Docker Desktop et réessayez." -ForegroundColor Red
    exit 1
}

# Check if PostgreSQL container is running
$postgresContainer = docker ps --filter "name=benchmark-postgres" --format "{{.Names}}" 2>&1
if ($postgresContainer -ne "benchmark-postgres") {
    Write-Host "❌ Le conteneur PostgreSQL n'est pas démarré." -ForegroundColor Red
    Write-Host "   Lancez: docker-compose -f docker/docker-compose.yml up -d postgres" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Docker et PostgreSQL sont actifs" -ForegroundColor Green
Write-Host ""

# Create data directory if it doesn't exist
if (!(Test-Path "data")) {
    New-Item -ItemType Directory -Path "data" | Out-Null
}

# Extract categories
Write-Host "[2/5] Extraction des catégories (2000 lignes)..." -ForegroundColor Yellow
docker exec benchmark-postgres psql -U benchmark -d benchmark -c "COPY (SELECT id FROM category ORDER BY id) TO STDOUT WITH CSV HEADER" > data/categories.csv
if ($LASTEXITCODE -eq 0) {
    $catCount = (Get-Content data/categories.csv | Measure-Object -Line).Lines - 1
    Write-Host "✅ Catégories extraites: $catCount lignes" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur lors de l'extraction des catégories" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Extract items
Write-Host "[3/5] Extraction des items (100,000 lignes)..." -ForegroundColor Yellow
docker exec benchmark-postgres psql -U benchmark -d benchmark -c "COPY (SELECT id FROM item ORDER BY id) TO STDOUT WITH CSV HEADER" > data/items.csv
if ($LASTEXITCODE -eq 0) {
    $itemCount = (Get-Content data/items.csv | Measure-Object -Line).Lines - 1
    Write-Host "✅ Items extraits: $itemCount lignes" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur lors de l'extraction des items" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Generate light payloads (0.5-1KB JSON)
Write-Host "[4/5] Génération des payloads légers (1000 échantillons ~0.8KB)..." -ForegroundColor Yellow
$lightPayloads = @()
$lightPayloads += '"item_payload"'  # Header

for ($i = 1; $i -le 1000; $i++) {
    $categoryId = Get-Random -Minimum 1 -Maximum 2001
    $sku = "SKU-BENCH-$i-" + (Get-Random -Minimum 10000 -Maximum 99999)
    $name = "Benchmark Item $i - " + -join ((65..90) + (97..122) | Get-Random -Count 50 | ForEach-Object {[char]$_})
    $price = [math]::Round((Get-Random -Minimum 10 -Maximum 5000) + (Get-Random) / 10, 2)
    $stock = Get-Random -Minimum 0 -Maximum 10000
    
    $description = "Description for item $i. " + (-join ((65..90) + (97..122) + (32..32) | Get-Random -Count 250 | ForEach-Object {[char]$_}))
    
    $json = @{
        sku = $sku
        name = $name
        price = $price
        stock = $stock
        categoryId = $categoryId
        description = $description
    } | ConvertTo-Json -Compress
    
    # Escape quotes for CSV
    $json = $json.Replace('"', '""')
    $lightPayloads += """$json"""
}

$lightPayloads | Out-File -FilePath "data/payloads-light.csv" -Encoding UTF8
Write-Host "✅ Payloads légers générés: 1000 échantillons" -ForegroundColor Green
Write-Host ""

# Generate heavy payloads (5KB JSON)
Write-Host "[5/5] Génération des payloads lourds (500 échantillons ~5KB)..." -ForegroundColor Yellow
$heavyPayloads = @()
$heavyPayloads += '"heavy_payload"'  # Header

for ($i = 1; $i -le 500; $i++) {
    $categoryId = Get-Random -Minimum 1 -Maximum 2001
    $sku = "SKU-HEAVY-$i-" + (Get-Random -Minimum 10000 -Maximum 99999)
    $name = "Heavy Benchmark Item $i - " + -join ((65..90) + (97..122) | Get-Random -Count 100 | ForEach-Object {[char]$_})
    $price = [math]::Round((Get-Random -Minimum 10 -Maximum 10000) + (Get-Random) / 10, 2)
    $stock = Get-Random -Minimum 0 -Maximum 50000
    
    # Generate ~4KB description
    $description = "Heavy description for item $i. " + (-join ((65..90) + (97..122) + (32..32) | Get-Random -Count 3500 | ForEach-Object {[char]$_}))
    
    # Add metadata array
    $metadata = @()
    for ($j = 1; $j -le 20; $j++) {
        $metadata += @{
            key = "meta_key_$j"
            value = "meta_value_$j - " + (-join ((65..90) + (97..122) | Get-Random -Count 30 | ForEach-Object {[char]$_}))
        }
    }
    
    $json = @{
        sku = $sku
        name = $name
        price = $price
        stock = $stock
        categoryId = $categoryId
        description = $description
        metadata = $metadata
        tags = @("tag1", "tag2", "tag3", "benchmark", "heavy", "test")
    } | ConvertTo-Json -Compress -Depth 3
    
    # Escape quotes for CSV
    $json = $json.Replace('"', '""')
    $heavyPayloads += """$json"""
}

$heavyPayloads | Out-File -FilePath "data/payloads-heavy.csv" -Encoding UTF8
Write-Host "✅ Payloads lourds générés: 500 échantillons" -ForegroundColor Green
Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ✅ EXTRACTION TERMINÉE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Fichiers créés dans le dossier 'data/':" -ForegroundColor White
Write-Host "  • categories.csv    : $catCount catégories" -ForegroundColor Gray
Write-Host "  • items.csv         : $itemCount items" -ForegroundColor Gray
Write-Host "  • payloads-light.csv: 1000 échantillons (~0.8KB)" -ForegroundColor Gray
Write-Host "  • payloads-heavy.csv: 500 échantillons (~5KB)" -ForegroundColor Gray
Write-Host ""
Write-Host "Les fichiers CSV sont prêts pour JMeter!" -ForegroundColor Green
Write-Host ""
