package com.webstore.webStore.repository.account.order;

import com.webstore.webStore.entity.account.Order;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDAO {

    List<Order> getOrdersForCustomer(Integer customerID);
}
