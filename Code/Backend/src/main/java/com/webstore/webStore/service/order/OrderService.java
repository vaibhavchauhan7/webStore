package com.webstore.webStore.service.order;

import com.webstore.webStore.entity.product.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("orderService")
public interface OrderService {

    List<Product> getOrdersForCustomer(Integer customerID);

    Boolean checkOut(List<Product> cartProducts, Integer customerID);
}
