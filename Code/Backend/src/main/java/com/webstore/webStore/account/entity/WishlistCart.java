package com.webstore.webStore.account.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.webstore.webStore.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class WishlistCart extends Product {

    private Integer customerId;
    private Integer quantity;

}
