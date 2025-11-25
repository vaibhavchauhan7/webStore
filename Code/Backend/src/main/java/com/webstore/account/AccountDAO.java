package com.webstore.account;

import com.webstore.account.entity.Customer;
import com.webstore.account.entity.Order;
import com.webstore.account.entity.WishlistCart;
import com.webstore.product.entity.Product;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountDAO {

    Customer getCustomerByEmail(String customerEmail);

    Customer updateProfile(Customer customer);

    List<Order> getOrders(Integer customerId);

    List<WishlistCart> getProducts(Integer customerId, String type);

    void modifyProduct(Product product, Integer customerId, String type, Integer removeProduct);

    void clearProducts(Integer customerId, String type);

    void checkOut(List<Product> cartProducts, Integer customerId);

}
