USE [WEB_MASTER]
GO

/****** Object:  StoredProcedure [dbo].[spGetCustomerByEmail]    Script Date: 12-09-2020 12:37:43 PM ******/
DROP PROCEDURE [dbo].[spGetCustomerByEmail]
GO

/****** Object:  StoredProcedure [dbo].[spGetCustomerByEmail]    Script Date: 12-09-2020 12:37:43 PM ******/
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


