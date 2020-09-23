package com.webstore.webStore.service.account.wishlist;

import com.webstore.webStore.entity.product.Product;
import com.webstore.webStore.repository.account.wishlist.WishlistDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("wishlistService")
public class WishlistServiceImpl implements WishlistService {

    private final WishlistDAO wishlistDAO;

    @Autowired
    public WishlistServiceImpl(WishlistDAO wishlistDAO) {
        this.wishlistDAO = wishlistDAO;
    }

    @Override
    public void addRemoveWishlistProducts(Product product, Integer customerID, String productType, Integer removeProduct) {
        wishlistDAO.addRemoveWishlistProducts(product, customerID, productType, removeProduct);
    }

    @Override
    public List<Product> getWishlistProducts(Integer customerID) {
        return wishlistDAO.getWishlistProducts(customerID);
    }
}
