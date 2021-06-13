package com.webstore.webStore.security;

import com.webstore.webStore.account.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthenticationRepository extends JpaRepository<Customer, Integer> {
}
