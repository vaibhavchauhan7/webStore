package com.webstore.security;

import com.webstore.account.AccountDAO;
import com.webstore.account.entity.Customer;
import com.webstore.security.entity.AuthenticationRequest;
import com.webstore.security.entity.AuthenticationResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationDAO authenticationDAO;
    private final AccountDAO accountDAO;

    @Override
    public void customerSignUp(Customer customer) {
        Customer dbCustomer = accountDAO.getCustomerByEmail(customer.getEmail());
        if (dbCustomer == null) authenticationDAO.customerSignUp(customer);
    }

    @Override
    public ResponseEntity<AuthenticationResponse> customerLogin(AuthenticationRequest authRequest) throws Exception {
        return authenticationDAO.customerLogin(authRequest);
    }

    @Override
    public void updatePassword(Customer customer, String newPassword) {
        authenticationDAO.updatePassword(customer, newPassword);
    }

}
