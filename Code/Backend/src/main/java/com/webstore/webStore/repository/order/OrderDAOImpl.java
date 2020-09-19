package com.webstore.webStore.repository.order;

import com.webstore.webStore.entity.product.Product;
import com.webstore.webStore.repository.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class OrderDAOImpl implements OrderDAO {

    private final ProductRepository productRepository;

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Autowired
    public OrderDAOImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getOrdersForCustomer(Integer customerID) {
        List<Product> products = new ArrayList<>();

        String sql = "{call spInsertAndGetOrdersForCustomer(?,null)}";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            CallableStatement callableStatement = connection.prepareCall(sql);

            callableStatement.setInt(1, customerID);
            callableStatement.execute();
            ResultSet resultSet = callableStatement.getResultSet();

            while (resultSet.next()) {
                Optional<Product> optionalProduct = productRepository.findById(resultSet.getInt("ProductID"));
                products.add(optionalProduct.orElse(null));
            }

            resultSet.close();
            callableStatement.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return products;
    }

    @Override
    public Boolean checkOut(List<Product> cartProducts, Integer customerID) {
        String sql = "{call spInsertAndGetOrdersForCustomer(?,?)}";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            CallableStatement callableStatement = connection.prepareCall(sql);

            callableStatement.setInt(1, customerID);
            for (Product cartProduct : cartProducts) {
                callableStatement.setInt(2, cartProduct.getId());
                callableStatement.execute();
            }

            callableStatement.close();
            return true;
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return false;
    }
}
