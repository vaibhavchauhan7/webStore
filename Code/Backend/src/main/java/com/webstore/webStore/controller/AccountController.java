package com.webstore.webStore.controller;

import com.webstore.webStore.entity.Customer;
import com.webstore.webStore.entity.Order;
import com.webstore.webStore.entity.Product;
import com.webstore.webStore.entity.WishlistCart;
import com.webstore.webStore.service.account.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    // Profile
    @PostMapping("/profile/update")
    public Customer updateCustomerProfile(@RequestBody Customer customer) {
        return accountService.updateCustomerProfile(customer);
    }

    // Orders
    @GetMapping("/orders/{customerID}")
    private List<Order> getOrdersForCustomer(@PathVariable Integer customerID) {
        return accountService.getOrdersForCustomer(customerID);
    }

    // Get Products
    @GetMapping("/wishlist/getProducts/{customerID}")
    private List<WishlistCart> getWishlistProducts(@PathVariable Integer customerID) {
        return accountService.getProducts(customerID, "Wishlist");
    }

    @GetMapping("/cart/getProducts/{customerID}")
    private List<WishlistCart> getCartProducts(@PathVariable Integer customerID) {
        return accountService.getProducts(customerID, "Cart");
    }

    // Add Products
    @PostMapping("/wishlist/addProduct/{customerID}")
    private void addProductToWishlist(@PathVariable Integer customerID, @RequestBody Product product) {
        accountService.addRemoveProducts(product, customerID, "Wishlist", 0);
    }

    @PostMapping("/cart/addProduct/{customerID}")
    private void addProductToCart(@PathVariable Integer customerID, @RequestBody Product product) {
        accountService.addRemoveProducts(product, customerID, "Cart", 0);
    }

    // Remove Products
    @PostMapping("/wishlist/removeProduct/{customerID}")
    private void removeProductFromWishlist(@PathVariable Integer customerID, @RequestBody Product product) {
        accountService.addRemoveProducts(product, customerID, "Wishlist", 1);
    }

    @PostMapping("/cart/removeProduct/{customerID}")
    private void removeProductFromCart(@PathVariable Integer customerID, @RequestBody Product product) {
        accountService.addRemoveProducts(product, customerID, "Cart", 1);
    }

    // Clear Products
    @PostMapping("/wishlist/clearWishlist/{customerID}")
    private void clearWishlist(@PathVariable Integer customerID) {
        accountService.clearProducts(customerID, "Wishlist");
    }

    @PostMapping("/cart/clearCart/{customerID}")
    private void clearCart(@PathVariable Integer customerID) {
        accountService.clearProducts(customerID, "Cart");
    }

    // Checkout
    @PostMapping("/checkout/{customerID}")
    private boolean checkOut(@PathVariable Integer customerID, @RequestBody List<Product> cartProducts) {
        return accountService.checkOut(cartProducts, customerID);
    }
}
