package com.webstore.webStore.repository.account.wishlist;

import com.webstore.webStore.entity.product.Product;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Repository
public class WishlistDAOImpl implements WishlistDAO {

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Override
    public void addRemoveWishlistProducts(Product product, Integer customerID, String productType, Integer removeProduct) {
        String sql = "{call spManageCartWishlist(?,?,?,?)}";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            CallableStatement callableStatement = connection.prepareCall(sql);

            callableStatement.setInt(1, customerID);
            callableStatement.setInt(2, product.getId());
            callableStatement.setString(3, productType);
            callableStatement.setInt(4, removeProduct);

            callableStatement.execute();

            callableStatement.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public List<Product> getWishlistProducts(Integer customerID) {
        List<Product> productList = new ArrayList<>();

        String sql = "{call spManageCartWishlist(?,null,'Wishlist',0)}";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            CallableStatement callableStatement = connection.prepareCall(sql);

            callableStatement.setInt(1, customerID);

            callableStatement.executeQuery();
            ResultSet resultSet = callableStatement.getResultSet();

            while (resultSet.next()) {
                Product product = new Product();
                product.setId(resultSet.getInt("ProductID"));
                product.setName(resultSet.getString("ProductName"));
                product.setImagePath(resultSet.getString("ProductImagePath"));
                product.setPrice(resultSet.getString("ProductPrice"));
                productList.add(product);
            }

            resultSet.close();
            callableStatement.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return productList;
    }
}
