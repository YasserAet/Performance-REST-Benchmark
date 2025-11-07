# GUIDE: Création du fichier tableaux.xlsx

Ce guide détaille la création du fichier Excel contenant les 8 tableaux (T0 à T7) pour le rapport de benchmark.

## 📊 Structure du fichier Excel

Le fichier doit contenir **8 feuilles** nommées: T0, T1, T2, T3, T4, T5, T6, T7

---

## T0 - Configuration Matérielle & Logicielle

**Colonnes:** Composant | Spécification

| Composant | Spécification |
|-----------|---------------|
| **Matériel** | |
| Processeur | [À compléter: ex. Intel Core i7-12700H @ 2.3GHz, 14 cores] |
| RAM | [À compléter: ex. 16 GB DDR4] |
| Disque | [À compléter: ex. SSD NVMe 512GB] |
| **Logiciel** | |
| OS | [À compléter: ex. Windows 11 Pro 22H2] |
| JDK | Microsoft OpenJDK 17.0.16+8-LTS |
| PostgreSQL | 14-alpine (Docker) |
| Docker Desktop | [À compléter: version] |
| JMeter | [À compléter: ex. 5.6.3] |
| **Base de données** | |
| Catégories | 2,000 |
| Items | 100,000 |
| Pool de connexions | HikariCP (min=5, max=20) |

---

## T1 - Définition des Scénarios

**Colonnes:** Scénario | Description | Threads | Ramp-up | Durée | Opérations

| Scénario | Description | Threads | Ramp-up (s) | Durée (min) | Opérations |
|----------|-------------|---------|-------------|-------------|------------|
| 01 - READ Heavy | Lecture intensive | 50→200 | 300 | 30 | 50% GET items, 20% GET items+cat, 20% GET cat/items, 10% GET categories |
| 02 - JOIN Filter | Requêtes JOIN | 60→120 | 300 | 30 | 70% GET items by category, 30% GET item by ID |
| 03 - MIXED | Opérations mixtes | 50→100 | 300 | 30 | 40% GET, 20% POST, 10% PUT, 10% DELETE (items+categories) |
| 04 - HEAVY Body | Corps lourds | 30→60 | 300 | 30 | 50% POST 5KB, 50% PUT 5KB |

---

## T2 - Résultats JMeter (Performance Globale)

**Colonnes:** Variante | Scénario | RPS Moyen | P50 (ms) | P95 (ms) | P99 (ms) | Erreurs (%) | Débit (KB/s)

### Variante A - Jersey + JPA
| Variante | Scénario | RPS Moyen | P50 (ms) | P95 (ms) | P99 (ms) | Erreurs (%) | Débit (KB/s) |
|----------|----------|-----------|----------|----------|----------|-------------|--------------|
| A | READ Heavy | | | | | | |
| A | JOIN Filter | | | | | | |
| A | MIXED | | | | | | |
| A | HEAVY Body | | | | | | |

### Variante C - Spring MVC + JPA
| Variante | Scénario | RPS Moyen | P50 (ms) | P95 (ms) | P99 (ms) | Erreurs (%) | Débit (KB/s) |
|----------|----------|-----------|----------|----------|----------|-------------|--------------|
| C | READ Heavy | | | | | | |
| C | JOIN Filter | | | | | | |
| C | MIXED | | | | | | |
| C | HEAVY Body | | | | | | |

### Variante D - Spring Data REST
| Variante | Scénario | RPS Moyen | P50 (ms) | P95 (ms) | P99 (ms) | Erreurs (%) | Débit (KB/s) |
|----------|----------|-----------|----------|----------|----------|-------------|--------------|
| D | READ Heavy | | | | | | |
| D | JOIN Filter | | | | | | |
| D | MIXED | | | | | | |
| D | HEAVY Body | | | | | | |

