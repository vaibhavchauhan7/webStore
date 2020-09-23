package com.webstore.webStore.repository.account.order;

import com.webstore.webStore.entity.account.Order;
import com.webstore.webStore.entity.product.Product;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDAO {

    List<Order> getOrdersForCustomer(Integer customerID);

    Boolean checkOut(List<Product> cartProducts, Integer customerID);
}
