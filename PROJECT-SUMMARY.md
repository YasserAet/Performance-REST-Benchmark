# 📝 Project Summary: REST API Benchmark Comparison

**Date Created:** November 7, 2025  
**Project Type:** Performance Benchmark Study  
**Goal:** Compare 3 different Java REST API technologies

---

## 🎯 What Is This Project?

This is a **benchmark comparison project** that tests and compares **3 different ways** to build REST APIs in Java:

1. **Variante A:** Jersey (JAX-RS) + JPA/Hibernate
2. **Variante C:** Spring Boot + Spring MVC + JPA
3. **Variante D:** Spring Boot + Spring Data REST

We want to find out: **Which technology is faster? Uses less memory? Better for what use case?**

---

## 🏗️ What We Built

### The Application
A simple **e-commerce API** with:
- **2,000 categories** (like "Electronics", "Clothing", etc.)
- **100,000 items** (products in those categories)
- **CRUD operations** (Create, Read, Update, Delete)

All 3 variants do **exactly the same thing** - they're just built with different technologies.

### The Infrastructure
We set up a complete testing environment with **Docker**:
- **PostgreSQL** - Database with all the data
- **Prometheus** - Collects metrics (CPU, memory, etc.)
- **Grafana** - Beautiful dashboards to visualize metrics
- **InfluxDB** - Stores JMeter test results
- **Apache JMeter** - Tool that simulates thousands of users

---

## 🛠️ What We Did Together

### Step 1: Fixed Variante A (Jersey) ✅

**Problems we solved:**
1. ❌ **Servlet dependency conflict** → Fixed by removing old javax.servlet, using Jakarta APIs
2. ❌ **Docker WSL2 corruption** → Fixed with Docker Desktop factory reset
3. ❌ **SQL files running in wrong order** → Renamed to `01-schema.sql` and `02-data.sql`
4. ❌ **Jersey resources not registered** → Fixed HK2 dependency injection with AbstractBinder
5. ❌ **Hibernate lazy loading error** → Added `@JsonIgnore` and changed to `FetchType.EAGER`
6. ❌ **Prometheus not collecting metrics** → Configured `prometheus.yml` with all 3 variants

**Result:** Variante A works perfectly! ✅
- API running on port **8048**
- Metrics on port **9091**
- All endpoints working: `/categories`, `/items`

### Step 2: Set Up Complete Infrastructure ✅

**What's running in Docker:**
```
✅ PostgreSQL (port 5432) - Database with 2000 cats + 100k items
✅ Prometheus (port 9090) - Metrics collection
✅ Grafana (port 3000) - Visualization dashboards
✅ InfluxDB (port 8086) - JMeter results storage
```

### Step 3: Created Complete Testing Framework ✅

**We created ALL the files you need:**

#### 🎯 JMeter Test Scenarios (4 files)
1. **01-read-heavy.jmx** - Simulates heavy reading (like browsing products)
2. **02-join-filter.jmx** - Tests database JOINs (like filtering by category)
3. **03-mixed.jmx** - Mix of read/write operations (like real users)
4. **04-heavy-body.jmx** - Large requests (like uploading big product descriptions)

Each test:
- Ramps up users gradually (like real traffic)
- Runs for 30 minutes
- Measures response time, errors, throughput
- Sends data to InfluxDB automatically

#### 📊 Grafana Dashboards (2 files)
1. **dashboard-jvm.json** - Shows memory, CPU, garbage collection for one app
2. **dashboard-comparison.json** - Compares all 3 variants side-by-side

#### 📁 Data Files (CSV generator script)
- **generate-csv-data.ps1** - Extracts IDs from database + generates test payloads
  - Creates `categories.csv` (2000 category IDs)
  - Creates `items.csv` (100,000 item IDs)
  - Creates `payloads-light.csv` (1000 small JSON samples ~0.8KB)
  - Creates `payloads-heavy.csv` (500 large JSON samples ~5KB)

#### 📖 Documentation (6 guides)
1. **GUIDE-EXECUTION.md** - Step-by-step how to run all tests (200+ lines!)
2. **GUIDE-TABLEAUX-EXCEL.md** - How to create Excel file for results
3. **RAPPORT-TEMPLATE.md** - Pre-written report template to fill in
4. **README-DELIVERABLES.md** - Complete list of everything created
5. **TODO-VARIANTES-C-D.md** - Instructions to test variants C & D
6. **QUICK-REFERENCE.md** - Cheat sheet with all commands/ports

---

## 📋 How the Benchmark Works

### Simple Explanation:

1. **Start the application** (one variant at a time)
2. **JMeter simulates users** - starts with 50 users, ramps up to 200
3. **Users make requests** - GET products, POST new items, UPDATE, DELETE
4. **Prometheus collects metrics** every 5 seconds (CPU%, memory, etc.)
5. **After 30 minutes** - JMeter generates HTML report with results
6. **Capture screenshots** from Grafana showing resource usage
7. **Repeat** for all 4 scenarios
8. **Repeat again** for the next variant

**Total:** 12 test runs (3 variants × 4 scenarios) = about 6-8 hours

### What Gets Measured:

**Performance Metrics (from JMeter):**
- ⚡ **RPS** (Requests Per Second) - How many requests handled
- 🕐 **Latency P95** - 95% of requests faster than this
- ❌ **Error Rate** - % of failed requests
- 📦 **Throughput** - KB/second of data transferred

