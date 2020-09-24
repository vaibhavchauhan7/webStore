package com.webstore.webStore.entity.account;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.webstore.webStore.entity.product.Product;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Wishlist extends Product {

    private Integer customerId;

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }
}