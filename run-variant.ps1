# Script pour lancer une variante spécifique
param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("a", "c", "d")]
    [string]$Variant
)

$ErrorActionPreference = "Stop"

$variants = @{
    "a" = @{
        Name = "Jersey + JPA"
        Port = 8081
        Dir = "variante-a-jersey"
        Jar = "variante-a-jersey-1.0.0.jar"
        Command = "java -jar target\variante-a-jersey-1.0.0.jar"
    }
    "c" = @{
        Name = "Spring MVC"
        Port = 8082
        Dir = "variante-c-spring-mvc"
        Jar = "variante-c-spring-mvc-1.0.0.jar"
        Command = "java -jar target\variante-c-spring-mvc-1.0.0.jar"
    }
    "d" = @{
        Name = "Spring Data REST"
        Port = 8083
        Dir = "variante-d-spring-data-rest"
        Jar = "variante-d-spring-data-rest-1.0.0.jar"
        Command = "java -jar target\variante-d-spring-data-rest-1.0.0.jar"
    }
}

$config = $variants[$Variant]

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Démarrage Variante $($Variant.ToUpper()) - $($config.Name)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Vérifier que le JAR existe
$jarPath = Join-Path $config.Dir "target\$($config.Jar)"
if (-not (Test-Path $jarPath)) {
    Write-Host "[ERREUR] JAR introuvable: $jarPath" -ForegroundColor Red
    Write-Host "Exécutez d'abord: .\start-benchmark.ps1" -ForegroundColor Yellow
    exit 1
}

# Vérifier que le port n'est pas déjà utilisé
$connection = Test-NetConnection -ComputerName localhost -Port $config.Port -WarningAction SilentlyContinue
if ($connection.TcpTestSucceeded) {
    Write-Host "[ERREUR] Le port $($config.Port) est déjà utilisé" -ForegroundColor Red
    exit 1
}

Write-Host "`n[INFO] Démarrage sur le port $($config.Port)..." -ForegroundColor Yellow
Write-Host "[INFO] Appuyez sur Ctrl+C pour arrêter`n" -ForegroundColor Yellow

Set-Location $config.Dir

try {
    & java -jar "target\$($config.Jar)"
} finally {
    Set-Location ..
}
