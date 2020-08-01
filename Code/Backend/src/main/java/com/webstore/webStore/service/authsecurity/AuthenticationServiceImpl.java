package com.webstore.webStore.service.authsecurity;

import com.webstore.webStore.entity.customer.Customer;
import com.webstore.webStore.repository.authsecurity.AuthenticationDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("authenticationService")
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationDAO authenticationDAO;

    @Autowired
    public AuthenticationServiceImpl(AuthenticationDAO authenticationDAO) {
        this.authenticationDAO = authenticationDAO;
    }

    @Override
    public void signUpCustomer(Customer customer) {
        authenticationDAO.signUpCustomer(customer);
    }
}
