package com.webstore.webStore.controller.account;

import com.webstore.webStore.entity.customer.Customer;
import com.webstore.webStore.service.account.profile.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/profile/update")
    public Customer updateCustomerProfile(@RequestBody Customer customer) {
        return profileService.updateCustomerProfile(customer);
    }
}
