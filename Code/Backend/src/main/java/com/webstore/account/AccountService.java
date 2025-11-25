package com.webstore.account;

import com.webstore.account.entity.Customer;
import com.webstore.account.entity.Order;
import com.webstore.account.entity.WishlistCart;
import com.webstore.product.entity.Product;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AccountService extends UserDetailsService {

    Customer getAuthenticatedCustomer();

    Customer updateProfile(Customer customer);

    List<Order> getOrders(Integer customerId);

    List<WishlistCart> getProducts(Integer customerId, String type);

    void modifyProduct(Product product, Integer customerId, String type, Integer removeProduct);

    void clearProducts(Integer customerId, String type);

    void checkOut(List<Product> cartProducts, Integer customerId);

    void resetCustomer();

}
