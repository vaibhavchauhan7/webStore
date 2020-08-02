package com.webstore.webStore.service.customer;

import com.webstore.webStore.entity.customer.Customer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("customerService")
public interface CustomerService extends UserDetailsService {

    List<Customer> getCustomers();

    Customer getCustomerByID(int customerID);

    Customer getCustomerByEmail(String customerEmail);
}
