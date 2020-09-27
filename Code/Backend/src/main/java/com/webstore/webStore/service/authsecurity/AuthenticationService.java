package com.webstore.webStore.service.authsecurity;

import com.webstore.webStore.entity.authsecurity.AuthenticationRequest;
import com.webstore.webStore.entity.authsecurity.AuthenticationResponse;
import com.webstore.webStore.entity.customer.Customer;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service("authenticationService")
public interface AuthenticationService {

    void customerSignUp(Customer customer);

    ResponseEntity<AuthenticationResponse> customerLogin(AuthenticationRequest authenticationRequest) throws Exception;

    void updatePassword(Customer customer, String newPassword);
}
