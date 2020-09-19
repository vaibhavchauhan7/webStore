package com.webstore.webStore.service.order;

import com.webstore.webStore.entity.product.Product;
import com.webstore.webStore.repository.order.OrderDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("orderService")
public class OrderServiceImpl implements OrderService {

    private final OrderDAO orderDAO;

    @Autowired
    public OrderServiceImpl(OrderDAO orderDAO) {
        this.orderDAO = orderDAO;
    }

    @Override
    public List<Product> getOrdersForCustomer(Integer customerID) {
        return orderDAO.getOrdersForCustomer(customerID);
    }

    @Override
    public Boolean checkOut(List<Product> cartProducts, Integer customerID) {
        return orderDAO.checkOut(cartProducts, customerID);
    }
}
