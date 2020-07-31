package com.webstore.webStore.repository.customer;

import com.webstore.webStore.entity.customer.Customer;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerDAO {

    List<Customer> getCustomers();

    Customer getCustomerByID(int customerID);
}
