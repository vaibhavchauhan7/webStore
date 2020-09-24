package com.webstore.webStore.repository.account.wishlist;

import com.webstore.webStore.entity.account.Wishlist;
import com.webstore.webStore.entity.product.Product;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistDAO {

    List<Wishlist> getWishlistProducts(Integer customerID);

    void addRemoveWishlistProducts(Product product, Integer customerID, String productType, Integer removeProduct);

    void clearWishlist(Integer customerID);
}
