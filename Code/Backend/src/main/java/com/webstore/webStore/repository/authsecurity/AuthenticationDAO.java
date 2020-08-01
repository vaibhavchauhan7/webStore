package com.webstore.webStore.repository.authsecurity;

import com.webstore.webStore.entity.customer.Customer;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthenticationDAO {

    void signUpCustomer(Customer customer);
}
