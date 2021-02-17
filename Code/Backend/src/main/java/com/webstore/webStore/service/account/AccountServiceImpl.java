package com.webstore.webStore.service.account;

import com.webstore.webStore.entity.Customer;
import com.webstore.webStore.entity.Order;
import com.webstore.webStore.entity.Product;
import com.webstore.webStore.entity.WishlistCart;
import com.webstore.webStore.repository.account.AccountDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("accountService")
public class AccountServiceImpl implements AccountService {

    private final AccountDAO accountDAO;

    @Autowired
    public AccountServiceImpl(AccountDAO accountDAO) {
        this.accountDAO = accountDAO;
    }

    @Override
    public Customer updateProfile(Customer customer) {
        return accountDAO.updateProfile(customer);
    }

    @Override
    public List<Order> getOrders(Integer customerID) {
        return accountDAO.getOrders(customerID);
    }

    @Override
    public List<WishlistCart> getProducts(Integer customerID, String type) {
        return accountDAO.getProducts(customerID, type);
    }

    @Override
    public void modifyProduct(Product product, Integer customerID, String type, Integer removeProduct) {
        accountDAO.modifyProduct(product, customerID, type, removeProduct);
    }

    @Override
    public void clearProducts(Integer customerID, String type) {
        accountDAO.clearProducts(customerID, type);
    }

    @Override
    public void checkOut(List<Product> cartProducts, Integer customerID) {
        accountDAO.checkOut(cartProducts, customerID);
    }
}
