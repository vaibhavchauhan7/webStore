package com.webstore.webStore.service.account;

import com.webstore.webStore.entity.Customer;
import com.webstore.webStore.entity.Order;
import com.webstore.webStore.entity.Product;
import com.webstore.webStore.entity.WishlistCart;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("accountService")
public interface AccountService {

    // Update Customer Profile
    Customer updateProfile(Customer customer);

    // Get Customer Orders
    List<Order> getOrders(Integer customerID);

    // Get Products In Wishlist/Cart
    List<WishlistCart> getProducts(Integer customerID, String type);

    // Add/Remove Product In Wishlist/Cart
    void modifyProduct(Product product, Integer customerID, String type, Integer removeProduct);

    // Clear Products In Wishlist/Cart
    void clearProducts(Integer customerID, String type);

    // Cart Checkout
    void checkOut(List<Product> cartProducts, Integer customerID);
}
