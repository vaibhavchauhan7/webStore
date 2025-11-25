package com.webstore.security;

import com.webstore.account.entity.Customer;
import com.webstore.security.entity.AuthenticationRequest;
import com.webstore.security.entity.AuthenticationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface AuthenticationService {

    void customerSignUp(Customer customer);

    ResponseEntity<AuthenticationResponse> customerLogin(AuthenticationRequest authRequest) throws Exception;

    void updatePassword(Customer customer, String newPassword);

}
