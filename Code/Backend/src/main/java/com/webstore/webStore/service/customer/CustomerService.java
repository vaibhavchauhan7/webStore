package com.webstore.webStore.service.customer;

import com.webstore.webStore.entity.customer.Customer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service("customerService")
public interface CustomerService extends UserDetailsService {

    Customer getCustomerByEmail(String customerEmail);
}
