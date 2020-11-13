package com.webstore.webStore.controller.account;

import com.webstore.webStore.entity.account.Wishlist;
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
    private WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping("/wishlist/getProducts/{customerID}")
    private List<Wishlist> getWishlistProducts(@PathVariable Integer customerID) {
        return wishlistService.getWishlistProducts(customerID);
    }

    @PostMapping("/wishlist/addProduct/{customerID}")
    private void addProductToWishlist(@PathVariable Integer customerID, @RequestBody Product product) {
        wishlistService.addRemoveWishlistProducts(product, customerID, "Wishlist", 0);
    }

    @PostMapping("/wishlist/removeProduct/{customerID}")
    private void removeProductFromWishlist(@PathVariable Integer customerID, @RequestBody Product product) {
        wishlistService.addRemoveWishlistProducts(product, customerID, "Wishlist", 1);
    }

    @PostMapping("/wishlist/clearWishlist/{customerID}")
    private void clearWishlist(@PathVariable Integer customerID) {
        wishlistService.clearWishlist(customerID);
    }
}
