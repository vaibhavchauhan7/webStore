package com.webstore.webStore.repository.product;

import com.webstore.webStore.entity.product.Product;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDAO {

    List<Product> getProducts();
}
