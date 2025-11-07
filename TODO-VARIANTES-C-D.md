# 📋 TODO: Variantes C (Spring MVC) et D (Spring Data REST)

Ce document liste les étapes à suivre pour compléter et tester les Variantes C et D, en suivant le même processus que la Variante A.

---

## 🎯 Vue d'Ensemble

### ✅ Variante A (Jersey) - COMPLÉTÉ
- Code: **Fonctionnel et testé** ✅
- API: **Opérationnelle** ✅
- Métriques: **Configurées (port 9091)** ✅
- Scénarios JMeter: **Prêts** ✅

### ⏳ Variante C (Spring MVC) - À COMPLÉTER
- Code: **Existant, non testé** ⚠️
- API: **À vérifier** ⏳
- Métriques: **À configurer (port 9092)** ⏳
- Scénarios JMeter: **À adapter** ⏳

### ⏳ Variante D (Spring Data REST) - À COMPLÉTER
- Code: **Existant, non testé** ⚠️
- API: **À vérifier** ⏳
- Métriques: **À configurer (port 9093)** ⏳
- Scénarios JMeter: **À adapter** ⏳

---

## 📝 VARIANTE C - Spring MVC + JPA

### Étape 1: Vérifier la Structure du Projet

**Emplacement:** `variante-c-spring-mvc/`

**Fichiers attendus:**
```
variante-c-spring-mvc/
├── pom.xml
├── src/main/java/com/benchmark/springmvc/
│   ├── Application.java
│   ├── entity/
│   │   ├── Category.java
│   │   └── Item.java
│   ├── repository/
│   │   ├── CategoryRepository.java
│   │   └── ItemRepository.java
│   ├── controller/
│   │   ├── CategoryController.java
│   │   └── ItemController.java
│   └── dto/
│       └── PageResponse.java
└── src/main/resources/
    └── application.properties
```

### Étape 2: Vérifier application.properties

**Fichier:** `variante-c-spring-mvc/src/main/resources/application.properties`

**Configuration requise:**
```properties
# Server
server.port=8082

# DataSource PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/benchmark
spring.datasource.username=benchmark
spring.datasource.password=benchmark123
spring.datasource.driver-class-name=org.postgresql.Driver

# HikariCP
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.idle-timeout=300000
spring.datasource.hikari.max-lifetime=600000

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Jackson
spring.jackson.serialization.write-dates-as-timestamps=false
spring.jackson.date-format=yyyy-MM-dd'T'HH:mm:ss

# Actuator (IMPORTANT pour métriques)
management.endpoints.web.exposure.include=health,info,metrics,prometheus
management.metrics.export.prometheus.enabled=true
management.server.port=9092
```

**⚠️ CRITIQUE:** Le port des métriques DOIT être **9092** (déjà configuré dans prometheus.yml)

### Étape 3: Vérifier pom.xml

**Dépendances requises:**
```xml
<dependencies>
    <!-- Spring Boot Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- PostgreSQL -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <version>42.6.0</version>
    </dependency>
    
    <!-- Actuator + Prometheus -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
        <groupId>io.micrometer</groupId>
        <artifactId>micrometer-registry-prometheus</artifactId>
    </dependency>
    
    <!-- Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
</dependencies>
```

### Étape 4: Vérifier les Entités

**Category.java:**
```java
@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, length = 32)
    private String code;
    
    @Column(length = 128)
    private String name;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "category")
    @JsonIgnore  // ⚠️ IMPORTANT: Éviter lazy loading exception
    private List<Item> items = new ArrayList<>();
    
    // Getters, setters, PreUpdate...
}
```

**Item.java:**
```java
@Entity
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, length = 64)
    private String sku;
    
    private String name;
    private BigDecimal price;
    private Integer stock;
    
    @ManyToOne(fetch = FetchType.EAGER)  // ⚠️ IMPORTANT: EAGER pour inclure category
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties({"items"})
    private Category category;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;
    
    // Getters, setters, validation annotations...
}
```

### Étape 5: Tester l'Application

**1. Compiler:**
```powershell
cd variante-c-spring-mvc
mvn clean package
```

