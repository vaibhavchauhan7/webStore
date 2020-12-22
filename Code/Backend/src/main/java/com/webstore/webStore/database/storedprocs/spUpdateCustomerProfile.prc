USE [DEV_MASTER]
GO

/****** Object:  StoredProcedure [dbo].[spUpdateCustomerProfile]    Script Date: 23-12-2020 01:06:51 AM ******/
DROP PROCEDURE [dbo].[spUpdateCustomerProfile]
GO

/****** Object:  StoredProcedure [dbo].[spUpdateCustomerProfile]    Script Date: 23-12-2020 01:06:51 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spUpdateCustomerProfile]
@CustomerID INT,
@FirstName VARCHAR(50),
@LastName VARCHAR(50),
@Email VARCHAR(50),
@Phone VARCHAR(50)

AS

SET NOCOUNT ON
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN
    IF EXISTS(SELECT 1 FROM customers WHERE id = @CustomerID)
    BEGIN
        UPDATE customers
        SET first_name = @FirstName,
            last_name  = @LastName,
            email      = @Email,
            phone      = @Phone
        WHERE id = @CustomerID
    END
END
GO


