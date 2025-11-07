# Benchmark de Performances des Web Services REST

##  Objectif

Évaluer l'impact des choix de stack REST sur les performances (latence, débit, ressources) en comparant :
- **Variante A** : JAX-RS (Jersey) + JPA/Hibernate
- **Variante C** : Spring Boot + @RestController + JPA/Hibernate  
- **Variante D** : Spring Boot + Spring Data REST

##  Structure du Projet

```
PROJET LACHGAR/
├── variante-a-jersey/          # JAX-RS (Jersey) + JPA
├── variante-c-spring-mvc/      # Spring Boot @RestController
├── variante-d-spring-data-rest/# Spring Data REST
├── docker/                     # Docker Compose (PostgreSQL, Prometheus, Grafana, InfluxDB)
├── sql/                        # Scripts SQL (schema + données de test)
├── jmeter/                     # Scénarios JMeter + CSV datasets
├── grafana/                    # Dashboards Grafana
└── README.md
```

##  Modèle de Données

- **Category** (2 000 lignes) : id, code, name, updated_at
- **Item** (100 000 lignes) : id, sku, name, price, stock, category_id, updated_at
- Relation : Category (1) → Item (N)

##  Démarrage Rapide

### 1. Prérequis
- Java 17+
- Docker & Docker Compose
- JMeter 5.x
- Maven 3.8+

### 2. Démarrer l'infrastructure

```bash
cd docker
docker-compose up -d
```

Cela démarre :
- PostgreSQL (port 5432)
- Prometheus (port 9090)
- Grafana (port 3000)
- InfluxDB v2 (port 8086)

### 3. Initialiser la base de données

```bash
# Se connecter à PostgreSQL
docker exec -it postgres psql -U benchmark -d benchmark

# Exécuter les scripts
\i /docker-entrypoint-initdb.d/schema.sql
\i /docker-entrypoint-initdb.d/data.sql
```

### 4. Lancer une variante

#### Variante A (Jersey)
```bash
cd variante-a-jersey
mvn clean package
java -Xms512m -Xmx1g -XX:+UseG1GC -jar target/variante-a-jersey.jar
```

#### Variante C (Spring MVC)
```bash
cd variante-c-spring-mvc
mvn clean package
java -Xms512m -Xmx1g -XX:+UseG1GC -jar target/variante-c-spring-mvc.jar
```

#### Variante D (Spring Data REST)
```bash
cd variante-d-spring-data-rest
mvn clean package
java -Xms512m -Xmx1g -XX:+UseG1GC -jar target/variante-d-spring-data-rest.jar
```

### 5. Exécuter les tests JMeter

```bash
cd jmeter

# Scénario READ-heavy
jmeter -n -t read-heavy.jmx -l results/read-heavy.jtl

# Scénario JOIN-filter
jmeter -n -t join-filter.jmx -l results/join-filter.jtl

# Scénario MIXED
jmeter -n -t mixed.jmx -l results/mixed.jtl

# Scénario HEAVY-body
jmeter -n -t heavy-body.jmx -l results/heavy-body.jtl
```

##  Endpoints Communs

### Category
- `GET /categories?page=0&size=20` - Liste paginée
- `GET /categories/{id}` - Détail
- `POST /categories` - Création (JSON ~0.5-1 KB)
- `PUT /categories/{id}` - Mise à jour
- `DELETE /categories/{id}` - Suppression

### Item
- `GET /items?page=0&size=20` - Liste paginée
- `GET /items/{id}` - Détail
- `GET /items?categoryId={id}&page=0&size=20` - Filtrage par catégorie
- `POST /items` - Création (JSON ~1-5 KB)
- `PUT /items/{id}` - Mise à jour
- `DELETE /items/{id}` - Suppression

### Relation
- `GET /categories/{id}/items?page=0&size=20` - Items d'une catégorie

##  Monitoring

- **Prometheus** : http://localhost:9090
- **Grafana** : http://localhost:3000 (admin/admin)
- **InfluxDB** : http://localhost:8086

