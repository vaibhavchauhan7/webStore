package com.webstore.webStore.repository.authsecurity;

import com.webstore.webStore.controller.authsecurity.jwt.JwtUtil;
import com.webstore.webStore.entity.authsecurity.AuthenticationRequest;
import com.webstore.webStore.entity.authsecurity.AuthenticationResponse;
import com.webstore.webStore.entity.customer.Customer;
import com.webstore.webStore.repository.customer.CustomerDAO;
import com.webstore.webStore.service.customer.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Repository
public class AuthenticationDAOImpl implements AuthenticationDAO {

    private final CustomerDAO customerDAO;
    private final CustomerService customerService;
    private final JwtUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Autowired
    public AuthenticationDAOImpl(CustomerDAO customerDAO,
                                 AuthenticationManager authenticationManager,
                                 JwtUtil jwtTokenUtil,
                                 CustomerService customerService) {
        this.customerDAO = customerDAO;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.customerService = customerService;
    }

    @Override
    public void customerSignUp(Customer customer) throws Exception {
        Customer dbCustomer = customerDAO.getCustomerByEmail(customer.getEmail());
        if (dbCustomer.getEmail() != null) {
            throw new Exception("Customer Already Exist");
        } else {
            String sql = "{call spCustomerSignUp(?,?,?,?)}";
            try (Connection connection = DriverManager.getConnection(url, username, password)) {
                CallableStatement callableStatement = connection.prepareCall(sql);

                callableStatement.setString(1, customer.getName());
                callableStatement.setString(2, customer.getEmail());
                callableStatement.setString(3, customer.getPhone());
                callableStatement.setString(4, customer.getPassword());
                callableStatement.execute();

                callableStatement.close();
            } catch (SQLException sqlException) {
                throw new Exception("Couldn't SignUp. An error occurred!", sqlException);
            }
        }
    }

    @Override
    public ResponseEntity<AuthenticationResponse> customerLogin(AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(), authenticationRequest.getPassword())
            );
            // For some reason catch block is not executing now but was working earlier
        } catch (BadCredentialsException badCredentialsException) {
            throw new Exception("Incorrect Email / Password", badCredentialsException);
        }

        final UserDetails userDetails = customerService.loadUserByUsername(authenticationRequest.getEmail());
        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(token));
    }
}
