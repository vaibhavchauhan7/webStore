package com.webstore.webStore.controller.customer;

import com.webstore.webStore.controller.authsecurity.jwt.JwtUtil;
import com.webstore.webStore.entity.customer.Customer;
import com.webstore.webStore.service.customer.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CustomerController {

    private final CustomerService customerService;
    private final JwtUtil jwtUtil;

    @Autowired
    public CustomerController(CustomerService customerService, JwtUtil jwtUtil) {
        this.customerService = customerService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/customers")
    public List<Customer> getCustomers() {
        return customerService.getCustomers();
    }

    @GetMapping("/customer/{customerID}")
    public Customer getCustomerByID(@PathVariable int customerID) {
        return customerService.getCustomerByID(customerID);
    }

    @GetMapping("/customer/details/{token}")
    public Customer getCustomerByEmail(@PathVariable String token) {
        String email = jwtUtil.extractUsername(token);
        return customerService.getCustomerByEmail(email);
    }
}