**Resource Metrics (from Prometheus):**
- 💻 **CPU Usage** - % of processor used
- 🧠 **Memory (Heap)** - How much RAM used
- 🗑️ **Garbage Collection** - How often Java cleans memory
- 🧵 **Threads** - Number of concurrent tasks

---

## 🎯 The Test Scenarios Explained

### Scenario 1: READ Heavy (Most Common)
**What it simulates:** Users browsing products
- 50% get items list
- 20% get items filtered by category (JOIN query)
- 20% get all items in a category
- 10% get categories list

**Why:** Most websites have way more readers than writers

### Scenario 2: JOIN Filter (Database Heavy)
**What it simulates:** Advanced search/filtering
- 70% filter items by category (requires database JOIN)
- 30% get single item by ID

**Why:** Tests how well each technology handles complex database queries

### Scenario 3: MIXED Operations (Realistic)
**What it simulates:** Real users doing everything
- 40% reading
- 20% creating new items
- 10% updating existing items
- 10% deleting items
- 20% category operations

**Why:** Real applications aren't just reading - users also modify data

### Scenario 4: HEAVY Body (Large Payloads)
**What it simulates:** Uploading/updating with big data
- 50% POST with 5KB JSON
- 50% PUT with 5KB JSON

**Why:** Tests how each technology handles large requests (memory, parsing)

---

## 📊 Expected Deliverables

When you're done, you'll have:

### 1. Excel File (`tableaux.xlsx`) with 8 sheets:
- **T0:** Your computer specs (CPU, RAM, etc.)
- **T1:** Scenario definitions (already filled in guides)
- **T2:** Performance results (RPS, latency, errors) for all 12 tests
- **T3:** Resource usage (CPU, memory, GC) for all 12 tests
- **T4:** Detailed breakdown of JOIN scenario
- **T5:** Detailed breakdown of MIXED scenario
- **T6:** Log of any incidents/errors
- **T7:** **Final conclusions** - Which is best for what?

### 2. Screenshots Folder
- 36 images (3 variants × 4 scenarios × 3 time points)
- Shows Grafana dashboards at key moments

### 3. JMeter Reports
- 12 HTML reports with graphs and statistics
- Professional-looking, auto-generated by JMeter

### 4. Final Report (`RAPPORT-FINAL.md`)
- Fill in the template we created
- Analyze the results
- Make recommendations

---

## 🎓 What You'll Learn

### Technical Skills:
✅ Building REST APIs 3 different ways  
✅ Using Docker for infrastructure  
✅ Performance testing with JMeter  
✅ Monitoring with Prometheus + Grafana  
✅ Analyzing JVM metrics (heap, GC, threads)  
✅ Benchmark methodology  

### Analytical Skills:
✅ Comparing technologies objectively  
✅ Reading performance metrics  
✅ Making technical recommendations  
✅ Writing professional reports  

---

## 🚀 Quick Start (What to Do Next)

### Right Now (10 minutes):
1. Run: `.\generate-csv-data.ps1` to create test data
2. Open: `GUIDE-EXECUTION.md` and read it
3. Create: `tableaux.xlsx` following `GUIDE-TABLEAUX-EXCEL.md`

### This Weekend (6-8 hours):
1. **Variante A:** Run 4 JMeter tests, capture screenshots
2. **Variante C:** Setup, run 4 tests, capture screenshots  
3. **Variante D:** Setup, run 4 tests, capture screenshots
4. Fill Excel tables as you go

### Next Week (2 hours):
1. Analyze results in Excel
2. Fill report template
3. Write conclusions

---

## 💡 Why This Project is Cool

1. **Real-world applicable** - These are actual technologies used in production
2. **Comprehensive** - You're testing everything: speed, memory, scalability
3. **Professional** - Using industry-standard tools (JMeter, Prometheus, Grafana)
4. **Automated** - We created scripts so you don't do everything manually
5. **Reusable** - You can benchmark anything else with this setup

---

## 🏆 The Bottom Line

**Before our work:**
- You had code that didn't compile
- No testing infrastructure
- Would take 14-20 hours of manual work

**After our work:**
- ✅ Variante A fully working
- ✅ Complete Docker infrastructure
- ✅ 4 JMeter scenarios ready to run
- ✅ Grafana dashboards configured
- ✅ All documentation written
- ✅ Only need 6-8 hours to execute & analyze

**We automated ~60% of the work!** 🎉

---

## 📞 Remember These Files

When you forget something, check:

- 🏃 **How to run tests?** → `GUIDE-EXECUTION.md`
- 📊 **What results to collect?** → `GUIDE-TABLEAUX-EXCEL.md`
- ⚡ **Quick command reference?** → `QUICK-REFERENCE.md`
- 🔧 **How to fix variants C/D?** → `TODO-VARIANTES-C-D.md`
- 📝 **How to write report?** → `RAPPORT-TEMPLATE.md`
- 📁 **What files do I have?** → `README-DELIVERABLES.md`

---

## 🎯 Your Goal

**Answer this question with data:**

> *"If I'm building a REST API in Java, which technology should I choose and why?"*

Your answer will depend on:
- Is it read-heavy or write-heavy?
- Do I have memory constraints?
- Do I need maximum performance?
- Do I want fast development (Spring Data REST)?
- Do I need flexibility (Spring MVC)?
- Do I want lightweight (Jersey)?

**The benchmark will tell you!** 📊✨

---

*Good luck! You've got everything you need.* 🚀
