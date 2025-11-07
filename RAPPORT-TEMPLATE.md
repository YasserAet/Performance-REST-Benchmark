# Rapport de Benchmark: Comparaison des Technologies REST API

**Projet:** Benchmark Jersey JAX-RS vs Spring MVC vs Spring Data REST  
**Date:** [À compléter]  
**Auteur:** [Votre nom]  
**Établissement:** [À compléter]

---

## Table des Matières

1. [Introduction](#1-introduction)
2. [Architecture et Technologies](#2-architecture-et-technologies)
3. [Méthodologie](#3-méthodologie)
4. [Résultats](#4-résultats)
5. [Analyse Comparative](#5-analyse-comparative)
6. [Recommandations](#6-recommandations)
7. [Conclusion](#7-conclusion)
8. [Annexes](#8-annexes)

---

## 1. Introduction

### 1.1 Contexte
[Expliquer le contexte du projet, pourquoi comparer ces technologies]

### 1.2 Objectifs
Les objectifs de ce benchmark sont de:
- Comparer les performances de 3 approches de développement d'API REST en Java
- Mesurer la consommation de ressources (CPU, mémoire)
- Identifier les forces et faiblesses de chaque technologie
- Fournir des recommandations pour le choix technologique selon les cas d'usage

### 1.3 Périmètre
- **Variante A:** Jersey 3.1.3 + JPA/Hibernate (JAX-RS pure)
- **Variante C:** Spring Boot 3.x + Spring MVC + JPA
- **Variante D:** Spring Boot 3.x + Spring Data REST
- **Base de données:** PostgreSQL 14 avec 2,000 catégories et 100,000 items
- **Scénarios:** 4 profils de charge (READ-heavy, JOIN-filter, MIXED, HEAVY-body)

---

## 2. Architecture et Technologies

### 2.1 Architecture Générale

```
┌─────────────┐      ┌─────────────────┐      ┌──────────────┐
│   JMeter    │─────>│  Application    │─────>│  PostgreSQL  │
│ (Load Test) │      │   (Variants)    │      │   Database   │
└─────────────┘      └─────────────────┘      └──────────────┘
                             │
                             ↓
                     ┌───────────────┐
                     │  Prometheus   │
                     │   (Metrics)   │
                     └───────────────┘
                             │
                             ↓
                     ┌───────────────┐
                     │    Grafana    │
                     │ (Dashboards)  │
                     └───────────────┘
```

### 2.2 Configuration Matérielle et Logicielle
[Reprendre les données du tableau T0]

| Composant | Spécification |
|-----------|---------------|
| Processeur | [Depuis T0] |
| RAM | [Depuis T0] |
| Disque | [Depuis T0] |
| OS | [Depuis T0] |
| JDK | Microsoft OpenJDK 17.0.16+8-LTS |
| PostgreSQL | 14-alpine (Docker) |
| Pool de connexions | HikariCP (min=5, max=20) |

### 2.3 Technologies par Variante

#### Variante A - Jersey + JPA
- **Framework REST:** Jersey 3.1.3 (JAX-RS)
- **Serveur HTTP:** Grizzly 4.0.0
- **ORM:** Hibernate 6.2.7
- **Injection de dépendances:** HK2
- **Avantages:** Standard JAX-RS, léger, indépendant de Spring
- **Port:** 8048, Métriques: 9091

#### Variante C - Spring MVC + JPA
- **Framework REST:** Spring MVC (Spring Boot 3.x)
- **Serveur HTTP:** Tomcat embarqué
- **ORM:** Hibernate via Spring Data JPA
- **Injection de dépendances:** Spring DI
- **Avantages:** Écosystème riche, annotations familières, flexibilité
- **Port:** 8082, Métriques: 9092

#### Variante D - Spring Data REST
- **Framework REST:** Spring Data REST (Spring Boot 3.x)
- **Serveur HTTP:** Tomcat embarqué
- **ORM:** Spring Data JPA repositories
- **Injection de dépendances:** Spring DI
- **Avantages:** Génération automatique d'API, productivité maximale, HAL/HATEOAS
- **Port:** 8083, Métriques: 9093

---

## 3. Méthodologie

### 3.1 Scénarios de Test
[Reprendre les données du tableau T1]

| Scénario | Description | Charge | Durée |
|----------|-------------|--------|-------|
| 01 - READ Heavy | Lecture intensive | 50→200 threads | 30 min |
| 02 - JOIN Filter | Requêtes avec JOIN | 60→120 threads | 30 min |
| 03 - MIXED | Opérations mixtes CRUD | 50→100 threads | 30 min |
| 04 - HEAVY Body | Corps de requêtes 5KB | 30→60 threads | 30 min |

### 3.2 Métriques Collectées

**Performances applicatives (JMeter):**
- RPS (Requests Per Second) moyen
- Latences: P50, P95, P99
- Taux d'erreurs
- Débit réseau (KB/s)

**Ressources système (Prometheus):**
- Utilisation CPU (%)
- Mémoire Heap (utilisée/max)
- Nombre de collections GC + temps GC
- Nombre de threads JVM

### 3.3 Procédure d'Exécution
Pour chaque variante:
1. Démarrage de l'application (attente 30s de stabilisation)
2. Vérification des endpoints (health check)
3. Lancement JMeter avec ramp-up de 5 minutes
4. Collecte de métriques pendant 30 minutes
5. Capture de screenshots aux temps T+5, T+15, T+28
6. Arrêt et extraction des rapports

**Total:** 12 exécutions (3 variantes × 4 scénarios) = ~6-8 heures

---

## 4. Résultats

### 4.1 Performances Globales par Scénario
[Reprendre et analyser tableau T2]

**Scénario 01 - READ Heavy:**

| Variante | RPS Moyen | P95 (ms) | P99 (ms) | Erreurs (%) |
|----------|-----------|----------|----------|-------------|
| A - Jersey | [T2] | [T2] | [T2] | [T2] |
| C - Spring MVC | [T2] | [T2] | [T2] | [T2] | 
| D - Spring Data REST | [T2] | [T2] | [T2] | [T2] |

**Analyse:** [Comparer les valeurs, identifier le vainqueur, expliquer les écarts]

**Scénario 02 - JOIN Filter:**
[Même format que READ Heavy]

**Scénario 03 - MIXED:**
[Même format que READ Heavy]

**Scénario 04 - HEAVY Body:**
[Même format que READ Heavy]

### 4.2 Consommation de Ressources
[Reprendre et analyser tableau T3]

**Mémoire Heap (pics):**

| Variante | READ Heavy | JOIN Filter | MIXED | HEAVY Body | Moyenne |
|----------|------------|-------------|-------|------------|---------|
| A - Jersey | [T3] MB | [T3] MB | [T3] MB | [T3] MB | [Calculer] |
| C - Spring MVC | [T3] MB | [T3] MB | [T3] MB | [T3] MB | [Calculer] |
| D - Spring Data REST | [T3] MB | [T3] MB | [T3] MB | [T3] MB | [Calculer] |

**Analyse:** [Quelle variante consomme le moins/plus de RAM? Pourquoi?]

**Utilisation CPU (pics):**
[Même format que Heap]

**Garbage Collection:**

| Variante | GC Collections (total) | GC Time (total ms) | GC Efficiency |
|----------|------------------------|--------------------|-|
| A - Jersey | [T3] | [T3] | [T3] |
| C - Spring MVC | [T3] | [T3] | [T3] |
| D - Spring Data REST | [T3] | [T3] | [T3] |

**Analyse:** [Interpréter l'efficacité du GC]

### 4.3 Détail par Endpoint
[Analyser tableaux T4 et T5 pour identifier les endpoints problématiques]

**Endpoints les plus lents (P95):**
1. [Endpoint] - [Variante] - [Latence P95]
2. [Endpoint] - [Variante] - [Latence P95]
3. [Endpoint] - [Variante] - [Latence P95]

### 4.4 Incidents et Anomalies
[Reprendre tableau T6 s'il y a des incidents]

**Incidents majeurs:** [Décrire]  
**Warnings:** [Décrire]  
**Impact:** [Évaluer]

---

## 5. Analyse Comparative

### 5.1 Synthèse des Résultats
[Reprendre et interpréter tableau T7]

**Meilleure performance READ:** [Variante] - Raison: [...]  
**Meilleure performance WRITE:** [Variante] - Raison: [...]  
**Meilleure efficacité mémoire:** [Variante] - Raison: [...]  
**Meilleure stabilité:** [Variante] - Raison: [...]

### 5.2 Points Forts et Faiblesses

#### Variante A - Jersey + JPA
**Points forts:**
- [À compléter selon résultats]
- [...]

**Points faibles:**
- [À compléter selon résultats]
- [...]

#### Variante C - Spring MVC + JPA
**Points forts:**
- [À compléter selon résultats]
- [...]

**Points faibles:**
- [À compléter selon résultats]
- [...]

#### Variante D - Spring Data REST
**Points forts:**
- [À compléter selon résultats]
- [...]

**Points faibles:**
- [À compléter selon résultats]
- [...]

### 5.3 Rapport Performance / Complexité

| Critère | Jersey | Spring MVC | Spring Data REST |
|---------|--------|------------|------------------|
| Performance brute | [Noter /10] | [Noter /10] | [Noter /10] |
| Consommation ressources | [Noter /10] | [Noter /10] | [Noter /10] |
| Complexité du code | [Noter /10] | [Noter /10] | [Noter /10] |
| Productivité développeur | [Noter /10] | [Noter /10] | [Noter /10] |
| Maintenabilité | [Noter /10] | [Noter /10] | [Noter /10] |
| **Score total** | [/50] | [/50] | [/50] |

---

## 6. Recommandations

### 6.1 Choix Technologique selon Cas d'Usage

**Cas 1: API haute performance, charge READ intensive**
- **Recommandation:** [Variante recommandée]
- **Justification:** [Expliquer basé sur résultats scénario 01]

**Cas 2: API CRUD classique, équipe Spring**
- **Recommandation:** [Variante recommandée]
- **Justification:** [Expliquer basé sur productivité + performance]

**Cas 3: Prototypage rapide, POC**
- **Recommandation:** [Variante recommandée]
- **Justification:** [Expliquer basé sur productivité]

**Cas 4: Microservices avec contraintes mémoire**
- **Recommandation:** [Variante recommandée]
- **Justification:** [Expliquer basé sur consommation RAM]

**Cas 5: API publique avec forte charge**
- **Recommandation:** [Variante recommandée]
- **Justification:** [Expliquer basé sur stabilité + performance]

### 6.2 Optimisations Identifiées

**Pour Jersey:**
- [Optimisation possible 1]
- [Optimisation possible 2]

**Pour Spring MVC:**
- [Optimisation possible 1]
- [Optimisation possible 2]

**Pour Spring Data REST:**
- [Optimisation possible 1]
- [Optimisation possible 2]

### 6.3 Limitations et Biais du Benchmark

**Limitations:**
- [Ex: Environnement de test non représentatif de la production]
- [Ex: Scénarios simplifiés]
- [...]

**Biais potentiels:**
- [Ex: Configuration non optimale d'une variante]
- [Ex: Ordre d'exécution des tests]
- [...]

---

## 7. Conclusion

### 7.1 Résumé Exécutif
[Résumer en 3-5 phrases les conclusions principales]

### 7.2 Enseignements Clés
1. [Enseignement 1]
2. [Enseignement 2]
3. [Enseignement 3]

### 7.3 Perspectives
[Proposer des améliorations futures, benchmarks complémentaires]

---

## 8. Annexes

### Annexe A: Configuration des Applications
**Fichiers de configuration:**
- [Lien vers application.properties variante A]
- [Lien vers application.properties variante C]
- [Lien vers application.properties variante D]

### Annexe B: Screenshots Grafana
**Scénario 01 - READ Heavy:**
- ![Variante A - T+15](screenshots/a-read-heavy-t15.png)
- ![Variante C - T+15](screenshots/c-read-heavy-t15.png)
- ![Variante D - T+15](screenshots/d-read-heavy-t15.png)

[Répéter pour chaque scénario]

### Annexe C: Rapports JMeter Complets
- [Lien vers reports/variante-a-read-heavy/index.html]
- [Lien vers reports/variante-a-join-filter/index.html]
- [...]

### Annexe D: Queries Prometheus Utilisées
```promql
# Heap memory usage
jvm_memory_used_bytes{job=~"variante.*", area="heap"} / 1024 / 1024

# CPU usage
process_cpu_usage{job=~"variante.*"} * 100

# GC pause time
rate(jvm_gc_pause_seconds_sum{job=~"variante.*"}[1m]) * 1000

# Thread count
jvm_threads_current{job=~"variante.*"}
```

### Annexe E: Commandes JMeter
```powershell
# Scénario 01 - Variante A
jmeter -n -t scenarios/01-read-heavy.jmx `
  -DbaseUrl=localhost:8048 -Dvariant=a `
  -l results/variante-a-read-heavy.csv `
  -e -o reports/variante-a-read-heavy

# [Autres commandes...]
```

### Annexe F: Références
1. Jersey Documentation: https://eclipse-ee4j.github.io/jersey/
2. Spring MVC Documentation: https://spring.io/guides/gs/rest-service
3. Spring Data REST Documentation: https://spring.io/projects/spring-data-rest
4. JMeter Best Practices: https://jmeter.apache.org/usermanual/best-practices.html

---

**Fin du rapport**

*Version: 1.0*  
*Date de dernière modification: [Date]*
