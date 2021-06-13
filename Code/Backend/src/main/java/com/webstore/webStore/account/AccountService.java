package com.webstore.webStore.account;

import com.webstore.webStore.account.entity.Customer;
import com.webstore.webStore.account.entity.Order;
import com.webstore.webStore.account.entity.WishlistCart;
import com.webstore.webStore.product.entity.Product;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("accountService")
public interface AccountService extends UserDetailsService {

    Customer getAuthenticatedCustomer();

    Customer updateProfile(Customer customer);

    List<Order> getOrders(Integer customerID);

    List<WishlistCart> getProducts(Integer customerID, String type);

    void modifyProduct(Product product, Integer customerID, String type, Integer removeProduct);

    void clearProducts(Integer customerID, String type);

    void checkOut(List<Product> cartProducts, Integer customerID);

    void resetCustomer();

}
