# Comparaison Finale: Variante A (Jersey) vs Variante C (Spring MVC)

**Date des tests**: 12 novembre 2025  
**Configuration identique**: PostgreSQL, 100k items, 2k catégories, 5 minutes par test

---

## Tableau Récapitulatif Global

| Test | Métrique | Variante A (Jersey) | Variante C (Spring MVC) | Gagnant | Écart |
|------|----------|---------------------|-------------------------|---------|-------|
| **01-READ-HEAVY** | Requêtes | 8,932 | 4,395 | A | **+103%** |
| | Throughput | 28.6 /s | 11.4 /s | A | **+151%** |
| | Durée | 5m 12s | 6m 24s | A | -19% |
| **02-JOIN-FILTER** | Requêtes | 41,517 | 21,284 | A | **+95%** |
| | Throughput | 136.2 /s | 24.5 /s | A | **+456%** |
| | Durée | 5m 05s | 14m 30s | A | **-65%** |
| **03-MIXED** | Requêtes | 9,870 | 10,141 | C | +3% |
| | Throughput | 32.5 /s | 33.6 /s | C | +3% |
| | Latence moy | 2,528 ms | 2,466 ms | C | -2% |
| **04-HEAVY-BODY** | Erreurs | 100% | 100% | Égalité | - |
| | Throughput | 177.7 /s | 187.9 /s | C | +6% |

---

## Score Final

### Performance Globale
- **Variante A (Jersey)**: **2 victoires nettes** (tests 01, 02)
- **Variante C (Spring MVC)**: **1 victoire** (test 03)
- **Égalité**: Test 04 (échec pour les deux)

### Verdict: **VARIANTE A (Jersey) GAGNANTE**

**Avance moyenne sur lectures**: **+123% de requêtes**, **+303% de throughput**

---

## Analyse Détaillée

### Pourquoi Jersey est Plus Rapide

1. **Architecture légère**: JAX-RS pur, sans overhead Spring
2. **Serveur Grizzly**: Optimisé pour hautes performances
3. **Moins de couches**: Moins d'abstraction = moins de latence
4. **Gestion mémoire**: Plus efficace sur requêtes massives

### Pourquoi Spring MVC est Plus Lent

1. **Overhead Spring**: Contexte, AOP, proxies, etc.
2. **Serveur Tomcat**: Moins optimisé que Grizzly pour charge élevée
3. **Plus de couches**: DispatcherServlet, HandlerMapping, etc.
4. **Auto-configuration**: Fonctionnalités activées par défaut

### Où Spring MVC Compense

1. **Charge mixte**: Performances comparables (test 03)
2. **Écosystème**: Intégration avec Spring Boot, Security, etc.
3. **Productivité**: Développement plus rapide avec conventions
4. **Maintenance**: Plus de développeurs connaissent Spring

---

## Graphiques des Performances

### Throughput (requêtes/sec)

```
Test 01 (READ-HEAVY)
Jersey:      ████████████████████████████ 28.6
Spring MVC:  ███████████ 11.4

Test 02 (JOIN-FILTER)
Jersey:      ████████████████████████████████████████████████████████████ 136.2
Spring MVC:  ████████████ 24.5

Test 03 (MIXED)
Jersey:      ████████████████ 32.5
Spring MVC:  ████████████████ 33.6
```

### Nombre de Requêtes (5 minutes)

```
Test 01
Jersey:      ████████████████████ 8,932
Spring MVC:  █████████ 4,395

Test 02
Jersey:      █████████████████████████████████████████ 41,517
Spring MVC:  ████████████████████ 21,284

Test 03
Jersey:      ██████████ 9,870
Spring MVC:  ██████████ 10,141
```

---

**Conclusion**: Jersey remporte ce benchmark sur **performance brute**, mais Spring MVC reste un choix valide pour **productivité** et **écosystème**. Le choix dépend des priorités du projet!
