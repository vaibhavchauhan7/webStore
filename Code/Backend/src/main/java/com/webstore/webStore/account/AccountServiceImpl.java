package com.webstore.webStore.account;

import com.webstore.webStore.account.entity.Customer;
import com.webstore.webStore.account.entity.Order;
import com.webstore.webStore.account.entity.WishlistCart;
import com.webstore.webStore.product.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountDAO accountDAO;
    private Customer customer;

    @Autowired
    public AccountServiceImpl(AccountDAO accountDAO) {
        this.accountDAO = accountDAO;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if (customer == null) customer = accountDAO.getCustomerByEmail(email);
        return new User(customer.getEmail(), customer.getPassword(), new ArrayList<>());
    }

    @Override
    public Customer getAuthenticatedCustomer() {
        return customer;
    }

    @Override
    public Customer updateProfile(Customer customer) {
        return accountDAO.updateProfile(customer);
    }

    @Override
    public List<Order> getOrders(Integer customerId) {
        return accountDAO.getOrders(customerId);
    }

    @Override
    public List<WishlistCart> getProducts(Integer customerId, String type) {
        return accountDAO.getProducts(customerId, type);
    }

    @Override
    public void modifyProduct(Product product, Integer customerId, String type, Integer removeProduct) {
        accountDAO.modifyProduct(product, customerId, type, removeProduct);
    }

    @Override
    public void clearProducts(Integer customerId, String type) {
        accountDAO.clearProducts(customerId, type);
    }

    @Override
    public void checkOut(List<Product> cartProducts, Integer customerId) {
        accountDAO.checkOut(cartProducts, customerId);
    }

    @Override
    public void resetCustomer() {
        customer = null;
    }

}
