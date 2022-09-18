package com.webstore.webStore.product;

import com.webstore.webStore.product.entity.Product;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
@RestController
public class ProductController {

    private final ProductRepository productRepository;

    @GetMapping("/products")
    private List<Product> getProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/product/{productId}")
    private Product getProductById(@PathVariable int productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        return optionalProduct.orElse(null);
    }

}
