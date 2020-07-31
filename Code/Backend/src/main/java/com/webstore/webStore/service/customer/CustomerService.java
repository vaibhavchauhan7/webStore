package com.webstore.webStore.service.customer;

import com.webstore.webStore.entity.customer.Customer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("customerService")
public interface CustomerService {

    List<Customer> getCustomers();

    Customer getCustomerByID(int customerID);
}
