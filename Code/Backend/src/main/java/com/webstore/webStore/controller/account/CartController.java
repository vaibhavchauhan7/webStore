package com.webstore.webStore.controller.account;

import com.webstore.webStore.entity.account.Cart;
import com.webstore.webStore.entity.product.Product;
import com.webstore.webStore.service.account.cart.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/cart/getProducts/{customerID}")
    public List<Cart> getWishlistProducts(@PathVariable Integer customerID) {
        return cartService.getCartProducts(customerID);
    }

    @PostMapping("/cart/addProduct/{customerID}")
    public void addProductToCart(@PathVariable Integer customerID, @RequestBody Product product) {
        cartService.addRemoveCartProducts(product, customerID, "Cart", 0);
    }

    @PostMapping("/cart/removeProduct/{customerID}")
    public void removeProductFromCart(@PathVariable Integer customerID, @RequestBody Product product) {
        cartService.addRemoveCartProducts(product, customerID, "Cart", 1);
    }

    @PostMapping("/cart/clearCart/{customerID}")
    public void clearCart(@PathVariable Integer customerID) {
        cartService.clearCart(customerID);
    }
}
