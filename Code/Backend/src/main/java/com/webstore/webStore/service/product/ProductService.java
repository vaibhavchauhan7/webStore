package com.webstore.webStore.service.product;

import com.webstore.webStore.entity.product.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("productService")
public interface ProductService {

    List<Product> getProducts();
}
