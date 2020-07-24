package com.webstore.webStore.service;

import com.webstore.webStore.entity.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("productService")
public interface ProductService {

    List<Product> getProducts();
}
