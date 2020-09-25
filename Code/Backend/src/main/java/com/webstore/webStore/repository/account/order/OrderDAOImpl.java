package com.webstore.webStore.repository.account.order;

import com.webstore.webStore.entity.account.Order;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Repository
public class OrderDAOImpl implements OrderDAO {

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Override
    public List<Order> getOrdersForCustomer(Integer customerID) {
        List<Order> orders = new ArrayList<>();

        String sql = "{call spInsertAndGetOrdersForCustomer(?,null)}";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            CallableStatement callableStatement = connection.prepareCall(sql);

            callableStatement.setInt(1, customerID);
            callableStatement.executeQuery();
            ResultSet resultSet = callableStatement.getResultSet();

            while (resultSet.next()) {
                Order order = new Order();
                order.setOrderID(resultSet.getInt("OrderID"));
                order.setOrderNumber(resultSet.getInt("OrderNumber"));
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
}
