package com.webstore.webStore.service.account.wishlist;

import com.webstore.webStore.entity.product.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("wishlistService")
public interface WishlistService {

    void addRemoveWishlistProducts(Product product, Integer customerID, String productType, Integer removeProduct);

    List<Product> getWishlistProducts(Integer customerID);
}
