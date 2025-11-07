# Script pour générer les fichiers CSV d'IDs à partir de la base de données
# Exécuter après avoir chargé les données dans PostgreSQL

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Génération des fichiers CSV pour JMeter" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$container = "benchmark-postgres"
$dbUser = "benchmark"
$dbName = "benchmark"

Write-Host "`n[1/2] Génération de item-ids.csv..." -ForegroundColor Yellow

# Générer item-ids.csv (sélection aléatoire de 1000 IDs)
$itemQuery = "COPY (SELECT id FROM item ORDER BY RANDOM() LIMIT 1000) TO STDOUT WITH CSV HEADER"
docker exec -i $container psql -U $dbUser -d $dbName -c $itemQuery | Out-File -FilePath "jmeter\csv\item-ids.csv" -Encoding UTF8

Write-Host "[OK] item-ids.csv créé" -ForegroundColor Green

Write-Host "`n[2/2] Génération de category-ids-full.csv..." -ForegroundColor Yellow

# Générer category-ids-full.csv (tous les IDs de catégories)
$categoryQuery = "COPY (SELECT id FROM category ORDER BY id) TO STDOUT WITH CSV HEADER"
docker exec -i $container psql -U $dbUser -d $dbName -c $categoryQuery | Out-File -FilePath "jmeter\csv\category-ids-full.csv" -Encoding UTF8

Write-Host "[OK] category-ids-full.csv créé" -ForegroundColor Green

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "[SUCCES] Fichiers CSV générés !" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nFichiers créés:" -ForegroundColor Yellow
Write-Host "  - jmeter\csv\item-ids.csv (1000 lignes)" -ForegroundColor White
Write-Host "  - jmeter\csv\category-ids-full.csv (2000 lignes)" -ForegroundColor White
Write-Host ""
