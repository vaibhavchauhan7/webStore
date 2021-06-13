package com.webstore.webStore.product;

import com.webstore.webStore.product.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ProductController {

    private final ProductRepository productRepository;

    @Autowired
    private ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/products")
    private List<Product> getProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/product/{productID}")
    private Product getProductByID(@PathVariable int productID) {
        Optional<Product> optionalProduct = productRepository.findById(productID);
        return optionalProduct.orElse(null);
    }

}
