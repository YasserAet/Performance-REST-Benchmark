# Résultats du Benchmark - REST API Performance

## T0 — Configuration matérielle & logicielle

| Élément | Valeur |
|---------|--------|
| Machine (CPU, cœurs, RAM) | _À remplir_ |
| OS / Kernel | _À remplir_ |
| Java version | Java 17 / 21 |
| Docker/Compose versions | _À remplir_ |
| PostgreSQL version | 14-alpine |
| JMeter version | 5.x |
| Prometheus / Grafana / InfluxDB | Latest / Latest / 2.7-alpine |
| JVM flags (Xms/Xmx, GC) | _À remplir_ |
| HikariCP (min/max/timeout) | min=10, max=20, timeout=30s |

---

## T1 — Scénarios

| Scénario | Mix | Threads (paliers) | Ramp-up | Durée/palier | Payload |
|----------|-----|-------------------|---------|--------------|---------|
| READ-heavy (relation) | 50% items list, 20% items by category, 20% cat→items, 10% cat list | 50→100→200 | 60s | 10 min | – |
| JOIN-filter | 70% items?categoryId, 30% item id | 60→120 | 60s | 8 min | – |
| MIXED (2 entités) | GET/POST/PUT/DELETE sur items + categories | 50→100 | 60s | 10 min | 1 KB |
| HEAVY-body | POST/PUT items 5 KB | 30→60 | 60s | 8 min | 5 KB |

---

## T2 — Résultats JMeter (par scénario et variante)

| Scénario | Mesure | A : Jersey | C : @RestController | D : Spring Data REST |
|----------|--------|-----------|---------------------|----------------------|
| READ-heavy | RPS | | | |
| READ-heavy | p50 (ms) | | | |
| READ-heavy | p95 (ms) | | | |
| READ-heavy | p99 (ms) | | | |
| READ-heavy | Err % | | | |
| JOIN-filter | RPS | | | |
| JOIN-filter | p50 (ms) | | | |
| JOIN-filter | p95 (ms) | | | |
| JOIN-filter | p99 (ms) | | | |
| JOIN-filter | Err % | | | |
| MIXED (2 entités) | RPS | | | |
| MIXED (2 entités) | p50 (ms) | | | |
| MIXED (2 entités) | p95 (ms) | | | |
| MIXED (2 entités) | p99 (ms) | | | |
| MIXED (2 entités) | Err % | | | |
| HEAVY-body | RPS | | | |
| HEAVY-body | p50 (ms) | | | |
| HEAVY-body | p95 (ms) | | | |
| HEAVY-body | p99 (ms) | | | |
| HEAVY-body | Err % | | | |

---

## T3 — Ressources JVM (Prometheus)

| Variante | CPU proc. (%) moy/pic | Heap (Mo) moy/pic | GC time (ms/s) moy/pic | Threads actifs moy/pic | Hikari (actifs/max) |
|----------|----------------------|-------------------|------------------------|------------------------|---------------------|
| A : Jersey | | | | | |
| C : @RestController | | | | | |
| D : Spring Data REST | | | | | |

---

## T4 — Détails par endpoint (scénario JOIN-filter)

| Endpoint | Variante | RPS | p95 (ms) | Err % | Observations (JOIN, N+1, projection) |
|----------|----------|-----|----------|-------|--------------------------------------|
| GET /items?categoryId= | A | | | | |
| | C | | | | |
| | D | | | | |
| GET /categories/{id}/items | A | | | | |
| | C | | | | |
| | D | | | | |

---

## T5 — Détails par endpoint (scénario MIXED)

| Endpoint | Variante | RPS | p95 (ms) | Err % | Observations |
|----------|----------|-----|----------|-------|--------------|
| GET /items | A | | | | |
| | C | | | | |
| | D | | | | |
| POST /items | A | | | | |
| | C | | | | |
| | D | | | | |
| PUT /items/{id} | A | | | | |
| | C | | | | |
| | D | | | | |
| DELETE /items/{id} | A | | | | |
| | C | | | | |
| | D | | | | |
| GET /categories | A | | | | |
| | C | | | | |
| | D | | | | |
| POST /categories | A | | | | |
| | C | | | | |
| | D | | | | |

---

## T6 — Incidents / erreurs

| Run | Variante | Type d'erreur (HTTP/DB/timeout) | % | Cause probable | Action corrective |
|-----|----------|----------------------------------|---|----------------|-------------------|
| | | | | | |
| | | | | | |
| | | | | | |

---

## T7 — Synthèse & conclusion

| Critère | Meilleure variante | Écart (justifier) | Commentaires |
|---------|-------------------|-------------------|--------------|
| Débit global (RPS) | | | |
| Latence p95 | | | |
| Stabilité (erreurs) | | | |
| Empreinte CPU/RAM | | | |
| Facilité d'expo relationnelle | | | |

---

## Conclusions et Recommandations

### Points clés observés

1. **Performance pure** :
   - 
   - 

2. **Consommation de ressources** :
   - 
   - 

3. **Facilité de développement** :
   - 
   - 

4. **Problématique N+1** :
   - 
   - 

### Recommandations d'usage

| Cas d'usage | Variante recommandée | Justification |
|-------------|---------------------|---------------|
| API haute performance | | |
| Prototypage rapide | | |
| CRUD simple avec relations | | |
| Charge élevée en écriture | | |
| Microservices légers | | |

### Améliorations possibles

1. **Optimisations identifiées** :
   - 
   - 

2. **Tests complémentaires** :
   - 
   - 

---

*Date de génération : _À remplir_*
*Réalisé par : _À remplir_*
