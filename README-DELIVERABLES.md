# 🎯 DELIVERABLES - Variante A (Jersey + JPA)

Ce document liste tous les livrables créés pour le benchmark de la Variante A et les fichiers communs aux 3 variantes.

## ✅ État d'Avancement

- ✅ **Variante A (Jersey):** Code fonctionnel, testé, API opérationnelle
- ⏳ **Variante C (Spring MVC):** Code existant, non testé
- ⏳ **Variante D (Spring Data REST):** Code existant, non testé
- ✅ **Infrastructure:** PostgreSQL, Prometheus, Grafana, InfluxDB opérationnels
- ✅ **Scénarios JMeter:** 4 fichiers .jmx créés et configurés
- ✅ **Documentation:** Guides d'exécution, tableaux, rapport template

---

## 📁 Structure des Livrables

```
PROJET LACHGAR/
├── 📄 README-DELIVERABLES.md          ← CE FICHIER
├── 📄 GUIDE-EXECUTION.md              ← Guide pas-à-pas pour exécuter les benchmarks
├── 📄 GUIDE-TABLEAUX-EXCEL.md         ← Instructions pour créer tableaux.xlsx
├── 📄 RAPPORT-TEMPLATE.md             ← Template du rapport final
├── 📄 generate-csv-data.ps1           ← Script d'extraction des données CSV
│
├── 📂 scenarios/                      ← Scénarios de test JMeter
│   ├── 01-read-heavy.jmx             ← 50→200 threads, lecture intensive
│   ├── 02-join-filter.jmx            ← 60→120 threads, requêtes JOIN
│   ├── 03-mixed.jmx                  ← 50→100 threads, CRUD mixte
│   └── 04-heavy-body.jmx             ← 30→60 threads, payloads 5KB
│
├── 📂 data/                          ← Données CSV pour JMeter (à générer)
│   ├── categories.csv                ← 2000 IDs de catégories
│   ├── items.csv                     ← 100,000 IDs d'items
│   ├── payloads-light.csv            ← 1000 payloads ~0.8KB
│   └── payloads-heavy.csv            ← 500 payloads ~5KB
│
├── 📂 results/                       ← Résultats JMeter CSV (générés lors des tests)
├── 📂 reports/                       ← Rapports JMeter HTML (générés lors des tests)
│
├── 📂 docker/
│   ├── docker-compose.yml            ← Infrastructure complète
│   ├── 📂 prometheus/
│   │   └── prometheus.yml            ← Configuration scraping 3 variantes
│   └── 📂 grafana/
│       └── 📂 dashboards/
│           ├── dashboard-jvm.json         ← Métriques JVM détaillées
│           └── dashboard-comparison.json  ← Comparaison des 3 variantes
│
├── 📂 sql/
│   ├── 01-schema.sql                 ← Schéma + 2000 catégories + 100,000 items
│   └── 02-data.sql                   ← Données additionnelles
│
└── 📂 variante-a-jersey/             ← Code source Variante A (FONCTIONNEL ✅)
    ├── pom.xml                       ← Dépendances Maven
    └── 📂 src/main/java/com/benchmark/jersey/
        ├── Main.java                 ← Point d'entrée, serveur Grizzly
        ├── 📂 entity/
        │   ├── Category.java         ← Entité JPA Category
        │   └── Item.java             ← Entité JPA Item
        └── 📂 resource/
            ├── CategoryResource.java ← REST endpoints /categories
            └── ItemResource.java     ← REST endpoints /items
```

---

## 📋 Checklist des Livrables

### 🟢 Livrables Complétés

#### Configuration & Infrastructure
- [x] **docker-compose.yml** - Orchestration complète (Postgres, Prometheus, Grafana, InfluxDB)
- [x] **prometheus.yml** - Configuration scraping pour les 3 variantes
- [x] **01-schema.sql** - Base de données avec 2000 catégories + 100,000 items
- [x] **dashboard-jvm.json** - Dashboard Grafana métriques JVM (9 panels)
- [x] **dashboard-comparison.json** - Dashboard comparaison 3 variantes (6 panels)

#### Code Application Variante A
- [x] **Main.java** - Serveur Grizzly + EntityManagerFactory + Metrics HTTPServer
- [x] **CategoryResource.java** - REST API complète categories (GET, POST, PUT, DELETE)
- [x] **ItemResource.java** - REST API complète items (GET, POST, PUT, DELETE)
- [x] **Category.java** - Entité JPA avec @JsonIgnore sur items
- [x] **Item.java** - Entité JPA avec FetchType.EAGER sur category
- [x] **pom.xml** - Dépendances Jersey 3.1.3, Hibernate 6.2.7, Prometheus

