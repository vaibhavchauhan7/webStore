package com.webstore.webStore.repository.customer;

import com.webstore.webStore.entity.customer.Customer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
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
        String sql = "{call spGetCustomerByEmail(?)}";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            CallableStatement callableStatement = connection.prepareCall(sql);

            callableStatement.setString(1, customerEmail);
            callableStatement.execute();
            ResultSet resultSet = callableStatement.getResultSet();

            while (resultSet.next()) {
                customer.setId(resultSet.getInt("ID"));
                customer.setName(resultSet.getString("Name"));
                customer.setEmail(resultSet.getString("Email"));
                customer.setPhone(resultSet.getString("Phone"));
                customer.setPassword(resultSet.getString("Password"));
            }

            resultSet.close();
            callableStatement.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return customer;
    }
}
