package com.benchmark.springmvc.repository;

import com.benchmark.springmvc.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    /**
     * Recherche par SKU
     */
    Item findBySku(String sku);

    /**
     * Filtrage par catégorie avec JOIN FETCH pour éviter N+1
     */
    @Query("SELECT i FROM Item i JOIN FETCH i.category WHERE i.category.id = :categoryId")
    Page<Item> findByCategoryIdWithCategory(@Param("categoryId") Long categoryId, Pageable pageable);

    /**
     * Filtrage par catégorie (version simple sans JOIN FETCH)
     */
    Page<Item> findByCategoryId(Long categoryId, Pageable pageable);

    /**
     * Liste paginée avec JOIN FETCH
     */
    @Query("SELECT i FROM Item i JOIN FETCH i.category")
    Page<Item> findAllWithCategory(Pageable pageable);
}
