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
@CustomerID INT,
@ProductID INT = NULL

AS

SET NOCOUNT ON
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN

    IF (@ProductID > 0)
    BEGIN
        INSERT INTO orders
        SELECT 
		CASE
			WHEN MAX(o.id) IS NULL THEN 1 
			ELSE MAX(o.id) + 1
		END,
        @CustomerID,
        @ProductID,
        CONVERT(VARCHAR(10), GETDATE(), 103),
        FORMAT(CONVERT(DATETIME, GETDATE()), 'hh:mm tt')
        FROM orders o
		JOIN customers c ON c.id = @CustomerID
		JOIN products p ON p.id = @ProductID
        WHERE o.id = o.order_number
    END

    CREATE TABLE #tmp_orders_customers (
        OrderID				INT NOT NULL,
        OrderNumber			INT NOT NULL,
        CustomerID			INT NOT NULL,
        CustomerName		VARCHAR(50) NOT NULL,
        CustomerEmail		VARCHAR(50) NOT NULL,
        CustomerPhone		VARCHAR(50) NOT NULL,
        ProductID			INT NOT NULL,
        ProductName			VARCHAR(50) NOT NULL,
        ProductPrice		VARCHAR(20) NOT NULL,
        PurchaseDate		VARCHAR(10),
        PurchaseTime		VARCHAR(8),
        ProductImagePath	VARCHAR(MAX)
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

    IF (@ProductID > 0)
    BEGIN
        SELECT *
        FROM #tmp_orders_customers toc
        WHERE toc.CustomerID = @CustomerID
        AND toc.ProductID = @ProductID
    END
    ELSE
    BEGIN
        SELECT * FROM #tmp_orders_customers toc
        WHERE toc.CustomerID = @CustomerID
        ORDER BY toc.OrderID DESC
    END

    DROP TABLE #tmp_orders_customers
END
GO


