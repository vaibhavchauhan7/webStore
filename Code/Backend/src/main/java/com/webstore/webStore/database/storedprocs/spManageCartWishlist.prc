USE [DEV_MASTER]
GO

/****** Object:  StoredProcedure [dbo].[spManageCartWishlist]    Script Date: 23-12-2020 01:06:33 AM ******/
DROP PROCEDURE [dbo].[spManageCartWishlist]
GO

/****** Object:  StoredProcedure [dbo].[spManageCartWishlist]    Script Date: 23-12-2020 01:06:33 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spManageCartWishlist]
@CustomerID INT,
@ProductID INT = 0,
@ProductType VARCHAR(10),
@RemoveProduct BIT = 0,
@Quantity INT = 1

AS

SET NOCOUNT ON
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN
    IF (@ProductID > 0 AND @ProductType = 'Wishlist')
    BEGIN
        IF (@RemoveProduct = 0)
        BEGIN
            IF NOT EXISTS(SELECT 1 FROM wishlist WHERE product_id = @ProductID AND customer_id = @CustomerID)
            BEGIN
                INSERT INTO wishlist
                SELECT c.id, p.id, p.name, p.image_path, p.price
                FROM products p
                JOIN customers c ON c.id = @CustomerID
                WHERE p.id = @ProductID
            END
        END
        ELSE
        BEGIN
            IF EXISTS(SELECT 1 FROM wishlist WHERE product_id = @ProductID AND customer_id = @CustomerID)
			BEGIN
                DELETE FROM wishlist
                WHERE product_id = @ProductID
			END
        END
    END
    ELSE
	BEGIN
        IF (@ProductID > 0 AND @ProductType = 'Cart')
        BEGIN
            IF (@RemoveProduct = 0)
            BEGIN
                IF NOT EXISTS(SELECT 1 FROM cart WHERE product_id = @ProductID AND customer_id = @CustomerID)
                BEGIN
                    INSERT INTO cart
                    SELECT c.id, p.id, p.name, p.image_path, p.price, @Quantity
                    FROM products p
                    JOIN customers c ON c.id = @CustomerID
                    WHERE p.id = @ProductID
                END
            END
            ELSE
			BEGIN
				IF EXISTS(SELECT 1 FROM cart WHERE product_id = @ProductID AND customer_id = @CustomerID)
				BEGIN
					DELETE FROM cart
					WHERE product_id = @ProductID
				END
			END
        END
	END

    IF (@ProductType = 'Wishlist')
    BEGIN
        CREATE TABLE #tmp_wishlist (
            WishlistID			INT NOT NULL,
            CustomerID			INT NOT NULL,
            ProductID			INT NOT NULL,
            ProductName			VARCHAR(50) NOT NULL,
            ProductImagePath	VARCHAR(MAX),
            ProductPrice		VARCHAR(20) NOT NULL
        )

        INSERT INTO #tmp_wishlist
        SELECT w.id, c.id, p.id, p.name, p.image_path, p.price
        FROM wishlist w
        JOIN customers c ON c.id = w.customer_id
        JOIN products p ON p.id = w.product_id

        SELECT * FROM #tmp_wishlist tmpw
        WHERE tmpw.CustomerID = @CustomerID
        ORDER BY tmpw.WishlistID DESC
		
        DROP TABLE #tmp_wishlist
    END
    ELSE
	BEGIN
        IF (@ProductType = 'Cart')
        BEGIN
            CREATE TABLE #tmp_cart (
                CartID				INT NOT NULL,
                CustomerID			INT NOT NULL,
                ProductID			INT NOT NULL,
                ProductName			VARCHAR(50) NOT NULL,
                ProductImagePath	VARCHAR(MAX),
                ProductPrice		VARCHAR(20) NOT NULL,
                ProductQuantity		INT NOT NULL
            )

            INSERT INTO #tmp_cart
            SELECT ct.id, c.id, p.id, p.name, p.image_path, p.price, ct.quantity
            FROM cart ct
			JOIN customers c ON c.id = ct.customer_id
			JOIN products p ON p.id = ct.product_id

            SELECT * FROM #tmp_cart tmpc
            WHERE tmpc.CustomerID = @CustomerID
            ORDER BY tmpc.CartID DESC
			
			DROP TABLE #tmp_cart
        END
	END
END
GO


