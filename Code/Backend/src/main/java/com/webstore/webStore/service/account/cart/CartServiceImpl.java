package com.webstore.webStore.service.account.cart;

import com.webstore.webStore.entity.account.Cart;
import com.webstore.webStore.entity.product.Product;
import com.webstore.webStore.repository.account.cart.CartDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("cartService")
public class CartServiceImpl implements CartService {

    private final CartDAO cartDAO;

    @Autowired
    public CartServiceImpl(CartDAO cartDAO) {
        this.cartDAO = cartDAO;
    }

    @Override
    public List<Cart> getCartProducts(Integer customerID) {
        return cartDAO.getCartProducts(customerID);
    }

    @Override
    public Boolean checkOut(List<Product> cartProducts, Integer customerID) {
        return cartDAO.checkOut(cartProducts, customerID);
    }

    @Override
    public void addRemoveCartProducts(Product product, Integer customerID, String productType, Integer removeProduct) {
        cartDAO.addRemoveCartProducts(product, customerID, productType, removeProduct);
    }

    @Override
    public void clearCart(Integer customerID) {
        cartDAO.clearCart(customerID);
    }
}
