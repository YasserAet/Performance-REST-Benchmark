# Benchmark de Performance REST - Java

Étude comparative de trois approches REST en Java : JAX-RS (Jersey), Spring MVC (@RestController), et Spring Data REST.

## Description

Ce projet évalue les performances, la consommation de ressources et la fiabilité de trois technologies REST sous charge réaliste avec une base de données PostgreSQL.

## Technologies Comparées

- **Variante A** : JAX-RS (Jersey 3.1.3)
- **Variante C** : Spring MVC (@RestController)
- **Variante D** : Spring Data REST

## Architecture

```
├── variante-a-jersey/          # Implémentation JAX-RS
├── variante-c-spring-mvc/      # Implémentation Spring MVC
├── variante-d-spring-data-rest/# Implémentation Spring Data REST
├── scenarios/                   # Tests JMeter (4 scénarios)
├── sql/                         # Scripts de base de données
├── docker/                      # Configuration Prometheus/Grafana
└── RESULTATS/                   # Livrables du benchmark
    ├── tableaux/                # 8 tableaux CSV (T0-T7)
    ├── rapports/                # Documentation Markdown
    ├── jmeter/                  # Rapports HTML JMeter
    └── screenshots/             # Captures Grafana/Prometheus
```

## Prérequis

- Java 17+
- Maven 3.8+
- Docker Desktop
- PostgreSQL 14
- JMeter 5.6.3

## Installation

1. Cloner le repository
```bash
git clone https://github.com/YasserAet/Performance-REST-Benchmark.git
cd Performance-REST-Benchmark
```

2. Démarrer PostgreSQL
```bash
docker-compose up -d
```

3. Créer la base de données
```bash
docker exec -i benchmark-postgres psql -U benchmark < sql/01-schema.sql
docker exec -i benchmark-postgres psql -U benchmark < sql/02-data.sql
```

4. Compiler les variantes
```bash
cd variante-a-jersey && mvn clean package -DskipTests
cd ../variante-c-spring-mvc && mvn clean package -DskipTests
cd ../variante-d-spring-data-rest && mvn clean package -DskipTests
```

## Exécution des Tests

### Démarrer une variante

```powershell
# Variante A (port 8081)
java -jar variante-a-jersey/target/variante-a-jersey-1.0.0.jar

# Variante C (port 8082)
java -jar variante-c-spring-mvc/target/variante-c-spring-mvc-1.0.0.jar

# Variante D (port 8083)
java -jar variante-d-spring-data-rest/target/variante-d-spring-data-rest-1.0.0.jar
```

### Lancer les tests JMeter

```powershell
# Scénario 01 - READ Heavy
jmeter -n -t scenarios/01-read-heavy.jmx -Jhost=localhost -Jport=8081

# Scénario 02 - JOIN Filter
jmeter -n -t scenarios/02-join-filter.jmx -Jhost=localhost -Jport=8081

# Scénario 03 - MIXED
jmeter -n -t scenarios/03-mixed.jmx -Jhost=localhost -Jport=8081

# Scénario 04 - HEAVY Body
jmeter -n -t scenarios/04-heavy-body.jmx -Jhost=localhost -Jport=8081
```

## Scénarios de Test

| Scénario | Threads | Durée | Description |
|----------|---------|-------|-------------|
| READ-heavy | 50→200 | 30 min | Lecture intensive (50% GET items, 20% GET items+cat) |
| JOIN-filter | 60→120 | 30 min | Requêtes JOIN complexes (70% items by category) |
| MIXED | 50→100 | 30 min | Opérations CRUD mixtes (40% GET, 20% POST, 10% PUT/DELETE) |
| HEAVY-body | 30→60 | 30 min | Payloads lourds 5KB (50% POST, 50% PUT) |

## Résultats

Les résultats complets sont disponibles dans le dossier `RESULTATS/` :

- **tableaux/** : 8 fichiers CSV (T0-T7) avec métriques de performance
- **rapports/** : Documentation Markdown académique
- **jmeter/** : 12 rapports HTML JMeter (3 variantes × 4 scénarios)
- **screenshots/** : 13 captures Grafana/Prometheus

### Synthèse

| Critère | Meilleur | Valeur |
|---------|----------|--------|
| Débit max (RPS) | Spring Data REST | 158.55 RPS |
| Latence min (p50) | Spring Data REST | 585 ms |
| Requêtes JOIN | Jersey | 138.09 RPS, 0% erreur |
| Consommation CPU | Spring Data REST | 39% moy. |

## Recommandations

- **API haute charge** : Spring Data REST (débit 3-4x supérieur)
- **Requêtes complexes** : Jersey (contrôle SQL total, +52% sur JOIN)
- **Développement rapide** : Spring Data REST (génération automatique)

## Monitoring

Infrastructure de monitoring configurée :
- Prometheus : Collecte des métriques JVM
- Grafana : Dashboards de visualisation
- JMX Exporter : Exposition des métriques Java

```bash
# Démarrer le monitoring
docker-compose -f docker/docker-compose.yml up -d

# Accès Grafana : http://localhost:3000
# Accès Prometheus : http://localhost:9090
```

## Configuration

### Base de Données
- PostgreSQL 14-alpine
- 2000 catégories, 100000 items
- HikariCP : min=5, max=20

### JVM
- OpenJDK 17.0.16+8-LTS
- Flags : `-Xms512m -Xmx1024m -XX:+UseG1GC`

### Environnement
- Intel Core i7-12700H, 14 cores
- 16 GB RAM DDR4
- Windows 11 Pro

## Structure du Projet

```
variante-a-jersey/
├── src/main/java/com/benchmark/jersey/
│   ├── Application.java
│   ├── resource/         # Endpoints REST
│   └── entity/           # Entités JPA

variante-c-spring-mvc/
├── src/main/java/com/benchmark/springmvc/
│   ├── Application.java
│   ├── controller/       # @RestController
│   └── repository/       # JPA Repository

variante-d-spring-data-rest/
├── src/main/java/com/benchmark/springdatarest/
│   ├── Application.java
│   ├── repository/       # Spring Data REST Repository
│   └── projection/       # Projections HAL
```

## Licence

MIT

## Auteurs

- Yassir Aitali
- Fatima Ezzahra Kelladi

Benchmark REST Performance Study
