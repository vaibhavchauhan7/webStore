package com.webstore.webStore.controller.account;

import com.webstore.webStore.entity.product.Product;
import com.webstore.webStore.service.account.wishlist.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class WishlistController {

    private final WishlistService wishlistService;

    @Autowired
    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @PostMapping("/wishlist/addProduct/{customerID}")
    public void addProductToWishlist(@PathVariable Integer customerID, @RequestBody Product product) {
        wishlistService.addRemoveWishlistProducts(product, customerID, "Wishlist", 0);
    }

    @PostMapping("/wishlist/removeProduct/{customerID}")
    public void removeProductFromWishlist(@PathVariable Integer customerID, @RequestBody Product product) {
        wishlistService.addRemoveWishlistProducts(product, customerID, "Wishlist", 1);
    }

    @GetMapping("/wishlist/getProducts/{customerID}")
    public List<Product> getWishlistProducts(@PathVariable Integer customerID) {
        return wishlistService.getWishlistProducts(customerID);
    }
}
