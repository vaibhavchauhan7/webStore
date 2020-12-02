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
    public Customer updateCustomerProfile(Customer customer) {
        return accountDAO.updateCustomerProfile(customer);
    }

    @Override
    public List<Order> getOrdersForCustomer(Integer customerID) {
        return accountDAO.getOrdersForCustomer(customerID);
    }

    @Override
    public List<WishlistCart> getProducts(Integer customerID, String productType) {
        return accountDAO.getProducts(customerID, productType);
    }

    @Override
    public void addRemoveProducts(Product product, Integer customerID, String productType, Integer removeProduct) {
        accountDAO.addRemoveProducts(product, customerID, productType, removeProduct);
    }

    @Override
    public void clearProducts(Integer customerID, String productType) {
        accountDAO.clearProducts(customerID, productType);
    }

    @Override
    public void checkOut(List<Product> cartProducts, Integer customerID) {
        accountDAO.checkOut(cartProducts, customerID);
    }
}
