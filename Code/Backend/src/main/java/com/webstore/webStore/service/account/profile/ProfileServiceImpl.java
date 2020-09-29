package com.webstore.webStore.service.account.profile;

import com.webstore.webStore.entity.customer.Customer;
import com.webstore.webStore.repository.account.profile.ProfileDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService {

    private final ProfileDAO profileDAO;

    @Autowired
    public ProfileServiceImpl(ProfileDAO profileDAO) {
        this.profileDAO = profileDAO;
    }

    @Override
    public Customer updateCustomerProfile(Customer customer) {
        return profileDAO.updateCustomerProfile(customer);
    }
}
