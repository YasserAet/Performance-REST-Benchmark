package com.benchmark.springdatarest.projection;

import com.benchmark.springdatarest.entity.Item;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;

@Projection(name = "summary", types = {Item.class})
public interface ItemSummary {
    Long getId();
    String getSku();
    String getName();
    BigDecimal getPrice();
    Integer getStock();
    
    @Value("#{target.category.name}")
    String getCategoryName();
}
