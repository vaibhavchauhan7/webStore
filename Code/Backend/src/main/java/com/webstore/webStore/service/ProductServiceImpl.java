package com.webstore.webStore.service;

import com.webstore.webStore.entity.Product;
import com.webstore.webStore.repository.ProductDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("productService")
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductDAO productDAO;

    @Override
    public List<Product> getProducts() {
        return productDAO.getProducts();
    }
}
