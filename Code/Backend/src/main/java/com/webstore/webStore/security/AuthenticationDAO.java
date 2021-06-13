package com.webstore.webStore.security;

import com.webstore.webStore.account.entity.Customer;
import com.webstore.webStore.security.entity.AuthenticationRequest;
import com.webstore.webStore.security.entity.AuthenticationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthenticationDAO {

    void customerSignUp(Customer customer);

    ResponseEntity<AuthenticationResponse> customerLogin(AuthenticationRequest authenticationRequest) throws Exception;

    void updatePassword(Customer customer, String newPassword);

}
