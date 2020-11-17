package com.webstore.webStore.service.customer;

import com.webstore.webStore.entity.Customer;
import com.webstore.webStore.repository.customer.CustomerDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service("customerService")
public class CustomerServiceImpl implements CustomerService {

    private final CustomerDAO customerDAO;
    private Customer customer;

    @Autowired
    public CustomerServiceImpl(CustomerDAO customerDAO) {
        this.customerDAO = customerDAO;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if (customer == null) {
            customer = customerDAO.getCustomerByEmail(email);
        }
        return new User(customer.getEmail(), customer.getPassword(), new ArrayList<>());
    }

    @Override
    public Customer getAuthenticatedCustomer() {
        return customer;
    }

    @Override
    public void resetCustomer() {
        customer = null;
    }
}
