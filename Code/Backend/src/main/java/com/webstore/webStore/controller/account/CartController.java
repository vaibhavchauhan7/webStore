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
    private CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/cart/getProducts/{customerID}")
    private List<Cart> getCartProducts(@PathVariable Integer customerID) {
        return cartService.getCartProducts(customerID);
    }

    @PostMapping("/cart/addProduct/{customerID}")
    private void addProductToCart(@PathVariable Integer customerID, @RequestBody Product product) {
        cartService.addRemoveCartProducts(product, customerID, "Cart", 0);
    }

    @PostMapping("/cart/removeProduct/{customerID}")
    private void removeProductFromCart(@PathVariable Integer customerID, @RequestBody Product product) {
        cartService.addRemoveCartProducts(product, customerID, "Cart", 1);
    }

    @PostMapping("/cart/clearCart/{customerID}")
    private void clearCart(@PathVariable Integer customerID) {
        cartService.clearCart(customerID);
    }

    @PostMapping("/checkout/{customerID}")
    private Boolean checkOut(@PathVariable Integer customerID, @RequestBody List<Product> cartProducts) {
        return cartService.checkOut(cartProducts, customerID);
    }
}
