USE [WEB_MASTER]
GO

/****** Object:  StoredProcedure [dbo].[spGetCustomerByEmail]    Script Date: 20-09-2020 10:25:21 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[spGetCustomerByEmail]
GO

/****** Object:  StoredProcedure [dbo].[spGetCustomerByEmail]    Script Date: 20-09-2020 10:25:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spGetCustomerByEmail]
@email nvarchar(50)
AS
BEGIN
    SELECT *
    FROM customers c
    WHERE c.email = @email
END
GO


