package com.webstore.webStore.service.account.order;

import com.webstore.webStore.entity.account.Order;
import com.webstore.webStore.entity.product.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("orderService")
public interface OrderService {

    List<Order> getOrdersForCustomer(Integer customerID);

    Boolean checkOut(List<Product> cartProducts, Integer customerID);
}
