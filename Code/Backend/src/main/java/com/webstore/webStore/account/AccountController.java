package com.webstore.webStore.account;

import com.webstore.webStore.account.entity.Customer;
import com.webstore.webStore.account.entity.Order;
import com.webstore.webStore.account.entity.WishlistCart;
import com.webstore.webStore.product.entity.Product;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
@RestController
@RequestMapping(value = "/customer")
public class AccountController {

    private final AccountService accountService;

    @GetMapping("/details")
    private Customer getAuthenticatedCustomer() {
        return accountService.getAuthenticatedCustomer();
    }

    @PostMapping("/profile/update")
    private Customer updateProfile(@RequestBody Customer customer) {
        return accountService.updateProfile(customer);
    }

    @GetMapping("/{customerId}/orders")
    private List<Order> getOrders(@PathVariable Integer customerId) {
        return accountService.getOrders(customerId);
    }

    @GetMapping("/{customerId}/products/{type}")
    private List<WishlistCart> getProducts(@PathVariable Integer customerId, @PathVariable String type) {
        return accountService.getProducts(customerId, type);
    }

    @PostMapping("/{customerId}/product/{type}")
    private void modifyProduct(@RequestBody Product product, @PathVariable Integer customerId,
                               @PathVariable String type, @RequestParam("removeProduct") Integer removeProduct) {
        accountService.modifyProduct(product, customerId, type, removeProduct);
    }

    @PostMapping("/{customerId}/clear/{type}")
    private void clearProducts(@PathVariable Integer customerId, @PathVariable String type) {
        accountService.clearProducts(customerId, type);
    }

    @PostMapping("/{customerId}/checkout")
    private void checkOut(@RequestBody List<Product> cartProducts, @PathVariable Integer customerId) {
        accountService.checkOut(cartProducts, customerId);
    }

}