**2. Lancer dans IntelliJ:**
- Ouvrir `Application.java`
- Clic droit → Run 'Application.main()'
- Attendre: `Started Application in X seconds`

**3. Vérifier les endpoints:**
```powershell
# API principale
curl http://localhost:8082/categories?page=0&size=5

# Métriques Prometheus (PORT 9092 !)
curl http://localhost:9092/actuator/prometheus

# Health check
curl http://localhost:8082/actuator/health
```

**4. Vérifier dans Prometheus:**
- Ouvrir: http://localhost:9090/targets
- Chercher: `variante-c-spring-mvc`
- État attendu: **UP** (vert)

### Étape 6: Exécuter les Benchmarks

**Commandes JMeter (adapter de Variante A):**
```powershell
# Scénario 01
jmeter -n -t scenarios/01-read-heavy.jmx `
  -DbaseUrl=localhost:8082 `
  -Dvariant=c `
  -l results/variante-c-read-heavy.csv `
  -e -o reports/variante-c-read-heavy

# Scénario 02
jmeter -n -t scenarios/02-join-filter.jmx `
  -DbaseUrl=localhost:8082 `
  -Dvariant=c `
  -l results/variante-c-join-filter.csv `
  -e -o reports/variante-c-join-filter

# Scénario 03
jmeter -n -t scenarios/03-mixed.jmx `
  -DbaseUrl=localhost:8082 `
  -Dvariant=c `
  -l results/variante-c-mixed.csv `
  -e -o reports/variante-c-mixed

# Scénario 04
jmeter -n -t scenarios/04-heavy-body.jmx `
  -DbaseUrl=localhost:8082 `
  -Dvariant=c `
  -l results/variante-c-heavy-body.csv `
  -e -o reports/variante-c-heavy-body
```

**Temps estimé:** 2h30 (4 × 30min + pauses)

### Étape 7: Capturer Screenshots Grafana

Pour chaque scénario, capturer 3 screenshots:
1. **T+5min** (ramp-up): `screenshots/c-{scenario}-t5.png`
2. **T+15min** (pic): `screenshots/c-{scenario}-t15.png`
3. **T+28min** (fin): `screenshots/c-{scenario}-t28.png`

**Total:** 12 screenshots (4 scénarios × 3 timestamps)

### Étape 8: Remplir les Tableaux

Dans `tableaux.xlsx`, remplir les lignes "C - Spring MVC" pour:
- **T2:** Résultats JMeter (depuis reports HTML)
- **T3:** Ressources JVM (depuis screenshots Grafana)
- **T4:** Détail JOIN Filter
- **T5:** Détail MIXED

---

## 📝 VARIANTE D - Spring Data REST

### Étape 1: Vérifier la Structure du Projet

**Emplacement:** `variante-d-spring-data-rest/`

**Fichiers attendus:**
```
variante-d-spring-data-rest/
├── pom.xml
├── src/main/java/com/benchmark/springdatarest/
│   ├── Application.java
│   ├── entity/
│   │   ├── Category.java
│   │   └── Item.java
│   └── repository/
│       ├── CategoryRepository.java
│       └── ItemRepository.java
└── src/main/resources/
    └── application.properties
```

**Note:** Pas de contrôleurs ! Spring Data REST génère les endpoints automatiquement.

### Étape 2: Vérifier application.properties

**Configuration requise:**
```properties
# Server
server.port=8083

# DataSource PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/benchmark
spring.datasource.username=benchmark
spring.datasource.password=benchmark123
spring.datasource.driver-class-name=org.postgresql.Driver

# HikariCP
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.idle-timeout=300000
spring.datasource.hikari.max-lifetime=600000

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Spring Data REST
spring.data.rest.base-path=/
spring.data.rest.default-page-size=20
spring.data.rest.max-page-size=100

# Jackson
spring.jackson.serialization.write-dates-as-timestamps=false
spring.jackson.date-format=yyyy-MM-dd'T'HH:mm:ss

# Actuator
management.endpoints.web.exposure.include=health,info,metrics,prometheus
management.metrics.export.prometheus.enabled=true
management.server.port=9093
```

