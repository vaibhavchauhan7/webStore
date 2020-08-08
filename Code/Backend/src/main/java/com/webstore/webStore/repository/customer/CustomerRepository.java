package com.webstore.webStore.repository.customer;

import com.webstore.webStore.entity.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}
