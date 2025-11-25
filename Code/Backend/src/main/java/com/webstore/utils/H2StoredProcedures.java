package com.webstore.utils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class H2StoredProcedures {

    public static void spCustomerSignUp(Connection conn, String firstName, String lastName, String email, String phone, String password) throws SQLException {
        try (PreparedStatement check = conn.prepareStatement("SELECT 1 FROM customers WHERE email = ? OR phone = ?")) {
            check.setString(1, email);
            check.setString(2, phone);
            try (ResultSet rs = check.executeQuery()) {
                if (!rs.next()) {
                    try (PreparedStatement insert = conn.prepareStatement(
                            "INSERT INTO customers (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)")) {
                        insert.setString(1, firstName);
                        insert.setString(2, lastName);
                        insert.setString(3, email);
                        insert.setString(4, phone);
                        insert.setString(5, password);
                        insert.executeUpdate();
                    }
                }
            }
        }
    }

    public static void spForgotPassword(Connection conn, String email, String phone, String newPassword) throws SQLException {
        if (newPassword == null || newPassword.isEmpty()) return;

        try (PreparedStatement check = conn.prepareStatement("SELECT 1 FROM customers WHERE email = ? AND phone = ?")) {
            check.setString(1, email);
            check.setString(2, phone);
            try (ResultSet rs = check.executeQuery()) {
                if (rs.next()) {
                    try (PreparedStatement update = conn.prepareStatement("UPDATE customers SET password = ? WHERE email = ? AND phone = ?")) {
                        update.setString(1, newPassword);
                        update.setString(2, email);
                        update.setString(3, phone);
                        update.executeUpdate();
                    }
                }
            }
        }
    }

    public static ResultSet spInsertAndGetOrdersForCustomer(Connection conn, int customerId, Integer productId) throws SQLException {
        if (productId != null && productId > 0) {
            String orderNumber = "WB" + customerId + productId + "STR" + new java.text.SimpleDateFormat("yyyyMMdd").format(new java.util.Date()) +
                    new java.text.SimpleDateFormat("HHmmss").format(new java.util.Date());

            try (PreparedStatement insert = conn.prepareStatement(
                    "INSERT INTO orders (order_number, customer_id, product_id, purchase_date, purchase_time) VALUES (?, ?, ?, ?, ?)")) {
                insert.setString(1, orderNumber);
                insert.setInt(2, customerId);
                insert.setInt(3, productId);
                insert.setString(4, new java.text.SimpleDateFormat("MMM dd yyyy").format(new java.util.Date()));
                insert.setString(5, new java.text.SimpleDateFormat("hh:mm a").format(new java.util.Date()));
                insert.executeUpdate();
            }
        }

        String query = "SELECT o.id AS OrderId, o.order_number AS OrderNumber, c.id AS CustomerId, " +
                "c.first_name || ' ' || c.last_name AS CustomerName, c.email AS CustomerEmail, c.phone AS CustomerPhone, " +
                "p.id AS ProductId, p.name AS ProductName, p.price AS ProductPrice, o.purchase_date AS PurchaseDate, " +
                "o.purchase_time AS PurchaseTime, p.image_path AS ProductImagePath " +
                "FROM orders o " +
                "JOIN customers c ON c.id = o.customer_id " +
                "JOIN products p ON p.id = o.product_id " +
                "WHERE c.id = ? ";

        if (productId != null && productId > 0) {
            query += "AND p.id = ? ";
        }

        query += "ORDER BY o.id DESC";

        PreparedStatement select = conn.prepareStatement(query);
        select.setInt(1, customerId);
        if (productId != null && productId > 0) select.setInt(2, productId);

        return select.executeQuery(); // Caller is responsible for closing ResultSet
    }

    public static ResultSet spManageCartWishlist(Connection conn, int customerId, Integer productId, String productType, Integer removeProduct, int quantity) throws SQLException {
        if ("Cart".equalsIgnoreCase(productType)) {
            if (productId != null && productId > 0) {
                if (removeProduct == 0) {
                    // Insert into cart if not exists
                    try (PreparedStatement check = conn.prepareStatement("SELECT 1 FROM cart WHERE customer_id = ? AND product_id = ?")) {
                        check.setInt(1, customerId);
                        check.setInt(2, productId);
                        try (ResultSet rs = check.executeQuery()) {
                            if (!rs.next()) {
                                try (PreparedStatement insert = conn.prepareStatement(
                                        "INSERT INTO cart (customer_id, product_id, name, image_path, price, quantity) " +
                                                "SELECT c.id, p.id, p.name, p.image_path, p.price, ? FROM customers c, products p WHERE c.id = ? AND p.id = ?")) {
                                    insert.setInt(1, quantity);
                                    insert.setInt(2, customerId);
                                    insert.setInt(3, productId);
                                    insert.executeUpdate();
                                }
                            }
                        }
                    }
                } else {
                    try (PreparedStatement delete = conn.prepareStatement("DELETE FROM cart WHERE customer_id = ? AND product_id = ?")) {
                        delete.setInt(1, customerId);
                        delete.setInt(2, productId);
                        delete.executeUpdate();
                    }
                }
            } else {
                // Return all cart items for customer
                String selectQuery = "SELECT ct.id AS CartId, c.id AS CustomerId, p.id AS ProductId, p.name AS ProductName, p.image_path AS ProductImagePath, p.price AS ProductPrice, ct.quantity AS ProductQuantity " +
                        "FROM cart ct JOIN customers c ON c.id = ct.customer_id JOIN products p ON p.id = ct.product_id " +
                        "WHERE ct.customer_id = ? ORDER BY ct.id DESC";
                PreparedStatement select = conn.prepareStatement(selectQuery);
                select.setInt(1, customerId);
                return select.executeQuery();
            }
        }

        if ("Wishlist".equalsIgnoreCase(productType)) {
            if (productId != null && productId > 0) {
                if (removeProduct == 0) {
                    try (PreparedStatement check = conn.prepareStatement("SELECT 1 FROM wishlist WHERE customer_id = ? AND product_id = ?")) {
                        check.setInt(1, customerId);
                        check.setInt(2, productId);
                        try (ResultSet rs = check.executeQuery()) {
                            if (!rs.next()) {
                                try (PreparedStatement insert = conn.prepareStatement(
                                        "INSERT INTO wishlist (customer_id, product_id, name, image_path, price) " +
                                                "SELECT c.id, p.id, p.name, p.image_path, p.price FROM customers c, products p WHERE c.id = ? AND p.id = ?")) {
                                    insert.setInt(1, customerId);
                                    insert.setInt(2, productId);
                                    insert.executeUpdate();
                                }
                            }
                        }
                    }
                } else {
                    try (PreparedStatement delete = conn.prepareStatement("DELETE FROM wishlist WHERE customer_id = ? AND product_id = ?")) {
                        delete.setInt(1, customerId);
                        delete.setInt(2, productId);
                        delete.executeUpdate();
                    }
                }
            } else {
                String selectQuery = "SELECT w.id AS WishlistId, c.id AS CustomerId, p.id AS ProductId, p.name AS ProductName, p.image_path AS ProductImagePath, p.price AS ProductPrice " +
                        "FROM wishlist w JOIN customers c ON c.id = w.customer_id JOIN products p ON p.id = w.product_id " +
                        "WHERE w.customer_id = ? ORDER BY w.id DESC";
                PreparedStatement select = conn.prepareStatement(selectQuery);
                select.setInt(1, customerId);
                return select.executeQuery();
            }
        }

        return null; // Nothing to return
    }
}
