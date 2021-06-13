package com.webstore.webStore.security.entity;

import java.io.Serializable;

public class AuthenticationRequest implements Serializable {

    private String email;
    private String password;

    // Need Default Constructor for JSON Parsing
    public AuthenticationRequest() {
    }

    public AuthenticationRequest(String email, String password) {
        this.setEmail(email);
        this.setPassword(password);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
