package com.webstore.webStore.repository.account.cart;

import com.webstore.webStore.entity.account.Cart;
import com.webstore.webStore.entity.product.Product;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartDAO {

    List<Cart> getCartProducts(Integer customerID);

    void addRemoveCartProducts(Product product, Integer customerID, String productType, Integer removeProduct);

    void clearCart(Integer customerID);
}