#### Scénarios de Test
- [x] **01-read-heavy.jmx** - Scénario lecture intensive (4 endpoints, 200 threads max)
- [x] **02-join-filter.jmx** - Scénario JOIN/filtrage (2 endpoints, 120 threads max)
- [x] **03-mixed.jmx** - Scénario CRUD mixte (6 opérations, 100 threads max)
- [x] **04-heavy-body.jmx** - Scénario payloads lourds (POST/PUT 5KB, 60 threads max)

#### Scripts & Outils
- [x] **generate-csv-data.ps1** - Script extraction PostgreSQL + génération payloads JSON
- [x] **GUIDE-EXECUTION.md** - Guide complet d'exécution des 12 benchmarks (200+ lignes)
- [x] **GUIDE-TABLEAUX-EXCEL.md** - Instructions création tableaux T0-T7 avec structure Excel
- [x] **RAPPORT-TEMPLATE.md** - Template rapport final avec sections pré-remplies

### 🟡 Livrables à Générer par l'Utilisateur

#### Données de Test
- [ ] **data/categories.csv** - À générer avec `generate-csv-data.ps1`
- [ ] **data/items.csv** - À générer avec `generate-csv-data.ps1`
- [ ] **data/payloads-light.csv** - À générer avec `generate-csv-data.ps1`
- [ ] **data/payloads-heavy.csv** - À générer avec `generate-csv-data.ps1`

#### Résultats & Analyse
- [ ] **tableaux.xlsx** - À créer manuellement selon GUIDE-TABLEAUX-EXCEL.md (8 feuilles)
- [ ] **screenshots/** - 36 captures Grafana (3 variantes × 4 scénarios × 3 timestamps)
- [ ] **results/*.csv** - Générés automatiquement par JMeter lors des tests
- [ ] **reports/*/** - Rapports HTML générés par JMeter (-e -o)
- [ ] **RAPPORT-FINAL.md** - À rédiger en remplissant RAPPORT-TEMPLATE.md

---

## 🚀 Procédure d'Utilisation

### Étape 1: Préparer les Données CSV
```powershell
# Vérifier que PostgreSQL tourne
docker ps | Select-String "benchmark-postgres"

# Générer les fichiers CSV
.\generate-csv-data.ps1
```

**Résultat attendu:**
```
✅ Catégories extraites: 2000 lignes
✅ Items extraits: 100000 lignes
✅ Payloads légers générés: 1000 échantillons
✅ Payloads lourds générés: 500 échantillons
```

