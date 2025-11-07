# Guide d'Exécution des Benchmarks - TP REST

## 📋 Prérequis

✅ Docker Desktop en cours d'exécution
✅ PostgreSQL avec données chargées (2000 catégories, 100000 items)
✅ Prometheus, Grafana, InfluxDB démarrés
✅ JMeter installé (Apache JMeter 5.6 ou supérieur)

---

## 🎯 Workflow d'Exécution

### Pour chaque variante (A, C, D), exécuter les 4 scénarios:

```
VARIANTE A → Scénario 1 → Scénario 2 → Scénario 3 → Scénario 4
  ↓ (arrêter, attendre 2 min)
VARIANTE C → Scénario 1 → Scénario 2 → Scénario 3 → Scénario 4
  ↓ (arrêter, attendre 2 min)
VARIANTE D → Scénario 1 → Scénario 2 → Scénario 3 → Scénario 4
```

**Total: 12 exécutions** (3 variantes × 4 scénarios)

---

## 📊 VARIANTE A - Jersey + JPA

### Étape 1: Lancer l'application

**Dans IntelliJ:**
1. Ouvrez `variante-a-jersey/src/main/java/com/benchmark/jersey/Main.java`
2. Clic droit → Run 'Main.main()'
3. Attendez: `[HttpServer] Started.`

**Vérifications:**
```powershell
# Port API
curl http://localhost:8048/categories?page=0&size=10

# Port métriques
curl http://localhost:9091/metrics

# Prometheus targets
# Ouvrir: http://localhost:9090/targets
# Vérifier: variante-a-jersey = UP (vert)
```

### Étape 2: Lancer JMeter - Scénario 1 (READ-heavy)

```powershell
cd jmeter
jmeter -n -t scenarios/01-read-heavy.jmx -l results/variante-a-read-heavy.csv -e -o reports/variante-a-read-heavy
```

**Pendant l'exécution (30 min):**
1. Ouvrez Grafana: http://localhost:3000
2. Dashboard: "Benchmark - Variante A"
3. **Prenez 3 screenshots:**
   - T+5 min (montée en charge)
   - T+15 min (pic)
   - T+28 min (fin)

**À la fin:**
1. Notez dans `resultats/tableaux.xlsx`:
   - RPS moyen
   - p50, p95, p99 (dans le rapport JMeter HTML)
   - Taux d'erreurs
2. Dans Grafana, notez:
   - CPU moy/pic
   - Heap moy/pic
   - GC time moy/pic
   - Threads actifs

### Étape 3: Lancer JMeter - Scénario 2 (JOIN-filter)

```powershell
jmeter -n -t scenarios/02-join-filter.jmx -l results/variante-a-join-filter.csv -e -o reports/variante-a-join-filter
```

Répétez les screenshots et notations.

### Étape 4: Lancer JMeter - Scénario 3 (MIXED)

```powershell
jmeter -n -t scenarios/03-mixed.jmx -l results/variante-a-mixed.csv -e -o reports/variante-a-mixed
```

### Étape 5: Lancer JMeter - Scénario 4 (HEAVY-body)

```powershell
jmeter -n -t scenarios/04-heavy-body.jmx -l results/variante-a-heavy-body.csv -e -o reports/variante-a-heavy-body
```

### Étape 6: Arrêter Variante A

**Dans IntelliJ:** Cliquez sur Stop (carré rouge)

**Attendre 2 minutes** (cooldown)

---

## 📊 VARIANTE C - Spring MVC

### Étape 1: Lancer l'application

**Dans IntelliJ:**
1. Ouvrez `variante-c-spring-mvc/src/main/java/com/benchmark/springmvc/Application.java`
2. Clic droit → Run 'Application.main()'
3. Attendez: `Started Application in X seconds`

**Vérifications:**
```powershell
curl http://localhost:8082/categories?page=0&size=10
curl http://localhost:9092/actuator/prometheus
```

### Étape 2-5: Répéter les 4 scénarios JMeter

Changez juste le port dans les commandes:
- Variante A utilisait: `localhost:8048`
- Variante C utilise: `localhost:8082`

**Les fichiers JMeter sont déjà configurés** pour détecter automatiquement la variante.

```powershell
jmeter -n -t scenarios/01-read-heavy.jmx -Dvariant=c -l results/variante-c-read-heavy.csv -e -o reports/variante-c-read-heavy
jmeter -n -t scenarios/02-join-filter.jmx -Dvariant=c -l results/variante-c-join-filter.csv -e -o reports/variante-c-join-filter
jmeter -n -t scenarios/03-mixed.jmx -Dvariant=c -l results/variante-c-mixed.csv -e -o reports/variante-c-mixed
jmeter -n -t scenarios/04-heavy-body.jmx -Dvariant=c -l results/variante-c-heavy-body.csv -e -o reports/variante-c-heavy-body
```

---

## 📊 VARIANTE D - Spring Data REST

### Étape 1: Lancer l'application

