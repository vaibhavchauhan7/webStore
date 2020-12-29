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
@CustomerID			INT,
@ProductID			INT = 0,
@ProductType		VARCHAR(10),
@RemoveProduct		BIT = 0,
@Quantity			INT = 1

AS

SET NOCOUNT ON
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN
	IF (@ProductType = 'Cart')
	BEGIN
		IF (@ProductID > 0)
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
		ELSE
		BEGIN
			SELECT
			ct.id AS CartID,
			c.id AS CustomerID,
			p.id AS ProductID,
			p.name AS ProductName,
			p.image_path AS ProductImagePath,
			p.price AS ProductPrice,
			ct.quantity AS ProductQuantity
			FROM cart ct
			JOIN customers c ON c.id = ct.customer_id
			JOIN products p ON p.id = ct.product_id
			WHERE ct.customer_id = @CustomerID
			ORDER BY ct.id DESC
		END
	END


	IF (@ProductType = 'Wishlist')
	BEGIN
		IF (@ProductID > 0)
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
			SELECT
			w.id AS WishlistID,
			c.id AS CustomerID,
			p.id AS ProductID,
			p.name AS ProductName,
			p.image_path AS ProductImagePath,
			p.price AS ProductPrice
			FROM wishlist w
			JOIN customers c ON c.id = w.customer_id
			JOIN products p ON p.id = w.product_id
			WHERE w.customer_id = @CustomerID
			ORDER BY w.id DESC
		END
	END
END
GO


