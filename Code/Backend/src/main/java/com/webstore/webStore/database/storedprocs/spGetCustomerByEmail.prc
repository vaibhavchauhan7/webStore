USE [DEV_MASTER]
GO

/****** Object:  StoredProcedure [dbo].[spGetCustomerByEmail]    Script Date: 23-12-2020 01:05:40 AM ******/
DROP PROCEDURE [dbo].[spGetCustomerByEmail]
GO

/****** Object:  StoredProcedure [dbo].[spGetCustomerByEmail]    Script Date: 23-12-2020 01:05:40 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spGetCustomerByEmail]
@Email VARCHAR(50)

AS

SET NOCOUNT ON
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN
    SELECT *
    FROM customers c
    WHERE c.email = @Email
END
GO


