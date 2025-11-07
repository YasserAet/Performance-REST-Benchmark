package com.benchmark.springmvc.controller;

import com.benchmark.springmvc.dto.PageResponse;
import com.benchmark.springmvc.entity.Item;
import com.benchmark.springmvc.repository.CategoryRepository;
import com.benchmark.springmvc.repository.ItemRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Value("${benchmark.use-join-fetch:true}")
    private boolean useJoinFetch;

    /**
     * GET /items?page=0&size=10
     * Liste paginée des items
     */
    @GetMapping
    public ResponseEntity<PageResponse<Item>> getItems(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Item> itemPage;

        if (categoryId != null) {
            // Filtrage par catégorie
            itemPage = useJoinFetch 
                ? itemRepository.findByCategoryIdWithCategory(categoryId, pageable)
                : itemRepository.findByCategoryId(categoryId, pageable);
        } else {
            // Liste complète
            itemPage = useJoinFetch
                ? itemRepository.findAllWithCategory(pageable)
                : itemRepository.findAll(pageable);
        }

        PageResponse<Item> response = new PageResponse<>(
                itemPage.getContent(),
                itemPage.getNumber(),
                itemPage.getSize(),
                itemPage.getTotalElements(),
                itemPage.getTotalPages()
        );

        return ResponseEntity.ok(response);
    }

    /**
     * GET /items/{id}
     * Détail d'un item
     */
    @GetMapping("/{id}")
    public ResponseEntity<Item> getItem(@PathVariable Long id) {
        return itemRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * POST /items
     * Créer un nouvel item
     */
    @PostMapping
    public ResponseEntity<Item> createItem(@Valid @RequestBody Item item) {
        // Vérifier que la catégorie existe
        if (item.getCategory() == null || item.getCategory().getId() == null) {
            return ResponseEntity.badRequest().build();
        }

        return categoryRepository.findById(item.getCategory().getId())
                .map(category -> {
                    item.setId(null); // Force création
                    item.setCategory(category);
                    Item saved = itemRepository.save(item);
                    return ResponseEntity.status(HttpStatus.CREATED).body(saved);
                })
                .orElse(ResponseEntity.badRequest().build());
    }

    /**
     * PUT /items/{id}
     * Mettre à jour un item
     */
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(
            @PathVariable Long id,
            @Valid @RequestBody Item item) {

        return itemRepository.findById(id)
                .map(existing -> {
                    // Vérifier la catégorie si elle change
                    if (item.getCategory() != null && item.getCategory().getId() != null) {
                        categoryRepository.findById(item.getCategory().getId())
                                .ifPresent(existing::setCategory);
                    }

                    existing.setSku(item.getSku());
                    existing.setName(item.getName());
                    existing.setPrice(item.getPrice());
                    existing.setStock(item.getStock());

                    Item updated = itemRepository.save(existing);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * DELETE /items/{id}
     * Supprimer un item
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        if (!itemRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        itemRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
