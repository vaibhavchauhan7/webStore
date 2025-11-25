package com.webstore.security.entity;

import com.webstore.account.entity.Customer;

import java.io.Serializable;

public record AuthenticationResponse(Customer customer, String token) implements Serializable {
}