**Source des données:** Rapports JMeter HTML (reports/*/index.html → Statistics)

---

## T3 - Ressources JVM (Pics observés)

**Colonnes:** Variante | Scénario | CPU (%) | Heap Used (MB) | Heap Max (MB) | GC Count | GC Time (ms) | Threads

### Variante A - Jersey + JPA
| Variante | Scénario | CPU (%) | Heap Used (MB) | Heap Max (MB) | GC Count | GC Time (ms) | Threads |
|----------|----------|---------|----------------|--------------|----------|--------------|---------|
| A | READ Heavy | | | | | | |
| A | JOIN Filter | | | | | | |
| A | MIXED | | | | | | |
| A | HEAVY Body | | | | | | |

### Variante C - Spring MVC + JPA
| Variante | Scénario | CPU (%) | Heap Used (MB) | Heap Max (MB) | GC Count | GC Time (ms) | Threads |
|----------|----------|---------|----------------|--------------|----------|--------------|---------|
| C | READ Heavy | | | | | | |
| C | JOIN Filter | | | | | | |
| C | MIXED | | | | | | |
| C | HEAVY Body | | | | | | |

### Variante D - Spring Data REST
| Variante | Scénario | CPU (%) | Heap Used (MB) | Heap Max (MB) | GC Count | GC Time (ms) | Threads |
|----------|----------|---------|----------------|--------------|----------|--------------|---------|
| D | READ Heavy | | | | | | |
| D | JOIN Filter | | | | | | |
| D | HEAVY Body | | | | | | |

**Source des données:** 
- Prometheus queries à T+15min (pic): `process_cpu_usage`, `jvm_memory_used_bytes`, `jvm_gc_pause_seconds_count`, `jvm_threads_current`
- Screenshots Grafana

---

## T4 - Détail par Endpoint (Scénario JOIN Filter)

**Colonnes:** Variante | Endpoint | Requêtes Totales | P50 (ms) | P95 (ms) | P99 (ms) | Erreurs | Débit (KB/s)

| Variante | Endpoint | Requêtes Totales | P50 (ms) | P95 (ms) | P99 (ms) | Erreurs | Débit (KB/s) |
|----------|----------|------------------|----------|----------|----------|---------|--------------|
| A | GET /items?categoryId | | | | | | |
| A | GET /items/{id} | | | | | | |
| C | GET /items?categoryId | | | | | | |
| C | GET /items/{id} | | | | | | |
| D | GET /items?categoryId | | | | | | |
| D | GET /items/{id} | | | | | | |

**Source:** JMeter HTML report → Request Statistics (filtrer par sampler)

---

## T5 - Détail par Endpoint (Scénario MIXED)

**Colonnes:** Variante | Endpoint | Méthode | Requêtes Totales | P50 (ms) | P95 (ms) | Erreurs

| Variante | Endpoint | Méthode | Requêtes Totales | P50 (ms) | P95 (ms) | Erreurs |
|----------|----------|---------|------------------|----------|----------|---------|
| A | /items | GET | | | | |
| A | /items | POST | | | | |
| A | /items/{id} | PUT | | | | |
| A | /items/{id} | DELETE | | | | |
| A | /categories | GET | | | | |
| A | /categories | POST | | | | |
| C | /items | GET | | | | |
| C | /items | POST | | | | |
| C | /items/{id} | PUT | | | | |
| C | /items/{id} | DELETE | | | | |
| C | /categories | GET | | | | |
| C | /categories | POST | | | | |
| D | /items | GET | | | | |
| D | /items | POST | | | | |
| D | /items/{id} | PUT | | | | |
| D | /items/{id} | DELETE | | | | |
| D | /categories | GET | | | | |
| D | /categories | POST | | | | |

---

## T6 - Journal des Incidents

**Colonnes:** Timestamp | Variante | Scénario | Type | Description | Impact | Résolution

| Timestamp | Variante | Scénario | Type | Description | Impact | Résolution |
|-----------|----------|----------|------|-------------|--------|------------|
| [vide au départ - remplir si incidents] | | | | | | |

**Types possibles:** ERROR, WARNING, TIMEOUT, OOM, CONNECTION_POOL

**Exemple:**
```
2025-11-07 14:23:15 | A | HEAVY Body | WARNING | Heap usage > 85% | Ralentissement | GC automatique
```

---

## T7 - Synthèse et Recommandations

**Colonnes:** Critère | Variante A | Variante C | Variante D | Meilleure | Notes

| Critère | Variante A (Jersey) | Variante C (Spring MVC) | Variante D (Spring Data REST) | Meilleure | Notes |
|---------|---------------------|-------------------------|-------------------------------|-----------|-------|
| **Performance READ** | | | | | RPS + latence P95 scénario 01 |
| **Performance JOIN** | | | | | Latence P95 scénario 02 |
| **Performance WRITE** | | | | | Latence POST/PUT scénario 03 |
| **Consommation RAM** | | | | | Heap peak moyen |
| **Utilisation CPU** | | | | | CPU% peak moyen |
| **Efficacité GC** | | | | | GC count + GC time |
| **Stabilité** | | | | | Taux d'erreurs |
| **Débit** | | | | | KB/s moyen |
| **Complexité Code** | Moyenne | Faible | Très Faible | | Subjectif |
| **Productivité Dev** | Moyenne | Élevée | Très Élevée | | Subjectif |

**Recommandations (à remplir après analyse):**
- Cas d'usage 1: [Quelle variante pour quel scénario]
- Cas d'usage 2: [...]
- Limitations identifiées: [...]

---

## 📝 Instructions de création

1. **Créer le fichier Excel:**
   - Ouvrez Excel
   - Créez 8 feuilles: T0, T1, T2, T3, T4, T5, T6, T7

2. **Copier les tableaux:**
   - Pour chaque feuille, copiez la structure du tableau correspondant
   - Appliquez un formatage conditionnel pour les valeurs critiques
   - Ajoutez des bordures et couleurs (en-têtes en bleu)

3. **Formules utiles:**
   - T7: Utilisez `=MIN(B2:D2)` pour identifier automatiquement la meilleure variante
   - T2/T3: Formules de moyenne si plusieurs mesures

4. **Mise en forme:**
   - Police: Calibri 11pt
   - En-têtes: Gras, fond bleu clair
   - Nombres: Format avec séparateurs de milliers
   - Pourcentages: Format % avec 2 décimales
   - Latences: Format nombre entier (ms)

5. **Validation:**
   - Vérifiez que toutes les colonnes sont présentes
   - Ajoutez des listes déroulantes pour T6 (Type)
   - Protégez les en-têtes contre modifications

---

## 🎯 Remplissage lors des benchmarks

**Ordre de remplissage:**
1. **T0** - Compléter au début (config matérielle)
2. **T1** - Déjà rempli (définitions)
3. **T2, T4, T5** - Après chaque test JMeter (depuis rapports HTML)
4. **T3** - Pendant les tests (depuis Grafana screenshots)
5. **T6** - Au fil de l'eau (incidents observés)
6. **T7** - À la fin (synthèse et analyse)

**Fichier final:** Sauvegarder sous `tableaux.xlsx` à la racine du projet
