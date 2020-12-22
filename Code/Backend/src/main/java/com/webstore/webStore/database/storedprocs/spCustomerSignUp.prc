USE [DEV_MASTER]
GO

/****** Object:  StoredProcedure [dbo].[spCustomerSignUp]    Script Date: 23-12-2020 01:04:48 AM ******/
DROP PROCEDURE [dbo].[spCustomerSignUp]
GO

/****** Object:  StoredProcedure [dbo].[spCustomerSignUp]    Script Date: 23-12-2020 01:04:48 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spCustomerSignUp]
@FirstName VARCHAR(50),
@LastName VARCHAR(50),
@Email VARCHAR(50),
@Phone VARCHAR(50),
@Password VARCHAR(70)

AS

SET NOCOUNT ON
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN
    IF NOT EXISTS(SELECT 1 FROM customers WHERE email = @Email OR phone = @Phone)
    BEGIN
        INSERT INTO customers
        VALUES (@FirstName, @LastName, @Email, @Phone, @Password)
    END
END
GO


