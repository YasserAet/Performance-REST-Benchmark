package com.benchmark.springdatarest.projection;

import com.benchmark.springdatarest.entity.Category;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "summary", types = {Category.class})
public interface CategorySummary {
    Long getId();
    String getCode();
    String getName();
}
