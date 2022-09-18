package com.webstore.webStore.account.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Order {

    private Integer orderId;
    private String orderNumber;
    private Integer customerId;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private Integer productId;
    private String productName;
    private String productPrice;
    private String purchaseDate;
    private String purchaseTime;
    private String productImagePath;

}
