package com.webstore.webStore.service.account.order;

import com.webstore.webStore.entity.account.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("orderService")
public interface OrderService {

    List<Order> getOrdersForCustomer(Integer customerID);
}
