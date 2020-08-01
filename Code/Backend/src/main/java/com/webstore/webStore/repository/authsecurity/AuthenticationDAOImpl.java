package com.webstore.webStore.repository.authsecurity;

import com.webstore.webStore.entity.customer.Customer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;

@Repository
public class AuthenticationDAOImpl implements AuthenticationDAO {

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Override
    public void signUpCustomer(Customer customer) {
        String sql = "{call spCustomerSignUp(?,?,?,?)}";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            CallableStatement callableStatement = connection.prepareCall(sql);

            callableStatement.setString(1, customer.getName());
            callableStatement.setString(2, customer.getEmail());
            callableStatement.setString(3, customer.getPhone());
            callableStatement.setString(4, customer.getPassword());
            callableStatement.execute();

            callableStatement.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}
