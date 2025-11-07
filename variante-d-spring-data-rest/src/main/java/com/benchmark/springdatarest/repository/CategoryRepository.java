package com.benchmark.springdatarest.repository;

import com.benchmark.springdatarest.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(path = "categories", collectionResourceRel = "categories")
public interface CategoryRepository extends JpaRepository<Category, Long> {

    /**
     * Recherche par code
     */
    @RestResource(path = "by-code", rel = "by-code")
    Category findByCode(String code);

    /**
     * Liste avec items (JOIN FETCH)
     */
    @Query("SELECT DISTINCT c FROM Category c LEFT JOIN FETCH c.items")
    @RestResource(exported = false)
    Page<Category> findAllWithItems(Pageable pageable);
}
