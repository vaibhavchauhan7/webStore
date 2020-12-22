USE [DEV_MASTER]
GO

/****** Object:  StoredProcedure [dbo].[spClearCartWishlist]    Script Date: 23-12-2020 01:04:05 AM ******/
DROP PROCEDURE [dbo].[spClearCartWishlist]
GO

/****** Object:  StoredProcedure [dbo].[spClearCartWishlist]    Script Date: 23-12-2020 01:04:05 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spClearCartWishlist]
@CustomerID INT,
@ProductType VARCHAR(10)

AS

SET NOCOUNT ON
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN
    IF (@ProductType = 'Wishlist')
    BEGIN
        DELETE FROM wishlist WHERE wishlist.customer_id = @CustomerID
    END
    ELSE
    BEGIN
        DELETE FROM cart WHERE cart.customer_id = @CustomerID
    END
END
GO


