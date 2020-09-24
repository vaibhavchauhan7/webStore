package com.webstore.webStore.service.account.wishlist;

import com.webstore.webStore.entity.account.Wishlist;
import com.webstore.webStore.entity.product.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("wishlistService")
public interface WishlistService {

    List<Wishlist> getWishlistProducts(Integer customerID);

    void addRemoveWishlistProducts(Product product, Integer customerID, String productType, Integer removeProduct);

    void clearWishlist(Integer customerID);
}
