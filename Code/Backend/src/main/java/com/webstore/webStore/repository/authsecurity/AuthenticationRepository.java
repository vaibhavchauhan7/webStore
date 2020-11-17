package com.webstore.webStore.repository.authsecurity;

import com.webstore.webStore.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthenticationRepository extends JpaRepository<Customer, Integer> {
}
