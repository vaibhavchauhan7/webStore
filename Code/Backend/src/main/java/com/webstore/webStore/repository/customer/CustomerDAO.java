package com.webstore.webStore.repository.customer;

import com.webstore.webStore.entity.Customer;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerDAO {

    Customer getCustomerByEmail(String customerEmail);
}
