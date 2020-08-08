package com.webstore.webStore.repository.product;

import com.webstore.webStore.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
