package com.webstore.webStore.controller.account;

import com.webstore.webStore.entity.account.Order;
import com.webstore.webStore.service.account.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/orders/{customerID}")
    public List<Order> getOrdersForCustomer(@PathVariable Integer customerID) {
        return orderService.getOrdersForCustomer(customerID);
    }
}
