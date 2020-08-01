package com.webstore.webStore.service.authsecurity;

import com.webstore.webStore.entity.authsecurity.AuthenticationRequest;
import com.webstore.webStore.entity.authsecurity.AuthenticationResponse;
import com.webstore.webStore.entity.customer.Customer;
import com.webstore.webStore.repository.authsecurity.AuthenticationDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service("authenticationService")
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationDAO authenticationDAO;

    @Autowired
    public AuthenticationServiceImpl(AuthenticationDAO authenticationDAO) {
        this.authenticationDAO = authenticationDAO;
    }

    @Override
    public void customerSignUp(Customer customer) throws Exception {
        authenticationDAO.customerSignUp(customer);
    }

    @Override
    public ResponseEntity<AuthenticationResponse> customerLogin(AuthenticationRequest authenticationRequest) throws Exception {
        return authenticationDAO.customerLogin(authenticationRequest);
    }
}
