package com.webstore.webStore.service.account;

import com.webstore.webStore.entity.Customer;
import com.webstore.webStore.entity.Order;
import com.webstore.webStore.entity.Product;
import com.webstore.webStore.entity.WishlistCart;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("accountService")
public interface AccountService {

    // Profile
    Customer updateCustomerProfile(Customer customer);

    // Orders
    List<Order> getOrdersForCustomer(Integer customerID);

    // Manage - Wishlist & Cart
    List<WishlistCart> getProducts(Integer customerID, String productType);

    void addRemoveProducts(Product product, Integer customerID, String productType, Integer removeProduct);

    void clearProducts(Integer customerID, String productType);

    void checkOut(List<Product> cartProducts, Integer customerID);
}
