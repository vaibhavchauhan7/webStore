package com.webstore.webStore.repository.account;

import com.webstore.webStore.entity.Customer;
import com.webstore.webStore.entity.Order;
import com.webstore.webStore.entity.Product;
import com.webstore.webStore.entity.WishlistCart;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountDAO {

    // Profile
    Customer updateCustomerProfile(Customer customer);

    // Orders
    List<Order> getOrdersForCustomer(Integer customerID);

    // Manage - Wishlist & Cart
    List<WishlistCart> getProducts(Integer customerID, String productType);

    void addRemoveProducts(Product product, Integer customerID, String productType, Integer removeProduct);

    void clearProducts(Integer customerID, String productType);

    boolean checkOut(List<Product> cartProducts, Integer customerID);
}
