package com.webstore.webStore.controller.customer;

import com.webstore.webStore.entity.customer.Customer;
import com.webstore.webStore.repository.customer.CustomerRepository;
import com.webstore.webStore.service.customer.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CustomerController {

    private final CustomerRepository customerRepository;
    private final CustomerService customerService;

    @Autowired
    private CustomerController(CustomerRepository customerRepository, CustomerService customerService) {
        this.customerRepository = customerRepository;
        this.customerService = customerService;
    }

    @GetMapping("/customers")
    private List<Customer> getCustomers() {
        return customerRepository.findAll();
    }

    @GetMapping("/customer/{customerID}")
    private Customer getCustomerByID(@PathVariable int customerID) {
        Optional<Customer> optionalCustomer = customerRepository.findById(customerID);
        return optionalCustomer.orElse(null);
    }

    @GetMapping("/customer/details")
    private Customer getAuthenticatedCustomer() {
        return customerService.getAuthenticatedCustomer();
    }
}
