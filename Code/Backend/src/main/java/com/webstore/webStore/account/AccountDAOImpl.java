package com.webstore.webStore.account;

import com.webstore.webStore.account.entity.Customer;
import com.webstore.webStore.account.entity.Order;
import com.webstore.webStore.account.entity.WishlistCart;
import com.webstore.webStore.product.entity.Product;
import com.webstore.webStore.shared.utils.WSRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class AccountDAOImpl implements AccountDAO {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Autowired
    public AccountDAOImpl(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @Override
    public Customer getCustomerByEmail(String customerEmail) {
        String sql = "SELECT * FROM customers c WHERE c.email = :customerEmail";

        try{
            MapSqlParameterSource params = new MapSqlParameterSource();
            params.addValue("customerEmail", customerEmail);
            RowMapper<Customer> mapper = WSRowMapper.newInstance(Customer.class);
            List<Customer> customers = namedParameterJdbcTemplate.query(sql, params, mapper);
            return customers.size() == 1 ? customers.get(0) : null;
        } catch (Exception exception) {
            exception.printStackTrace();
            throw exception;
        }
    }

    // TODO: Fix - Multiple Profile Issues
    @Override
    public Customer updateProfile(Customer customer) {
        String sql = "UPDATE customers SET first_name = ?, last_name = ? WHERE id = ?";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            PreparedStatement preparedStatement = connection.prepareCall(sql);

            preparedStatement.setString(1, customer.getFirstName());
            preparedStatement.setString(2, customer.getLastName());
            preparedStatement.setInt(3, customer.getId());
            preparedStatement.execute();

            preparedStatement.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return getCustomerByEmail(customer.getEmail());
    }

    @Override
    public List<Order> getOrders(Integer customerID) {
        String sql = "{call spInsertAndGetOrdersForCustomer(:customerID, null)}";

        try {
            MapSqlParameterSource params = new MapSqlParameterSource();
            params.addValue("customerID", customerID);
            RowMapper<Order> mapper = WSRowMapper.newInstance(Order.class);
            return namedParameterJdbcTemplate.query(sql, params, mapper);
        } catch (Exception exception) {
            exception.printStackTrace();
            throw exception;
        }
    }

    @Override
    public List<WishlistCart> getProducts(Integer customerID, String type) {
        List<WishlistCart> products = new ArrayList<>();

        String sql = "{call spManageCartWishlist(?,null,?,0)}";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            CallableStatement callableStatement = connection.prepareCall(sql);

            callableStatement.setInt(1, customerID);
            callableStatement.setString(2, type);

            callableStatement.executeQuery();
            ResultSet resultSet = callableStatement.getResultSet();

            while (resultSet.next()) {
                WishlistCart product = new WishlistCart();
                product.setId(resultSet.getInt("ProductID"));
                product.setName(resultSet.getString("ProductName"));
                product.setImagePath(resultSet.getString("ProductImagePath"));
                product.setPrice(resultSet.getString("ProductPrice"));
                if (type.equals("Cart")) {
                    product.setQuantity(resultSet.getInt("ProductQuantity"));
                } else {
                    product.setQuantity(null);
                }
                products.add(product);
            }

            resultSet.close();
            callableStatement.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return products;
    }

    @Override
    public void modifyProduct(Product product, Integer customerID, String type, Integer removeProduct) {
        String sql = "{call spManageCartWishlist(?,?,?,?)}";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            CallableStatement callableStatement = connection.prepareCall(sql);

            callableStatement.setInt(1, customerID);
            callableStatement.setInt(2, product.getId());
            callableStatement.setString(3, type);
            callableStatement.setInt(4, removeProduct);
            callableStatement.execute();

            callableStatement.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public void clearProducts(Integer customerID, String type) {
        String sql;
        if ("Cart".equals(type)) {
            sql = "DELETE FROM cart WHERE cart.customer_id = ?";
        } else if ("Wishlist".equals(type)) {
            sql = "DELETE FROM wishlist WHERE wishlist.customer_id = ?";
        } else {
            sql = "";
        }
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            PreparedStatement preparedStatement = connection.prepareCall(sql);

            preparedStatement.setInt(1, customerID);
            preparedStatement.execute();

            preparedStatement.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public void checkOut(List<Product> cartProducts, Integer customerID) {
        String sql = "{call spInsertAndGetOrdersForCustomer(?,?)}";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            CallableStatement callableStatement = connection.prepareCall(sql);

            callableStatement.setInt(1, customerID);
            for (Product cartProduct : cartProducts) {
                callableStatement.setInt(2, cartProduct.getId());
                callableStatement.execute();
            }

            callableStatement.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

}
