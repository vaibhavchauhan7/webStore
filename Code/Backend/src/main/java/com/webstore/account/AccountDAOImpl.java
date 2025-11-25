package com.webstore.account;

import com.webstore.account.entity.Customer;
import com.webstore.account.entity.Order;
import com.webstore.account.entity.WishlistCart;
import com.webstore.product.entity.Product;
import com.webstore.utils.H2StoredProcedures;
import com.webstore.utils.WSRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import static com.webstore.utils.WebStoreEnums.CART;
import static com.webstore.utils.WebStoreEnums.WISHLIST;

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

        try {
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

//    @Override
//    public List<Order> getOrders(Integer customerId) {
//        String sql = "{call spInsertAndGetOrdersForCustomer(:customerId, null)}";
//
//        try {
//            MapSqlParameterSource params = new MapSqlParameterSource();
//            params.addValue("customerId", customerId);
//            RowMapper<Order> mapper = WSRowMapper.newInstance(Order.class);
//            return namedParameterJdbcTemplate.query(sql, params, mapper);
//        } catch (Exception exception) {
//            exception.printStackTrace();
//            throw exception;
//        }
//    }

    @Override
    public List<Order> getOrders(Integer customerId) {
        try {
            return namedParameterJdbcTemplate.getJdbcTemplate().execute((Connection conn) -> {
                try (ResultSet rs = H2StoredProcedures.spInsertAndGetOrdersForCustomer(conn, customerId, null)) {
                    List<Order> orders = new ArrayList<>();
                    RowMapper<Order> mapper = WSRowMapper.newInstance(Order.class);
                    int rowNum = 0;
                    while (rs.next()) {
                        orders.add(mapper.mapRow(rs, rowNum++));
                    }
                    return orders;
                }
            });
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new RuntimeException(exception);
        }
    }

//    @Override
//    public List<WishlistCart> getProducts(Integer customerId, String type) {
//        List<WishlistCart> products = new ArrayList<>();
//        String sql = "{call spManageCartWishlist(?,null,?,0)}";
//
//        try (Connection connection = DriverManager.getConnection(url, username, password)) {
//            CallableStatement callableStatement = connection.prepareCall(sql);
//
//            callableStatement.setInt(1, customerId);
//            callableStatement.setString(2, type);
//
//            callableStatement.executeQuery();
//            ResultSet resultSet = callableStatement.getResultSet();
//
//            while (resultSet.next()) {
//                WishlistCart product = new WishlistCart();
//                product.setId(resultSet.getInt("ProductId"));
//                product.setName(resultSet.getString("ProductName"));
//                product.setImagePath(resultSet.getString("ProductImagePath"));
//                product.setPrice(resultSet.getString("ProductPrice"));
//                if (type.equals(CART)) product.setQuantity(resultSet.getInt("ProductQuantity"));
//                else product.setQuantity(null);
//
//                products.add(product);
//            }
//
//            resultSet.close();
//            callableStatement.close();
//        } catch (Exception exception) {
//            exception.printStackTrace();
//        }
//
//        return products;
//    }

    @Override
    public List<WishlistCart> getProducts(Integer customerId, String type) {
        List<WishlistCart> products = new ArrayList<>();

        try {
            products = namedParameterJdbcTemplate.getJdbcTemplate().execute((Connection conn) -> {
                try (ResultSet rs = H2StoredProcedures.spManageCartWishlist(conn, customerId, null, type, 0, 1)) {
                    List<WishlistCart> list = new ArrayList<>();
                    while (rs.next()) {
                        WishlistCart product = new WishlistCart();
                        product.setId(rs.getInt("ProductId"));
                        product.setName(rs.getString("ProductName"));
                        product.setImagePath(rs.getString("ProductImagePath"));
                        product.setPrice(rs.getString("ProductPrice"));
                        product.setQuantity("Cart".equalsIgnoreCase(type) ? rs.getInt("ProductQuantity") : null);
                        list.add(product);
                    }
                    return list;
                }
            });
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return products;
    }

//    @Override
//    public void modifyProduct(Product product, Integer customerId, String type, Integer removeProduct) {
//        String sql = "{call spManageCartWishlist(?,?,?,?)}";
//
//        try (Connection connection = DriverManager.getConnection(url, username, password)) {
//            CallableStatement callableStatement = connection.prepareCall(sql);
//
//            callableStatement.setInt(1, customerId);
//            callableStatement.setInt(2, product.getId());
//            callableStatement.setString(3, type);
//            callableStatement.setInt(4, removeProduct);
//            callableStatement.execute();
//
//            callableStatement.close();
//        } catch (Exception exception) {
//            exception.printStackTrace();
//        }
//    }

    @Override
    public void modifyProduct(Product product, Integer customerId, String type, Integer removeProduct) {
        try {
            namedParameterJdbcTemplate.getJdbcTemplate().execute((Connection conn) -> {
                H2StoredProcedures.spManageCartWishlist(conn, customerId, product.getId(), type, removeProduct, 1);
                return null;
            });
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public void clearProducts(Integer customerId, String type) {
        String sql = "";    // TODO : Empty SQL throws an error just in case the 'type' is not set

        if (CART.equals(type)) sql = "DELETE FROM cart WHERE cart.customer_id = ?";
        if (WISHLIST.equals(type)) sql = "DELETE FROM wishlist WHERE wishlist.customer_id = ?";

        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            PreparedStatement preparedStatement = connection.prepareCall(sql);

            preparedStatement.setInt(1, customerId);
            preparedStatement.execute();

            preparedStatement.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

//    @Override
//    public void checkOut(List<Product> cartProducts, Integer customerId) {
//        String sql = "{call spInsertAndGetOrdersForCustomer(?,?)}";
//
//        try (Connection connection = DriverManager.getConnection(url, username, password)) {
//            CallableStatement callableStatement = connection.prepareCall(sql);
//
//            callableStatement.setInt(1, customerId);
//            for (Product cartProduct : cartProducts) {
//                callableStatement.setInt(2, cartProduct.getId());
//                callableStatement.execute();
//            }
//
//            callableStatement.close();
//        } catch (Exception exception) {
//            exception.printStackTrace();
//        }
//    }

    @Override
    public void checkOut(List<Product> cartProducts, Integer customerId) {
        try {
            namedParameterJdbcTemplate.getJdbcTemplate().execute((Connection conn) -> {
                for (Product cartProduct : cartProducts) {
                    H2StoredProcedures.spInsertAndGetOrdersForCustomer(conn, customerId, cartProduct.getId());
                }
                return null;
            });
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

}
