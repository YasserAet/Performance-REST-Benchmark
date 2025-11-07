-- ============================================
-- Génération des données de test
-- 2 000 catégories + 100 000 items
-- ============================================

-- Insertion des catégories (CAT0001 à CAT2000)
INSERT INTO category (code, name, updated_at)
SELECT
    'CAT' || LPAD(generate_series::TEXT, 4, '0'),
    'Catégorie ' || generate_series,
    NOW() - (random() * INTERVAL '365 days')
FROM generate_series(1, 2000);

-- Insertion des items (100 000 items, ~50 par catégorie)
INSERT INTO item (sku, name, price, stock, category_id, updated_at)
SELECT
    'SKU' || LPAD(generate_series::TEXT, 6, '0'),
    'Article ' || generate_series || ' - ' || 
        (ARRAY['Standard', 'Premium', 'Économique', 'Luxe', 'Professionnel'])[floor(random() * 5 + 1)],
    (random() * 9900 + 100)::NUMERIC(10, 2),
    floor(random() * 1000)::INT,
    floor(random() * 2000 + 1)::BIGINT,
    NOW() - (random() * INTERVAL '365 days')
FROM generate_series(1, 100000);

-- Vérification des données insérées
SELECT 
    'Categories' AS table_name,
    COUNT(*) AS count
FROM category
UNION ALL
SELECT 
    'Items' AS table_name,
    COUNT(*) AS count
FROM item;

-- Statistiques par catégorie
SELECT 
    COUNT(DISTINCT category_id) AS categories_with_items,
    MIN(item_count) AS min_items_per_category,
    MAX(item_count) AS max_items_per_category,
    ROUND(AVG(item_count), 2) AS avg_items_per_category
FROM (
    SELECT category_id, COUNT(*) AS item_count
    FROM item
    GROUP BY category_id
) AS cat_stats;

-- Rafraîchir les statistiques pour l'optimiseur de requêtes
ANALYZE category;
ANALYZE item;
