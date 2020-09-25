package com.webstore.webStore.repository.account.cart;

import com.webstore.webStore.entity.account.Cart;
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
public class CartDAOImpl implements CartDAO {

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Override
    public List<Cart> getCartProducts(Integer customerID) {
        List<Cart> cartProducts = new ArrayList<>();

        String sql = "{call spManageCartWishlist(?,null,'Cart',0)}";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            CallableStatement callableStatement = connection.prepareCall(sql);

            callableStatement.setInt(1, customerID);

            callableStatement.executeQuery();
            ResultSet resultSet = callableStatement.getResultSet();

            while (resultSet.next()) {
                Cart cart = new Cart();
                cart.setId(resultSet.getInt("ProductID"));
                cart.setName(resultSet.getString("ProductName"));
                cart.setImagePath(resultSet.getString("ProductImagePath"));
                cart.setPrice(resultSet.getString("ProductPrice"));
                cart.setQuantity(resultSet.getInt("ProductQuantity"));
                cartProducts.add(cart);
            }

            resultSet.close();
            callableStatement.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return cartProducts;
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

    @Override
    public void addRemoveCartProducts(Product product, Integer customerID, String productType, Integer removeProduct) {
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
    public void clearCart(Integer customerID) {
        String sql = "{call spClearCartWishlist(?,'Cart')}";
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            CallableStatement callableStatement = connection.prepareCall(sql);

            callableStatement.setInt(1, customerID);
            callableStatement.execute();

            callableStatement.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}
