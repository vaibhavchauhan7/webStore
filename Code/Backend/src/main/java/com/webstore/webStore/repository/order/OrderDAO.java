package com.webstore.webStore.repository.order;

import com.webstore.webStore.entity.product.Product;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDAO {

    List<Product> getOrdersForCustomer(Integer customerID);

    Boolean checkOut(List<Product> cartProducts, Integer customerID);
}
