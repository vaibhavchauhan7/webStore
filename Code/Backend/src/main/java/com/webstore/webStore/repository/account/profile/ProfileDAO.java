package com.webstore.webStore.repository.account.profile;

import com.webstore.webStore.entity.customer.Customer;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileDAO {

    Customer updateCustomerProfile(Customer customer);
}
