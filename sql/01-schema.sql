-- ============================================
-- Schéma de la base de données pour le benchmark REST
-- PostgreSQL 14+
-- ============================================

-- Suppression des tables si elles existent
DROP TABLE IF EXISTS item CASCADE;
DROP TABLE IF EXISTS category CASCADE;

-- Table Category
CREATE TABLE category (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(32) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Table Item
CREATE TABLE item (
    id BIGSERIAL PRIMARY KEY,
    sku VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(2000) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock INT NOT NULL,
    category_id BIGINT NOT NULL REFERENCES category(id) ON DELETE CASCADE,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_item_category ON item(category_id);
CREATE INDEX idx_item_updated_at ON item(updated_at);
CREATE INDEX idx_category_code ON category(code);
CREATE INDEX idx_item_sku ON item(sku);

-- Commentaires
COMMENT ON TABLE category IS 'Table des catégories de produits';
COMMENT ON TABLE item IS 'Table des articles/produits';
COMMENT ON COLUMN item.sku IS 'Stock Keeping Unit - identifiant unique du produit';
COMMENT ON COLUMN item.category_id IS 'Clé étrangère vers la catégorie parente';
