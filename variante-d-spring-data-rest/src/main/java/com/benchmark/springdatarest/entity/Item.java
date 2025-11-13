package com.benchmark.springdatarest.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le SKU est obligatoire")
    @Size(max = 64, message = "Le SKU ne peut pas dépasser 64 caractères")
    @Column(name = "sku", unique = true, nullable = false, length = 64)
    private String sku;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 2000, message = "Le nom ne peut pas dépasser 2000 caractères")
    @Column(name = "name", nullable = false, length = 2000)
    private String name;

    @NotNull(message = "Le prix est obligatoire")
    @Min(value = 0, message = "Le prix doit être positif")
    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @NotNull(message = "Le stock est obligatoire")
    @Min(value = 0, message = "Le stock doit être positif")
    @Column(name = "stock", nullable = false)
    private Integer stock;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "La catégorie est obligatoire")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnoreProperties("items")
    private Category category;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public Item() {
        this.updatedAt = LocalDateTime.now();
    }

    public Item(String sku, String name, BigDecimal price, Integer stock, Category category) {
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
