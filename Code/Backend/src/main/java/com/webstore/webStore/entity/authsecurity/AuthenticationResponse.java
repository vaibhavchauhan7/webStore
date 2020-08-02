package com.webstore.webStore.entity.authsecurity;

import com.webstore.webStore.entity.customer.Customer;

import java.io.Serializable;

public class AuthenticationResponse implements Serializable {

    private final Customer customer;
    private final String token;

    public AuthenticationResponse(Customer customer, String token) {
        this.customer = customer;
        this.token = token;
    }

    public Customer getCustomer() {
        return customer;
    }

    public String getToken() {
        return token;
    }
}
