package com.webstore.webStore.repository.authsecurity;

import com.webstore.webStore.entity.authsecurity.AuthenticationRequest;
import com.webstore.webStore.entity.authsecurity.AuthenticationResponse;
import com.webstore.webStore.entity.customer.Customer;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthenticationDAO {

    void customerSignUp(Customer customer);

    ResponseEntity<AuthenticationResponse> customerLogin(AuthenticationRequest authenticationRequest) throws Exception;

    void updatePassword(Customer customer, String newPassword);
}
