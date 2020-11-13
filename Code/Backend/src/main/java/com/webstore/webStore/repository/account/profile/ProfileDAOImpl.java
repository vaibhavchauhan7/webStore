package com.webstore.webStore.repository.account.profile;

import com.webstore.webStore.entity.customer.Customer;
import com.webstore.webStore.repository.customer.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Optional;

@Repository
public class ProfileDAOImpl implements ProfileDAO {

    private final CustomerRepository customerRepository;

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Autowired
    public ProfileDAOImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    // TODO: Fix - Multiple Profile Issues
    @Override
    public Customer updateCustomerProfile(Customer customer) {
        String sql = "{call spUpdateCustomerProfile(?,?,?,?,?)}";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            CallableStatement callableStatement = connection.prepareCall(sql);

            callableStatement.setInt(1, customer.getId());
            callableStatement.setString(2, customer.getFirstName());
            callableStatement.setString(3, customer.getLastName());
            callableStatement.setString(4, customer.getEmail());
            callableStatement.setString(5, customer.getPhone());

            callableStatement.execute();

            callableStatement.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        Optional<Customer> optionalCustomer = customerRepository.findById(customer.getId());
        return optionalCustomer.orElse(null);
    }
}
