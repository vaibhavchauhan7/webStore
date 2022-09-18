package com.webstore.webStore.security.entity;

import com.webstore.webStore.account.entity.Customer;

import java.io.Serializable;

public record AuthenticationResponse(Customer customer, String token) implements Serializable {
}
