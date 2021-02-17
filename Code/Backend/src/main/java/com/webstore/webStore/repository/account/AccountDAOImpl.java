package com.webstore.webStore.repository.account;

import com.webstore.webStore.entity.Customer;
import com.webstore.webStore.entity.Order;
import com.webstore.webStore.entity.Product;
import com.webstore.webStore.entity.WishlistCart;
import com.webstore.webStore.repository.customer.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class AccountDAOImpl implements AccountDAO {

    private final CustomerRepository customerRepository;

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Autowired
    public AccountDAOImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
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
        Optional<Customer> optionalCustomer = customerRepository.findById(customer.getId());
        return optionalCustomer.orElse(null);
    }

    @Override
    public List<Order> getOrders(Integer customerID) {
        List<Order> orders = new ArrayList<>();

        String sql = "{call spInsertAndGetOrdersForCustomer(?,null)}";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            CallableStatement callableStatement = connection.prepareCall(sql);

            callableStatement.setInt(1, customerID);
            callableStatement.executeQuery();
            ResultSet resultSet = callableStatement.getResultSet();

            while (resultSet.next()) {
                Order order = new Order(); // Maybe we don't need everything from DB here
                order.setOrderID(resultSet.getInt("OrderID"));
                order.setOrderNumber(resultSet.getString("OrderNumber"));
                order.setCustomerID(resultSet.getInt("CustomerID"));
                order.setCustomerName(resultSet.getString("CustomerName"));
                order.setCustomerEmail(resultSet.getString("CustomerEmail"));
                order.setCustomerPhone(resultSet.getString("CustomerPhone"));
                order.setProductID(resultSet.getInt("ProductID"));
                order.setProductName(resultSet.getString("ProductName"));
                order.setProductPrice(resultSet.getString("ProductPrice"));
                order.setPurchaseDate(resultSet.getString("PurchaseDate"));
                order.setPurchaseTime(resultSet.getString("PurchaseTime"));
                order.setProductImagePath(resultSet.getString("ProductImagePath"));
                orders.add(order);
            }

            resultSet.close();
            callableStatement.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return orders;
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
        if (type.equals("Cart")) {
            sql = "DELETE FROM cart WHERE cart.customer_id = ?";
        } else if (type.equals("Wishlist")) {
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
