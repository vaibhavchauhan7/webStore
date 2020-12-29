USE [DEV_MASTER]
GO

/****** Object:  StoredProcedure [dbo].[spForgotPassword]    Script Date: 23-12-2020 01:05:11 AM ******/
DROP PROCEDURE [dbo].[spForgotPassword]
GO

/****** Object:  StoredProcedure [dbo].[spForgotPassword]    Script Date: 23-12-2020 01:05:11 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spForgotPassword]
@Email			VARCHAR(50),
@Phone			VARCHAR(50),
@NewPassword	VARCHAR(70) = NULL

AS

SET NOCOUNT ON
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN
    IF EXISTS(SELECT 1 FROM customers WHERE email = @Email OR phone = @Phone)
    BEGIN
        IF (@NewPassword IS NOT NULL)
        BEGIN
            UPDATE customers
            SET password = @NewPassword
            WHERE email = @Email AND phone = @Phone
        END
    END
END
GO


