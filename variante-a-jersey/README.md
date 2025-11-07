# Variante A - JAX-RS (Jersey) + JPA/Hibernate

## Description
Implémentation REST avec Jersey 3.x, JPA/Hibernate et HikariCP.

## Endpoints

### Categories
- `GET http://localhost:8081/categories?page=0&size=20`
- `GET http://localhost:8081/categories/{id}`
- `GET http://localhost:8081/categories/{id}/items?page=0&size=20`
- `POST http://localhost:8081/categories`
- `PUT http://localhost:8081/categories/{id}`
- `DELETE http://localhost:8081/categories/{id}`

### Items
- `GET http://localhost:8081/items?page=0&size=20`
- `GET http://localhost:8081/items?categoryId=1&page=0&size=20`
- `GET http://localhost:8081/items/{id}`
- `POST http://localhost:8081/items`
- `PUT http://localhost:8081/items/{id}`
- `DELETE http://localhost:8081/items/{id}`

### Metrics
- `GET http://localhost:8081/metrics` (Prometheus)

## Build & Run

```bash
# Compiler
mvn clean package

# Lancer
java -Xms512m -Xmx1g -XX:+UseG1GC -jar target/variante-a-jersey.jar
```

## Configuration

### Base de données
- URL: `jdbc:postgresql://localhost:5432/benchmark`
- User: `benchmark`
- Password: `benchmark123`

### HikariCP
- minimumIdle: 10
- maximumPoolSize: 20
- connectionTimeout: 30000ms

## Optimisations
- JOIN FETCH utilisé pour éviter le problème N+1
- Pagination sur toutes les listes
- Bean Validation activée
- Prometheus metrics exposées

## Test rapide

```bash
# Créer une catégorie
curl -X POST http://localhost:8081/categories \
  -H "Content-Type: application/json" \
  -d '{"code":"TEST001","name":"Test Category"}'

# Lister les catégories
curl http://localhost:8081/categories?page=0&size=10
```
