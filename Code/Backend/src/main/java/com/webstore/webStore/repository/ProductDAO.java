package com.webstore.webStore.repository;

import com.webstore.webStore.entity.Product;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDAO {

    List<Product> getProducts();
}
