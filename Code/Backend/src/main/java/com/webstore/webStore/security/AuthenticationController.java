package com.webstore.webStore.security;

import com.webstore.webStore.account.AccountDAO;
import com.webstore.webStore.account.AccountService;
import com.webstore.webStore.account.entity.Customer;
import com.webstore.webStore.security.entity.AuthenticationRequest;
import com.webstore.webStore.security.entity.AuthenticationResponse;
import com.webstore.webStore.security.entity.ForgotPassword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/authentication")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final AccountService accountService;
    private final AccountDAO accountDAO;

    private Customer customer;

    @Autowired
    private AuthenticationController(AuthenticationService authenticationService,
                                     AccountService accountService,
                                     AccountDAO accountDAO) {
        this.authenticationService = authenticationService;
        this.accountService = accountService;
        this.accountDAO = accountDAO;
    }

    @PostMapping("/sign-up")
    private void customerSignUp(@RequestBody Customer customer) {
        authenticationService.customerSignUp(customer);
    }

    @PostMapping("/login")
    private ResponseEntity<AuthenticationResponse>
    customerLogin(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        return authenticationService.customerLogin(authenticationRequest);
    }

    @PostMapping("/logout")
    private void customerLogout() {
        accountService.resetCustomer();
    }

    @PostMapping("/forgot/confirm")
    private boolean forgotPassword(@RequestBody ForgotPassword forgotPassword) {
        customer = accountDAO.getCustomerByEmail(forgotPassword.getEmail());
        if (customer != null) {
            String customerPhone = customer.getPhone();
            return customerPhone.equals(forgotPassword.getPhone());
        } else {
            return false;
        }
    }

    @PostMapping("/forgot/update")
    private void updatePassword(@RequestBody AuthenticationRequest updatePassword) {
        if (customer == null) {
            Customer customer = accountDAO.getCustomerByEmail(updatePassword.getEmail());
            authenticationService.updatePassword(customer, updatePassword.getPassword());
        } else {
            authenticationService.updatePassword(customer, updatePassword.getPassword());
        }
    }

}
