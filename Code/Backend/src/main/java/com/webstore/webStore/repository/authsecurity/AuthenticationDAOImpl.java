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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Repository
public class AuthenticationDAOImpl implements AuthenticationDAO {

    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final CustomerDAO customerDAO;
    private final CustomerService customerService;
    private final JwtUtil jwtTokenUtil;

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Autowired
    public AuthenticationDAOImpl(AuthenticationManager authenticationManager,
                                 BCryptPasswordEncoder bCryptPasswordEncoder,
                                 CustomerDAO customerDAO,
                                 CustomerService customerService,
                                 JwtUtil jwtTokenUtil) {
        this.authenticationManager = authenticationManager;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.customerDAO = customerDAO;
        this.customerService = customerService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public void customerSignUp(Customer customer) {
        String sql = "{call spCustomerSignUp(?,?,?,?,?)}";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            CallableStatement callableStatement = connection.prepareCall(sql);

            String bCryptEncodedPassword = bCryptPasswordEncoder.encode(customer.getPassword());

            callableStatement.setString(1, customer.getFirstName());
            callableStatement.setString(2, customer.getLastName());
            callableStatement.setString(3, customer.getEmail());
            callableStatement.setString(4, customer.getPhone());
            callableStatement.setString(5, bCryptEncodedPassword);
            callableStatement.execute();

            callableStatement.close();
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
    }

    @Override
    public ResponseEntity<AuthenticationResponse> customerLogin(AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException badCredentialsException) {
            throw new Exception("Incorrect Email / Password", badCredentialsException);
        }

        final UserDetails userDetails = customerService.loadUserByUsername(authenticationRequest.getEmail());
        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(customerDAO.getCustomerByEmail(authenticationRequest.getEmail()), token));
    }

    @Override
    public void updatePassword(Customer customer, String newPassword) {
        String sql = "{call spForgotPassword(?,?,?)}";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            CallableStatement callableStatement = connection.prepareCall(sql);

            String bCryptEncodedPassword = bCryptPasswordEncoder.encode(newPassword);

            callableStatement.setString(1, customer.getEmail());
            callableStatement.setString(2, customer.getPhone());
            callableStatement.setString(3, bCryptEncodedPassword);
            callableStatement.execute();

            callableStatement.close();
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
    }
}
