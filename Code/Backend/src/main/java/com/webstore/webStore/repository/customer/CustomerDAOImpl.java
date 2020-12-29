package com.webstore.webStore.repository.customer;

import com.webstore.webStore.entity.Customer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Repository
public class CustomerDAOImpl implements CustomerDAO {

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Override
    public Customer getCustomerByEmail(String customerEmail) {
        Customer customer = new Customer();
        String sql = "SELECT * FROM customers c WHERE c.email = ?";

        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            PreparedStatement preparedStatement = connection.prepareCall(sql);

            preparedStatement.setString(1, customerEmail);
            preparedStatement.executeQuery();
            ResultSet resultSet = preparedStatement.getResultSet();

            while (resultSet.next()) {
                customer.setId(resultSet.getInt("id"));
                customer.setFirstName(resultSet.getString("first_name"));
                customer.setLastName(resultSet.getString("last_name"));
                customer.setEmail(resultSet.getString("email"));
                customer.setPhone(resultSet.getString("phone"));
                customer.setPassword(resultSet.getString("password"));
            }

            resultSet.close();
            preparedStatement.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return customer;
    }
}