**⚠️ CRITIQUE:** Port métriques = **9093**

### Étape 3: Vérifier pom.xml

**Dépendances supplémentaires (vs Spring MVC):**
```xml
<!-- Spring Data REST (remplace spring-boot-starter-web) -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-rest</artifactId>
</dependency>
```

### Étape 4: Vérifier les Repositories

**CategoryRepository.java:**
```java
@RepositoryRestResource(path = "categories")
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Spring Data REST génère automatiquement:
    // GET /categories
    // GET /categories/{id}
    // POST /categories
    // PUT /categories/{id}
    // DELETE /categories/{id}
}
```

**ItemRepository.java:**
```java
@RepositoryRestResource(path = "items")
public interface ItemRepository extends JpaRepository<Item, Long> {
    // Méthode personnalisée pour filtrage par catégorie
    Page<Item> findByCategoryId(@Param("categoryId") Long categoryId, Pageable pageable);
}
```

### Étape 5: ⚠️ ADAPTATION IMPORTANTE DES ENDPOINTS

**Spring Data REST utilise une structure HAL différente!**

**Endpoints générés:**
- `GET /categories` → Liste paginée
- `GET /categories/{id}` → Catégorie unique
- `POST /categories` → Créer
- `PUT /categories/{id}` → Modifier
- `DELETE /categories/{id}` → Supprimer
- `GET /items` → Liste items
- `GET /items/search/findByCategoryId?categoryId={id}` → **⚠️ DIFFÉRENT !**

**⚠️ PROBLÈME:** Les scénarios JMeter utilisent `/items?categoryId={id}` mais Spring Data REST utilise `/items/search/findByCategoryId?categoryId={id}`

**Solutions:**
1. **Option A (Recommandée):** Créer un `@RepositoryRestController` custom pour mapper `/items?categoryId`
2. **Option B:** Adapter les scénarios JMeter pour utiliser `/items/search/...`

### Étape 6: Tester l'Application

**1. Lancer:**
```powershell
cd variante-d-spring-data-rest
mvn clean package
# Puis Run dans IntelliJ
```

**2. Vérifier:**
```powershell
# Liste catégories
curl http://localhost:8083/categories

# Métriques (PORT 9093!)
curl http://localhost:9093/actuator/prometheus

# Search endpoint
curl "http://localhost:8083/items/search/findByCategoryId?categoryId=1&page=0&size=10"
```

**3. Prometheus:**
- http://localhost:9090/targets
- `variante-d-spring-data-rest` → **UP**

### Étape 7: Adapter JMeter (si nécessaire)

Si vous choisissez l'Option B, modifier dans les .jmx:
```xml
<!-- Ancien (Spring MVC) -->
<stringProp name="HTTPSampler.path">/items?categoryId=${category_id}</stringProp>

<!-- Nouveau (Spring Data REST) -->
<stringProp name="HTTPSampler.path">/items/search/findByCategoryId?categoryId=${category_id}</stringProp>
```

### Étape 8: Exécuter les Benchmarks

**Commandes JMeter:**
```powershell
# Adapter baseUrl et variant
jmeter -n -t scenarios/01-read-heavy.jmx `
  -DbaseUrl=localhost:8083 `
  -Dvariant=d `
  -l results/variante-d-read-heavy.csv `
  -e -o reports/variante-d-read-heavy

# Répéter pour scénarios 02, 03, 04...
```

### Étape 9: Capturer Screenshots + Remplir Tableaux

Même processus que Variante C.

---

## 🔍 Checklist de Validation

### Variante C (Spring MVC)
- [ ] `application.properties` configuré (port 8082, metrics 9092)
- [ ] `pom.xml` contient Actuator + Micrometer
- [ ] Entités avec @JsonIgnore et FetchType.EAGER
- [ ] Application démarre sans erreur
- [ ] `/categories` retourne du JSON
- [ ] `/actuator/prometheus` accessible sur port 9092
- [ ] Prometheus target "variante-c-spring-mvc" = UP
- [ ] 4 scénarios JMeter exécutés
- [ ] 12 screenshots Grafana capturés
- [ ] Tableaux T2-T5 remplis pour lignes "C"

