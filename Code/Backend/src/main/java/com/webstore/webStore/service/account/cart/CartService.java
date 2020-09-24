package com.webstore.webStore.service.account.cart;

import com.webstore.webStore.entity.account.Cart;
import com.webstore.webStore.entity.product.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("cartService")
public interface CartService {

    List<Cart> getCartProducts(Integer customerID);

    void addRemoveCartProducts(Product product, Integer customerID, String productType, Integer removeProduct);

    void clearCart(Integer customerID);
}
