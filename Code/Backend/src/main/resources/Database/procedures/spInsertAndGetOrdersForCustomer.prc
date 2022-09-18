USE [DEV_MASTER]
GO

/****** Object:  StoredProcedure [dbo].[spInsertAndGetOrdersForCustomer]    Script Date: 23-12-2020 01:06:12 AM ******/
DROP PROCEDURE [dbo].[spInsertAndGetOrdersForCustomer]
GO

/****** Object:  StoredProcedure [dbo].[spInsertAndGetOrdersForCustomer]    Script Date: 23-12-2020 01:06:12 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spInsertAndGetOrdersForCustomer]
@CustomerId		INT,
@ProductId		INT = NULL

AS

SET NOCOUNT ON
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN
    IF (@ProductId IS NOT NULL)
    BEGIN
        INSERT INTO orders (order_number, customer_id, product_id, purchase_date, purchase_time)
		VALUES (
		'WB' + CAST(@CustomerId AS VARCHAR(20)) + CAST(@ProductId AS VARCHAR(20)) + 'STR' 
		+ CONVERT(VARCHAR(10), GETDATE(), 112) 
		+ SUBSTRING(REPLACE(CONVERT(VARCHAR(25), GETDATE(), 113), ':', ''), 13, 10),
        @CustomerId,
        @ProductId,
        CONVERT(VARCHAR(12), GETDATE(), 107),
        FORMAT(CONVERT(DATETIME, GETDATE()), 'hh:mm tt'))
    END

    CREATE TABLE #tmp_orders_customers (
        OrderId				INT NOT NULL,
        OrderNumber			VARCHAR(70) NOT NULL,
        CustomerId			INT NOT NULL,
        CustomerName		VARCHAR(50) NOT NULL,
        CustomerEmail		VARCHAR(50) NOT NULL,
        CustomerPhone		VARCHAR(50) NOT NULL,
        ProductId			INT NOT NULL,
        ProductName			VARCHAR(50) NOT NULL,
        ProductPrice		VARCHAR(20) NOT NULL,
        PurchaseDate		VARCHAR(12) NOT NULL,
        PurchaseTime		VARCHAR(8) NOT NULL,
        ProductImagePath	VARCHAR(MAX) NOT NULL
    )

    INSERT INTO #tmp_orders_customers
    SELECT o.id, o.order_number, c.id,
           c.first_name + ' ' + c.last_name,
           c.email, c.phone, p.id, p.name,
           p.price, o.purchase_date,
           o.purchase_time, p.image_path
    FROM orders o
    JOIN customers c ON c.id = o.customer_id
    JOIN products p ON p.id = o.product_id

    IF (@ProductId > 0)
    BEGIN
        SELECT * FROM #tmp_orders_customers toc
        WHERE toc.CustomerId = @CustomerId
        AND toc.ProductId = @ProductId
    END
    ELSE
    BEGIN
        SELECT * FROM #tmp_orders_customers toc
        WHERE toc.CustomerId = @CustomerId
        ORDER BY toc.OrderId DESC
    END

    DROP TABLE #tmp_orders_customers
END
GO


