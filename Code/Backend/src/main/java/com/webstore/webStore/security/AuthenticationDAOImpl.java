package com.webstore.webStore.security;

import com.webstore.webStore.account.AccountService;
import com.webstore.webStore.account.entity.Customer;
import com.webstore.webStore.security.entity.AuthenticationRequest;
import com.webstore.webStore.security.entity.AuthenticationResponse;
import com.webstore.webStore.security.jwt.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class AuthenticationDAOImpl implements AuthenticationDAO {

    private final AccountService accountService;
    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtUtil jwtTokenUtil;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public void customerSignUp(Customer customer) {
        String sql = "{call spCustomerSignUp(:firstName, :lastName, :email, :phone, :password)}";

        String bCryptEncodedPassword = bCryptPasswordEncoder.encode(customer.getPassword());
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("firstName", customer.getFirstName())
                .addValue("lastName", customer.getLastName())
                .addValue("email", customer.getEmail())
                .addValue("phone", customer.getPhone())
                .addValue("password", bCryptEncodedPassword);
        namedParameterJdbcTemplate.update(sql, params);
    }

    @Override
    public ResponseEntity<AuthenticationResponse> customerLogin(AuthenticationRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        } catch (BadCredentialsException badCredentialsException) {
            throw new Exception("Incorrect Email / Password", badCredentialsException);
        }

        final UserDetails userDetails = accountService.loadUserByUsername(authRequest.getEmail());
        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(accountService.getAuthenticatedCustomer(), token));
    }

    @Override
    public void updatePassword(Customer customer, String newPassword) {
        String sql = "{call spForgotPassword(:email, :phone, :password)}";

        String bCryptEncodedPassword = bCryptPasswordEncoder.encode(newPassword);
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("email", customer.getEmail())
                .addValue("phone", customer.getPhone())
                .addValue("password", bCryptEncodedPassword);

        namedParameterJdbcTemplate.update(sql, params);
    }

}
