package com.webstore.webStore.controller.authsecurity;

import com.webstore.webStore.entity.Customer;
import com.webstore.webStore.entity.authsecurity.AuthenticationRequest;
import com.webstore.webStore.entity.authsecurity.AuthenticationResponse;
import com.webstore.webStore.entity.authsecurity.forgotpassword.ForgotPassword;
import com.webstore.webStore.entity.authsecurity.forgotpassword.UpdatePassword;
import com.webstore.webStore.repository.customer.CustomerDAO;
import com.webstore.webStore.service.authsecurity.AuthenticationService;
import com.webstore.webStore.service.customer.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/authentication")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final CustomerService customerService;
    private final CustomerDAO customerDAO;

    private Customer customer;

    @Autowired
    private AuthenticationController(AuthenticationService authenticationService, CustomerService customerService, CustomerDAO customerDAO) {
        this.authenticationService = authenticationService;
        this.customerService = customerService;
        this.customerDAO = customerDAO;
    }

    @PostMapping("/sign-up")
    private void customerSignUp(@RequestBody Customer customer) {
        authenticationService.customerSignUp(customer);
    }

    @PostMapping("/login")
    private ResponseEntity<AuthenticationResponse> customerLogin(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        return authenticationService.customerLogin(authenticationRequest);
    }

    @PostMapping("/logout")
    private void customerLogout() {
        customerService.resetCustomer();
    }

    @PostMapping("/forgot/confirmAccount")
    private boolean forgotPassword(@RequestBody ForgotPassword forgotPassword) {
        customer = customerDAO.getCustomerByEmail(forgotPassword.getEmail());
        if (customer.getEmail() != null && customer.getPhone() != null) {
            String customerPhone = customer.getPhone();
            return customerPhone.equals(forgotPassword.getPhone());
        } else {
            return false;
        }
    }

    @PostMapping("/forgot/updatePassword")
    private void updatePassword(@RequestBody UpdatePassword updatePassword) {
        if (customer == null) {
            Customer customer = customerDAO.getCustomerByEmail(updatePassword.getEmail());
            authenticationService.updatePassword(customer, updatePassword.getPassword());
        } else {
            authenticationService.updatePassword(customer, updatePassword.getPassword());
        }
    }
}