**Dans IntelliJ:**
1. Ouvrez `variante-d-spring-data-rest/src/main/java/com/benchmark/springdatarest/Application.java`
2. Clic droit → Run 'Application.main()'
3. Attendez: `Started Application in X seconds`

**Vérifications:**
```powershell
curl http://localhost:8083/categories?page=0&size=10
curl http://localhost:9093/actuator/prometheus
```

### Étape 2-5: Répéter les 4 scénarios JMeter

```powershell
jmeter -n -t scenarios/01-read-heavy.jmx -Dvariant=d -l results/variante-d-read-heavy.csv -e -o reports/variante-d-read-heavy
jmeter -n -t scenarios/02-join-filter.jmx -Dvariant=d -l results/variante-d-join-filter.csv -e -o reports/variante-d-join-filter
jmeter -n -t scenarios/03-mixed.jmx -Dvariant=d -l results/variante-d-mixed.csv -e -o reports/variante-d-mixed
jmeter -n -t scenarios/04-heavy-body.jmx -Dvariant=d -l results/variante-d-heavy-body.csv -e -o reports/variante-d-heavy-body
```

---

## 📈 Résultats attendus

Après les 12 exécutions, vous aurez:

### Fichiers générés:
```
jmeter/results/
  ├── variante-a-read-heavy.csv
  ├── variante-a-join-filter.csv
  ├── variante-a-mixed.csv
  ├── variante-a-heavy-body.csv
  ├── variante-c-read-heavy.csv
  ├── ... (12 fichiers CSV au total)
  
jmeter/reports/
  ├── variante-a-read-heavy/
  │   └── index.html (rapport détaillé)
  ├── ... (12 dossiers de rapports HTML)

screenshots/
  ├── variante-a-read-heavy-t5.png
  ├── variante-a-read-heavy-t15.png
  ├── ... (36 screenshots minimum)
```

### Tableaux remplis:
- `resultats/tableaux.xlsx` avec toutes les métriques

---

## ⏱️ Timing estimé

| Activité | Durée par variante | Total |
|----------|-------------------|-------|
| Scénario 1 (READ-heavy) | 30 min | 1h30 |
| Scénario 2 (JOIN-filter) | 25 min | 1h15 |
| Scénario 3 (MIXED) | 30 min | 1h30 |
| Scénario 4 (HEAVY-body) | 25 min | 1h15 |
| Cooldown entre variantes | 2 min × 2 | 4 min |
| **TOTAL** | | **~5h45** |

**+ 1-2h pour remplir les tableaux et analyser** = **6-8h au total**

---

## 🎯 Checklist par variante

```
VARIANTE A:
☐ App lancée et vérifiée
☐ Scénario 1 exécuté + screenshots + données notées
☐ Scénario 2 exécuté + screenshots + données notées
☐ Scénario 3 exécuté + screenshots + données notées
☐ Scénario 4 exécuté + screenshots + données notées
☐ App arrêtée + cooldown

VARIANTE C:
☐ App lancée et vérifiée
☐ Scénario 1 exécuté + screenshots + données notées
☐ Scénario 2 exécuté + screenshots + données notées
☐ Scénario 3 exécuté + screenshots + données notées
☐ Scénario 4 exécuté + screenshots + données notées
☐ App arrêtée + cooldown

VARIANTE D:
☐ App lancée et vérifiée
☐ Scénario 1 exécuté + screenshots + données notées
☐ Scénario 2 exécuté + screenshots + données notées
☐ Scénario 3 exécuté + screenshots + données notées
☐ Scénario 4 exécuté + screenshots + données notées
☐ App arrêtée

FINALISATION:
☐ Tous les tableaux remplis
☐ Analyse rédigée
☐ Rapport compilé
☐ ZIP créé avec tous les livrables
```

---

## 🆘 Troubleshooting

### Problème: JMeter retourne beaucoup d'erreurs 500

**Solution:** Vérifiez que l'app est bien démarrée et que PostgreSQL tourne:
```powershell
docker ps | findstr postgres
curl http://localhost:8048/categories  # (ou 8082, 8083)
```

### Problème: Grafana ne montre pas de données

**Solution:** 
1. Vérifiez Prometheus targets: http://localhost:9090/targets
2. Redémarrez Prometheus: `docker-compose restart prometheus`
3. Attendez 30 secondes

### Problème: JMeter est lent / freeze

**Solution:** Augmentez la heap JMeter:
```powershell
set JVM_ARGS=-Xms512m -Xmx2048m
jmeter -n -t ...
```

---

## 📞 Support

En cas de blocage, vérifiez dans l'ordre:
1. Docker containers actifs: `docker ps`
2. Applications Java actives: `netstat -ano | findstr "8048 8082 8083"`
3. Prometheus targets UP: http://localhost:9090/targets
4. Grafana accessible: http://localhost:3000
5. Logs JMeter dans `jmeter/logs/`

---

**Bon courage pour les benchmarks ! 🚀**
