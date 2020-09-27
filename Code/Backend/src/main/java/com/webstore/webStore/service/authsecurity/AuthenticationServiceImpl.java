package com.webstore.webStore.service.authsecurity;

import com.webstore.webStore.entity.authsecurity.AuthenticationRequest;
import com.webstore.webStore.entity.authsecurity.AuthenticationResponse;
import com.webstore.webStore.entity.customer.Customer;
import com.webstore.webStore.repository.authsecurity.AuthenticationDAO;
import com.webstore.webStore.repository.customer.CustomerDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service("authenticationService")
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationDAO authenticationDAO;
    private final CustomerDAO customerDAO;

    @Autowired
    public AuthenticationServiceImpl(AuthenticationDAO authenticationDAO,
                                     CustomerDAO customerDAO) {
        this.authenticationDAO = authenticationDAO;
        this.customerDAO = customerDAO;
    }

    @Override
    public void customerSignUp(Customer customer) {
        Customer dbCustomer = customerDAO.getCustomerByEmail(customer.getEmail());
        if (dbCustomer.getEmail() == null) {
            authenticationDAO.customerSignUp(customer);
        }
    }

    @Override
    public ResponseEntity<AuthenticationResponse> customerLogin(AuthenticationRequest authenticationRequest) throws Exception {
        return authenticationDAO.customerLogin(authenticationRequest);
    }

    @Override
    public void updatePassword(Customer customer, String newPassword) {
        authenticationDAO.updatePassword(customer, newPassword);
    }
}
