package com.webstore.webStore.account.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.webstore.webStore.product.entity.Product;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class WishlistCart extends Product {

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
