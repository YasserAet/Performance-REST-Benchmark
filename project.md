```
Page 1 sur 7
```
```
Benchmark de performances des Web Services REST
```
```
Travail en binôme
```
**Objectif**

Évaluer, sur un même domaine métier et une même base de données, l’impact des choix de stack
REST sur :

- Latence (p50/p95/p99), débit (req/s), taux d’erreurs.
- Empreinte CPU/RAM, GC, threads.
- Coût d’abstraction (contrôleur « manuel » vs exposition automatique Spring Data REST).

**Modèle de données**

Deux entités : **Category** (1) — **Item** (N).

**SQL (PostgreSQL)**

CREATE TABLE category (
id BIGSERIAL PRIMARY KEY,
code VARCHAR( 32 ) UNIQUE NOT NULL,
name VARCHAR( 128 ) NOT NULL,
updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE item (
id BIGSERIAL PRIMARY KEY,
sku VARCHAR( 64 ) UNIQUE NOT NULL,
name VARCHAR( 128 ) NOT NULL,
price NUMERIC( 10 , 2 ) NOT NULL,
stock INT NOT NULL,
category_id BIGINT NOT NULL REFERENCES category(id),
updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_item_category ON item(category_id);
CREATE INDEX idx_item_updated_at ON item(updated_at);

**Variantes à implémenter**

- **A :** JAX-RS (Jersey) + JPA/Hibernate.
- **C :** Spring Boot + **@RestController** (Spring MVC) + JPA/Hibernate.
- **D :** Spring Boot + **Spring Data REST** (repositories exposés).
    _(Conserver les mêmes endpoints fonctionnels et la même DB/pool. Option B RESTEasy possible_
    _mais non obligatoire.)_


```
Page 2 sur 7
```
**Endpoints (communs aux variantes)**

- **Category**
    o GET /categories?page=&size= : liste paginée

```
o GET /categories/{id} : détail
o POST /categories (JSON ~0.5–1 KB)
```
```
o PUT /categories/{id}
o DELETE /categories/{id}
```
- **Item**
    o GET /items?page=&size= : liste paginée

```
o GET /items/{id} : détail
o GET /items?categoryId=&page=&size= : filtrage relationnel
```
```
o POST /items (JSON ~1–5 KB)
o PUT /items/{id}
```
```
o DELETE /items/{id}
```
- **Relation**

```
o GET /categories/{id}/items?page=&size= : pagination relationnelle
o (Spring Data REST expose aussi /items/{id}/category et /categories/{id}/items ;
accepter le HAL par défaut.)
```
**Jeu de données**

- **Categories** : 2 000 lignes (codes CAT0001..CAT2000).
- **Items** : 100 000 lignes, distribution ~50 items/catégorie.
- **Payloads POST/PUT** :
    o _léger_ 0.5–1 KB (name/price/stock),

```
o lourd 5 KB (champ description simulé).
```
**Environnement & instrumentation**

- Java 17, PostgreSQL 14+, même **HikariCP** (ex. maxPoolSize=20, minIdle=10).
- **Prometheus + JMX Exporter** sur chaque JVM ; **Grafana** pour dashboards JVM + JMeter.
- **JMeter** avec **Backend Listener InfluxDB v2** pour métriques de test.
- **Spring (C/D)** : Actuator + Micrometer Prometheus.
- Désactiver caches HTTP serveur et **Hibernate L2 cache**.


```
Page 3 sur 7
```
**Scénarios de charge (JMeter)**

1. **READ-heavy (relation incluse)**
    o 50% GET /items?page=&size=

```
o 20% GET /items?categoryId=...&page=&size=
o 20% GET /categories/{id}/items?page=&size=
```
```
o 10% GET /categories?page=&size=
o Concurrence : 50 → 100 → 200 threads, ramp-up 60 s, 10 min/palier
```
2. **JOIN-filter ciblé**
    o 70% GET /items?categoryId=...&page=&size=

```
o 30% GET /items/{id}
o 60 → 120 threads, 8 min/palier, 60 s ramp-up
```
3. **MIXED (écritures sur deux entités)**
    o 40% GET /items?page=...

```
o 20% POST /items (1 KB)
o 10% PUT /items/{id} (1 KB)
```
```
o 10% DELETE /items/{id}
o 10% POST /categories (0.5–1 KB)
```
```
o 10% PUT /categories/{id}
o 50 → 100 threads, 10 min/palier
```
4. **HEAVY-body (payload 5 KB)**
    o 50% POST /items (5 KB)

```
o 50% PUT /items/{id} (5 KB)
o 30 → 60 threads, 8 min/palier
```
**Bonnes pratiques JMeter**

- CSV Data Set Config pour ids existants (categories & items) et payloads variés.
- HTTP Request Defaults pour l’URL de la variante testée.
- Backend Listener → InfluxDB v2 (bucket jmeter, org perf).
- Listeners lourds désactivés pendant les runs.


```
Page 4 sur 7
```
**Points d’attention techniques (comparabilité)**

- **N+1** : exposer deux modes internes (flag env)
    o Mode **JOIN FETCH** / projection DTO pour /items?...

```
o Mode baseline sans JOIN FETCH (mesurer l’écart).
```
- **Pagination** identique (page/size constants).
- **Validation** (Bean Validation) activée de façon homogène.
- **Sérialisation** via Jackson par défaut (mêmes modules).
- **Un seul service** lancé pendant un run pour isoler les mesures.

**Tableaux à remplir**

**T0 — Configuration matérielle & logicielle**

```
Élément Valeur
```
```
Machine (CPU, cœurs, RAM)
```
```
OS / Kernel
```
```
Java version
```
```
Docker/Compose versions
```
```
PostgreSQL version
```
```
JMeter version
```
```
Prometheus / Grafana / InfluxDB
```
```
JVM flags (Xms/Xmx, GC)
```
```
HikariCP (min/max/timeout)
```
**T1 — Scénarios**

```
Scénario Mix Threads
(paliers)
```
```
Ramp-
up
```
```
Durée/palier Payload
```
## READ-

```
heavy
(relation)
```
```
50% items list, 20% items by
category, 20% cat→items, 10%
cat list
```
```
50→100→200 60s 10 min –
```
```
JOIN-filter 70% items?categoryId, 30%
item id
```
```
60→120 60s 8 min –
```
## MIXED (

```
entités)
```
```
GET/POST/PUT/DELETE sur
items + categories
```
```
50→100 60s 10 min 1 KB
```
## HEAVY-

```
body
```
```
POST/PUT items 5 KB 30→60 60s 8 min 5 KB
```
**T2 — Résultats JMeter (par scénario et variante)**


```
Page 5 sur 7
```
```
Scénario Mesure A : Jersey C : @RestController D : Spring Data REST
```
```
READ-heavy RPS
```
```
READ-heavy p50 (ms)
```
```
READ-heavy p95 (ms)
```
```
READ-heavy p99 (ms)
```
```
READ-heavy Err %
```
```
JOIN-filter RPS
```
```
JOIN-filter p50 (ms)
```
```
JOIN-filter p95 (ms)
```
```
JOIN-filter p99 (ms)
```
```
JOIN-filter Err %
```
```
MIXED (2 entités) RPS
```
```
MIXED (2 entités) p50 (ms)
```
```
MIXED (2 entités) p95 (ms)
```
```
MIXED (2 entités) p99 (ms)
```
```
MIXED (2 entités) Err %
```
```
HEAVY-body RPS
```
```
HEAVY-body p50 (ms)
```
```
HEAVY-body p95 (ms)
```
```
HEAVY-body p99 (ms)
```
```
HEAVY-body Err %
```
**T3 — Ressources JVM (Prometheus)**

```
Variante CPU proc.
(%) moy/pic
```
```
Heap (Mo)
moy/pic
```
```
GC time
(ms/s)
moy/pic
```
```
Threads
actifs
moy/pic
```
```
Hikari
(actifs/max)
```
```
A : Jersey
```
```
C :
@RestController
```
```
D : Spring Data
REST
```

```
Page 6 sur 7
```
**T4 — Détails par endpoint (scénario JOIN-filter)**

```
Endpoint Variante RPS p
(ms)
```
```
Err
%
```
```
Observations (JOIN, N+1,
projection)
```
```
GET /items?categoryId= A
```
```
C
```
```
D
```
```
GET
/categories/{id}/items
```
## A

## C

## D

**T5 — Détails par endpoint (scénario MIXED)**

```
Endpoint Variante RPS p95 (ms) Err % Observations
```
```
GET /items A
```
```
C
```
```
D
```
```
POST /items A
```
```
C
```
```
D
```
```
PUT /items/{id} A
```
```
C
```
```
D
```
```
DELETE /items/{id} A
```
```
C
```
```
D
```
```
GET /categories A
```
```
C
```
```
D
```
```
POST /categories A
```
```
C
```
```
D
```

```
Page 7 sur 7
```
**T6 — Incidents / erreurs**

```
Run Variante Type d’erreur (HTTP/DB/timeout) % Cause probable Action corrective
```
**T7 — Synthèse & conclusion**

```
Critère Meilleure variante Écart (justifier) Commentaires
```
```
Débit global (RPS)
```
```
Latence p
```
```
Stabilité (erreurs)
```
```
Empreinte CPU/RAM
```
```
Facilité d’expo relationnelle
```
**Indications rapides (implémentation)**

- **JPA mappings**

```
o Item → @ManyToOne(fetch = LAZY) Category category
o Category → @OneToMany(mappedBy="category") List<Item> items
```
- **Requêtes côté contrôleur/repository**
    o Liste items : Page<Item> findAll(Pageable p)

```
o Filtre : Page<Item> findByCategoryId(Long categoryId, Pageable p)
o Variante anti-N+1 : @Query("select i from Item i join fetch i.category where
i.category.id = :cid")
```
- **Spring Data REST**

```
o Repos ItemRepository, CategoryRepository exposés ; endpoints relationnels auto.
o Projections (optionnel) pour limiter le HAL renvoyé si besoin de comparer payloads.
```
**Livrables**

1. Code des variantes A/C/D (endpoints ci-dessus, mappings identiques).
2. Fichiers JMeter (.jmx) pour les 4 scénarios, CSV d’ids/payloads.
3. Dashboards Grafana (JVM + JMeter), exports CSV et captures.
4. Tableaux T0→T7 remplis + **analyse** (impact JOIN, pagination relationnelle, HAL, etc.).
5. Recommandations d’usage (lecture relationnelle, forte écriture, exposition rapide de CRUD).


