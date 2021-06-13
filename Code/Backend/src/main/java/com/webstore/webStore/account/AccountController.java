package com.webstore.webStore.account;

import com.webstore.webStore.account.entity.Customer;
import com.webstore.webStore.account.entity.Order;
import com.webstore.webStore.account.entity.WishlistCart;
import com.webstore.webStore.product.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/customer")
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/details")
    private Customer getAuthenticatedCustomer() {
        return accountService.getAuthenticatedCustomer();
    }

    @PostMapping("/profile/update")
    private Customer updateProfile(@RequestBody Customer customer) {
        return accountService.updateProfile(customer);
    }

    @GetMapping("/{customerID}/orders")
    private List<Order> getOrders(@PathVariable Integer customerID) {
        return accountService.getOrders(customerID);
    }

    @GetMapping("/{customerID}/products/{type}")
    private List<WishlistCart> getProducts(@PathVariable Integer customerID,
                                           @PathVariable String type) {
        return accountService.getProducts(customerID, type);
    }

    @PostMapping("/{customerID}/product/{type}")
    private void modifyProduct(@RequestBody Product product,
                               @PathVariable Integer customerID,
                               @PathVariable String type,
                               @RequestParam("removeProduct") Integer removeProduct) {
        accountService.modifyProduct(product, customerID, type, removeProduct);
    }

    @PostMapping("/{customerID}/clear/{type}")
    private void clearProducts(@PathVariable Integer customerID,
                               @PathVariable String type) {
        accountService.clearProducts(customerID, type);
    }

    @PostMapping("/{customerID}/checkout")
    private void checkOut(@RequestBody List<Product> cartProducts,
                          @PathVariable Integer customerID) {
        accountService.checkOut(cartProducts, customerID);
    }

}
