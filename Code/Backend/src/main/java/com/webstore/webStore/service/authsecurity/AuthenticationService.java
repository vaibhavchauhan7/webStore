package com.webstore.webStore.service.authsecurity;

import com.webstore.webStore.entity.customer.Customer;
import org.springframework.stereotype.Service;

@Service("authenticationService")
public interface AuthenticationService {

    void signUpCustomer(Customer customer);
}
