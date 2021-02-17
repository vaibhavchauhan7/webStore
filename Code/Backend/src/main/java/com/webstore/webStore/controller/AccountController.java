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

    // Update Customer Profile
    @PostMapping("/profile/update")
    public Customer updateProfile(@RequestBody Customer customer) {
        return accountService.updateProfile(customer);
    }

    // Get Customer Orders
    @GetMapping("/orders/{customerID}")
    private List<Order> getOrders(@PathVariable Integer customerID) {
        return accountService.getOrders(customerID);
    }

    // Get Products In Wishlist/Cart
    @GetMapping("/customer/{customerID}/products/{type}")
    private List<WishlistCart> getProducts(@PathVariable Integer customerID, @PathVariable String type) {
        return accountService.getProducts(customerID, type);
    }

    // Add/Remove Product In Wishlist/Cart
    @PostMapping("/customer/{customerID}/product/{type}")
    private void modifyProduct(@RequestBody Product product,
                               @PathVariable Integer customerID,
                               @PathVariable String type,
                               @RequestParam("removeProduct") Integer removeProduct) {
        accountService.modifyProduct(product, customerID, type, removeProduct);
    }

    // Clear Products In Wishlist/Cart
    @PostMapping("/customer/{customerID}/clear/{type}")
    private void clearProducts(@PathVariable Integer customerID, @PathVariable String type) {
        accountService.clearProducts(customerID, type);
    }

    // Cart Checkout
    @PostMapping("/customer/{customerID}/checkout")
    private void checkOut(@RequestBody List<Product> cartProducts, @PathVariable Integer customerID) {
        accountService.checkOut(cartProducts, customerID);
    }
}
