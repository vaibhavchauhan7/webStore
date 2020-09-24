package com.webstore.webStore.entity.account;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.webstore.webStore.entity.product.Product;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Cart extends Product {

    private Integer customerId;
    private Integer quantity;

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