### Variante D (Spring Data REST)
- [ ] `application.properties` configuré (port 8083, metrics 9093)
- [ ] `pom.xml` contient spring-boot-starter-data-rest
- [ ] Repositories avec @RepositoryRestResource
- [ ] Application démarre sans erreur
- [ ] `/categories` retourne du JSON HAL
- [ ] Endpoint search fonctionne (ou custom controller)
- [ ] `/actuator/prometheus` accessible sur port 9093
- [ ] Prometheus target "variante-d-spring-data-rest" = UP
- [ ] 4 scénarios JMeter exécutés (adaptés si nécessaire)
- [ ] 12 screenshots Grafana capturés
- [ ] Tableaux T2-T5 remplis pour lignes "D"

---

## 📊 Résultats Attendus

Après avoir complété C et D, vous aurez:
- **36 rapports JMeter** (3 variantes × 4 scénarios × 3 formats: CSV + HTML + logs)
- **36 screenshots Grafana** (3 variantes × 4 scénarios × 3 timestamps)
- **Tableaux Excel complets** (T0-T7 avec données des 3 variantes)
- **Base pour analyse comparative**

---

## 🎯 Ordre de Travail Recommandé

### Phase 1: Setup (30 minutes)
1. Vérifier code existant Variante C
2. Corriger `application.properties` si nécessaire
3. Tester compilation Maven
4. Lancer et vérifier endpoints

### Phase 2: Benchmark Variante C (3 heures)
1. Exécuter 4 scénarios JMeter (~2h30)
2. Capturer 12 screenshots (~20min)
3. Remplir tableaux Excel C (~10min)

### Phase 3: Setup Variante D (45 minutes)
1. Vérifier code + config
2. Décider adaptation endpoints
3. Tester application

### Phase 4: Benchmark Variante D (3 heures)
1. Adapter scénarios JMeter si nécessaire (~15min)
2. Exécuter 4 scénarios (~2h30)
3. Capturer screenshots (~20min)
4. Remplir tableaux (~10min)

### Phase 5: Analyse Finale (2 heures)
1. Compléter tableau T7 (synthèse)
2. Rédiger rapport final
3. Formuler recommandations

**Total estimé:** 9-10 heures

---

## 💡 Astuces

### Gagner du Temps
- Préparer les 3 applications avant de commencer les benchmarks
- Lancer Docker infrastructure une seule fois
- Utiliser des alias PowerShell pour commandes JMeter
- Automatiser capture screenshots avec outil (ex: Greenshot)

### Éviter les Erreurs
- **Ne pas oublier** de changer `-Dvariant=` dans commandes JMeter
- Vérifier port metrics dans `prometheus.yml` correspond à `application.properties`
- Attendre 30s de stabilisation après démarrage application
- Vérifier espace disque (rapports JMeter = ~50MB chacun)

### Optimiser la Qualité
- Noter incidents en temps réel dans tableau T6
- Prendre notes d'observations pendant benchmarks
- Comparer résultats au fur et à mesure
- Relancer un test si résultats aberrants

---

## 📞 En Cas de Problème

### Variante C ne démarre pas
1. Vérifier PostgreSQL actif: `docker ps`
2. Vérifier port 8082 libre: `netstat -ano | Select-String ":8082"`
3. Lire logs IntelliJ console
4. Vérifier `application.properties` (surtout datasource)

### Variante D - Endpoints différents
- Lire documentation Spring Data REST: https://spring.io/guides/gs/accessing-data-rest/
- Utiliser `/profile` endpoint pour voir structure: `curl http://localhost:8083/profile/items`
- Créer custom controller si nécessaire

### JMeter erreurs 404/500
- Vérifier logs application
- Tester endpoint manuellement avec curl
- Vérifier format JSON dans payloads CSV
- Réduire charge (threads) pour déboguer

---

**Bon courage! 🚀**

*Une fois les 3 variantes benchmarkées, vous aurez un rapport complet et des conclusions solides pour votre TP.*
