USE [WEB_MASTER]
GO

/****** Object:  StoredProcedure [dbo].[spCustomerSignUp]    Script Date: 19-09-2020 05:53:17 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[spCustomerSignUp]
GO

/****** Object:  StoredProcedure [dbo].[spCustomerSignUp]    Script Date: 19-09-2020 05:53:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spCustomerSignUp]
@name varchar(50),
@email varchar(50),
@phone varchar(50),
@password varchar(70)
AS
BEGIN
    IF NOT EXISTS(SELECT 1 FROM customers WHERE email = @email OR phone = @phone)
    BEGIN
        INSERT INTO customers
        VALUES (@name, @email, @phone, @password)
    END
END
GO


