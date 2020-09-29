package com.webstore.webStore.service.account.profile;

import com.webstore.webStore.entity.customer.Customer;
import org.springframework.stereotype.Service;

@Service("profileService")
public interface ProfileService {

    Customer updateCustomerProfile(Customer customer);
}