### Étape 2: Créer le Fichier Excel
Suivre les instructions dans **GUIDE-TABLEAUX-EXCEL.md** pour créer `tableaux.xlsx` avec 8 feuilles:
- T0: Configuration matérielle
- T1: Définition des scénarios (pré-rempli)
- T2: Résultats JMeter (à remplir)
- T3: Ressources JVM (à remplir)
- T4: Détail JOIN Filter (à remplir)
- T5: Détail MIXED (à remplir)
- T6: Journal incidents (à remplir si nécessaire)
- T7: Synthèse (à remplir en fin d'analyse)

### Étape 3: Exécuter les Benchmarks
Suivre **GUIDE-EXECUTION.md** pour:
1. Lancer Variante A
2. Exécuter 4 scénarios JMeter
3. Capturer 3 screenshots Grafana par scénario
4. Répéter pour Variantes C et D

**Durée totale:** 6-8 heures (5h45 benchmarks + 1-2h analyse)

### Étape 4: Analyser et Rapporter
1. Remplir `tableaux.xlsx` avec les données des rapports JMeter et screenshots
2. Dupliquer `RAPPORT-TEMPLATE.md` → `RAPPORT-FINAL.md`
3. Compléter les sections d'analyse et recommandations
4. Ajouter les screenshots en annexe

---

## 📊 Sources de Données pour Remplissage

### Pour Tableau T2 (Résultats JMeter)
**Fichier:** `reports/variante-X-scenario/index.html`  
**Section:** Statistics  
**Colonnes à extraire:**
- RPS Moyen → "#/sec" column
- P50, P95, P99 → "90th pct", "95th pct", "99th pct"
- Erreurs → "Error %" column
- Débit → "KB/sec" column

### Pour Tableau T3 (Ressources JVM)
**Source:** Screenshots Grafana à T+15min (pic de charge)  
**Dashboards:** dashboard-jvm.json ou dashboard-comparison.json  
**Métriques:**
- CPU → Panel "CPU Usage"
- Heap Used → Panel "Heap Memory Usage" (ligne bleue)
- GC Count → Panel "GC Collections per Second" (intégrer sur durée)
- Threads → Panel "Thread Count"

### Pour Tableaux T4 et T5 (Détail Endpoints)
**Fichier:** `reports/variante-X-scenario/index.html`  
**Section:** Request Statistics (regroupé par sampler name)  
**Filtrer par:** Nom du sampler (ex: "GET /items?categoryId")

---

## 🔧 Commandes Utiles

### Vérifier l'État des Services
```powershell
# Docker
docker ps

# Application Variante A
curl http://localhost:8048/categories?page=0&size=5

# Métriques Variante A
curl http://localhost:9091/metrics

# Prometheus
# http://localhost:9090/targets

# Grafana
# http://localhost:3000 (admin/admin)
```

### Exécuter un Scénario JMeter (Exemple)
```powershell
# READ Heavy - Variante A
jmeter -n -t scenarios/01-read-heavy.jmx `
  -DbaseUrl=localhost:8048 `
  -Dvariant=a `
  -l results/variante-a-read-heavy.csv `
  -e -o reports/variante-a-read-heavy
```

### Nettoyer les Résultats
```powershell
# Supprimer résultats précédents
Remove-Item -Recurse -Force results/*
Remove-Item -Recurse -Force reports/*
```

---

## 📈 Métriques Clés à Surveiller

### Performance (Objectifs Indicatifs)
- **RPS:** > 500 req/s (scénario READ Heavy)
- **P95 Latence:** < 100ms (scénarios READ)
- **P95 Latence:** < 200ms (scénarios WRITE)
- **Taux d'erreurs:** < 1%

### Ressources
- **Heap Usage:** < 70% de heap max
- **CPU:** < 80% sustained
- **GC Pause:** < 50ms P95
- **Threads:** Stable (pas de fuite)

---

## 🎓 Apprentissages Attendus

### Compétences Techniques
- ✅ Développement API REST avec Jersey JAX-RS
- ✅ Configuration Hibernate/JPA (fetch strategies, lazy loading)
- ✅ Monitoring avec Prometheus + Grafana
- ✅ Load testing avec Apache JMeter
- ✅ Analyse de métriques JVM (heap, GC, threads)
- ✅ Docker Compose pour infrastructure

### Compétences Analytiques
- ✅ Méthodologie de benchmark reproductible
- ✅ Interprétation de métriques de performance
- ✅ Analyse comparative multi-critères
- ✅ Rédaction de recommandations techniques

---

## 🐛 Troubleshooting

### Problème: "Cannot connect to PostgreSQL"
**Solution:** 
```powershell
docker-compose -f docker/docker-compose.yml up -d postgres
docker logs benchmark-postgres
```

### Problème: "JMeter - Connection refused"
**Solution:** Vérifier que l'application tourne sur le bon port
```powershell
netstat -ano | Select-String ":8048"
```

### Problème: "Prometheus - No data in Grafana"
**Solution:** Vérifier targets Prometheus
- http://localhost:9090/targets
- État doit être "UP" (vert)
- Redémarrer prometheus si config changée: `docker-compose restart prometheus`

### Problème: "JMeter - File not found: data/items.csv"
**Solution:** Exécuter `generate-csv-data.ps1` d'abord

---

## 📞 Support

**Documentation:**
- [Jersey Guide](https://eclipse-ee4j.github.io/jersey/)
- [JMeter Manual](https://jmeter.apache.org/usermanual/)
- [Prometheus Query](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [Grafana Dashboards](https://grafana.com/docs/grafana/latest/dashboards/)

**Fichiers de Référence:**
- Architecture: `GUIDE-EXECUTION.md`
- Tableaux: `GUIDE-TABLEAUX-EXCEL.md`
- Rapport: `RAPPORT-TEMPLATE.md`

---

## ✨ Prochaines Étapes

### Pour Variante A (Jersey) - Complété
- [x] Code fonctionnel et testé
- [x] Scénarios JMeter configurés
- [x] Documentation complète
- [ ] **TODO USER:** Exécuter 4 benchmarks
- [ ] **TODO USER:** Remplir tableaux Excel
- [ ] **TODO USER:** Analyser résultats

### Pour Variante C (Spring MVC) - À Faire
- [ ] Vérifier et tester le code existant
- [ ] Configurer Prometheus metrics (port 9092)
- [ ] Adapter scénarios JMeter (baseUrl=localhost:8082)
- [ ] Exécuter 4 benchmarks
- [ ] Comparer avec Variante A

### Pour Variante D (Spring Data REST) - À Faire
- [ ] Vérifier et tester le code existant
- [ ] Configurer Prometheus metrics (port 9093)
- [ ] Adapter scénarios JMeter (baseUrl=localhost:8083)
- [ ] Exécuter 4 benchmarks
- [ ] Comparer avec Variantes A et C

### Analyse Finale
- [ ] Consolider tableaux T0-T7
- [ ] Rédiger rapport final (RAPPORT-FINAL.md)
- [ ] Identifier le vainqueur par scénario
- [ ] Formuler recommandations
- [ ] Présenter résultats

---

**📅 Date de création des livrables:** 2025-11-07  
**🏷️ Version:** 1.0  
**👨‍💻 Créé par:** GitHub Copilot Assistant

**🎯 Objectif:** Fournir un kit complet pour exécuter et analyser les benchmarks en minimisant le travail manuel.

---

*Bon benchmark! 🚀*
