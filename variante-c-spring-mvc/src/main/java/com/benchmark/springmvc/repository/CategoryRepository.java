package com.benchmark.springmvc.repository;

import com.benchmark.springmvc.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    /**
     * Recherche par code de catégorie
     */
    Category findByCode(String code);

    /**
     * Liste paginée optimisée avec JOIN FETCH pour éviter N+1
     */
    @Query("SELECT DISTINCT c FROM Category c LEFT JOIN FETCH c.items")
    Page<Category> findAllWithItems(Pageable pageable);
}
