package com.webstore.webStore.service.customer;

import com.webstore.webStore.entity.customer.Customer;
import com.webstore.webStore.repository.customer.CustomerDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("customerService")
public class CustomerServiceImpl implements CustomerService {

    private final CustomerDAO customerDAO;

    @Autowired
    public CustomerServiceImpl(CustomerDAO customerDAO) {
        this.customerDAO = customerDAO;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Customer customer = customerDAO.getCustomerByEmail(email);
        return new User(customer.getEmail(), customer.getPassword(), new ArrayList<>());
    }

    @Override
    public List<Customer> getCustomers() {
        return customerDAO.getCustomers();
    }

    @Override
    public Customer getCustomerByID(int customerID) {
        return customerDAO.getCustomerByID(customerID);
    }

    @Override
    public Customer getCustomerByEmail(String customerEmail) {
        return customerDAO.getCustomerByEmail(customerEmail);
    }
}
