package com.webstore.webStore.controller.authsecurity;

import com.webstore.webStore.entity.authsecurity.AuthenticationRequest;
import com.webstore.webStore.entity.authsecurity.AuthenticationResponse;
import com.webstore.webStore.entity.authsecurity.forgotpassword.ForgotPassword;
import com.webstore.webStore.entity.authsecurity.forgotpassword.UpdatePassword;
import com.webstore.webStore.entity.customer.Customer;
import com.webstore.webStore.repository.customer.CustomerDAO;
import com.webstore.webStore.service.authsecurity.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final CustomerDAO customerDAO;

    private Customer customer;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService, CustomerDAO customerDAO) {
        this.authenticationService = authenticationService;
        this.customerDAO = customerDAO;
    }

    @PostMapping("/sign-up")
    public void customerSignUp(@RequestBody Customer customer) {
        authenticationService.customerSignUp(customer);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> customerLogin(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        return authenticationService.customerLogin(authenticationRequest);
    }

    @PostMapping("/forgot/confirmAccount")
    public boolean forgotPassword(@RequestBody ForgotPassword forgotPassword) {
        customer = customerDAO.getCustomerByEmail(forgotPassword.getEmail());
        if (customer != null) {
            String customerPhone = customer.getPhone();
            return customerPhone.equals(forgotPassword.getPhone());
        } else {
            return false;
        }
    }

    @PostMapping("/forgot/updatePassword")
    public void updatePassword(@RequestBody UpdatePassword updatePassword) {
        if (customer == null) {
            Customer customer = customerDAO.getCustomerByEmail(updatePassword.getEmail());
            authenticationService.updatePassword(customer, updatePassword.getPassword());
        } else {
            authenticationService.updatePassword(customer, updatePassword.getPassword());
        }
    }
}
