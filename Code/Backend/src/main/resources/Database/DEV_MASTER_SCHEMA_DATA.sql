USE [master]
GO
/****** Object:  Database [DEV_MASTER]    Script Date: 18-Sep-22 12:58:38 AM ******/
CREATE DATABASE [DEV_MASTER]
    CONTAINMENT = NONE
    ON PRIMARY
    ( NAME = N'DEV_MASTER', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\DEV_MASTER.mdf' , SIZE = 8192 KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536 KB )
    LOG ON
    ( NAME = N'DEV_MASTER_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\DEV_MASTER_log.ldf' , SIZE = 8192 KB , MAXSIZE = 2048 GB , FILEGROWTH = 65536 KB )
WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [DEV_MASTER] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
    begin
        EXEC [DEV_MASTER].[dbo].[sp_fulltext_database] @action = 'enable'
    end
GO
ALTER DATABASE [DEV_MASTER] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [DEV_MASTER] SET ANSI_NULLS OFF
GO
ALTER DATABASE [DEV_MASTER] SET ANSI_PADDING OFF
GO
ALTER DATABASE [DEV_MASTER] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [DEV_MASTER] SET ARITHABORT OFF
GO
ALTER DATABASE [DEV_MASTER] SET AUTO_CLOSE OFF
GO
ALTER DATABASE [DEV_MASTER] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [DEV_MASTER] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [DEV_MASTER] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [DEV_MASTER] SET CURSOR_DEFAULT GLOBAL
GO
ALTER DATABASE [DEV_MASTER] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [DEV_MASTER] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [DEV_MASTER] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [DEV_MASTER] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [DEV_MASTER] SET DISABLE_BROKER
GO
ALTER DATABASE [DEV_MASTER] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [DEV_MASTER] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [DEV_MASTER] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [DEV_MASTER] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [DEV_MASTER] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [DEV_MASTER] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [DEV_MASTER] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [DEV_MASTER] SET RECOVERY FULL
GO
ALTER DATABASE [DEV_MASTER] SET MULTI_USER
GO
ALTER DATABASE [DEV_MASTER] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [DEV_MASTER] SET DB_CHAINING OFF
GO
ALTER DATABASE [DEV_MASTER] SET FILESTREAM ( NON_TRANSACTED_ACCESS = OFF )
GO
ALTER DATABASE [DEV_MASTER] SET TARGET_RECOVERY_TIME = 60 SECONDS
GO
ALTER DATABASE [DEV_MASTER] SET DELAYED_DURABILITY = DISABLED
GO
ALTER DATABASE [DEV_MASTER] SET ACCELERATED_DATABASE_RECOVERY = OFF
GO
ALTER DATABASE [DEV_MASTER] SET QUERY_STORE = OFF
GO
USE [DEV_MASTER]
GO
/****** Object:  Table [dbo].[cart]    Script Date: 18-Sep-22 12:58:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cart]
(
    [id]          [int] IDENTITY (1,1) NOT NULL,
    [customer_id] [int]                NOT NULL,
    [product_id]  [int]                NOT NULL,
    [name]        [varchar](50)        NOT NULL,
    [image_path]  [varchar](max)       NOT NULL,
    [price]       [varchar](20)        NOT NULL,
    [quantity]    [int]                NOT NULL,
    CONSTRAINT [PK_cart] PRIMARY KEY CLUSTERED
        (
         [id] ASC
            ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[contact]    Script Date: 18-Sep-22 12:58:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[contact]
(
    [id]      [int] IDENTITY (1,1) NOT NULL,
    [name]    [varchar](50)        NOT NULL,
    [email]   [varchar](50)        NOT NULL,
    [subject] [varchar](255)       NOT NULL,
    [message] [varchar](max)       NOT NULL,
    CONSTRAINT [PK_contact] PRIMARY KEY CLUSTERED
        (
         [id] ASC
            ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[customers]    Script Date: 18-Sep-22 12:58:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customers]
(
    [id]         [int] IDENTITY (1,1) NOT NULL,
    [first_name] [varchar](50)        NOT NULL,
    [last_name]  [varchar](50)        NOT NULL,
    [email]      [varchar](50)        NOT NULL,
    [phone]      [varchar](50)        NOT NULL,
    [password]   [varchar](70)        NOT NULL,
    CONSTRAINT [PK_customers] PRIMARY KEY CLUSTERED
        (
         [id] ASC
            ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[orders]    Script Date: 18-Sep-22 12:58:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orders]
(
    [id]            [int] IDENTITY (1,1) NOT NULL,
    [order_number]  [varchar](70)        NOT NULL,
    [customer_id]   [int]                NOT NULL,
    [product_id]    [int]                NOT NULL,
    [purchase_date] [varchar](12)        NOT NULL,
    [purchase_time] [varchar](8)         NOT NULL,
    CONSTRAINT [PK_orders] PRIMARY KEY CLUSTERED
        (
         [id] ASC
            ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[products]    Script Date: 18-Sep-22 12:58:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[products]
(
    [id]          [int] IDENTITY (1,1) NOT NULL,
    [name]        [varchar](50)        NOT NULL,
    [description] [varchar](max)       NOT NULL,
    [image_path]  [varchar](max)       NOT NULL,
    [price]       [varchar](20)        NOT NULL,
    [category]    [varchar](50)        NOT NULL,
    CONSTRAINT [PK_products] PRIMARY KEY CLUSTERED
        (
         [id] ASC
            ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[wishlist]    Script Date: 18-Sep-22 12:58:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[wishlist]
(
    [id]          [int] IDENTITY (1,1) NOT NULL,
    [customer_id] [int]                NOT NULL,
    [product_id]  [int]                NOT NULL,
    [name]        [varchar](50)        NOT NULL,
    [image_path]  [varchar](max)       NOT NULL,
    [price]       [varchar](20)        NOT NULL,
    CONSTRAINT [PK_wishlist] PRIMARY KEY CLUSTERED
        (
         [id] ASC
            ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[customers] ON
GO
INSERT [dbo].[customers] ([id], [first_name], [last_name], [email], [phone], [password])
VALUES (1, N'Vaibhav', N'Chauhan', N'vc@vc.com', N'1234567890',
        N'$2y$10$O.cz9JR.mZEUIu/hss62he9R7Uh/68F.RmwXT0T/mR0Fz1SEplI4G')
GO
SET IDENTITY_INSERT [dbo].[customers] OFF
GO
SET IDENTITY_INSERT [dbo].[products] ON
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (1, N'Jet Black T-Shirt', N'Men''s Jet Black Sports T-Shirt',
        N'../assets/Images/Products/T-Shirts/Jet Black.png', N'499', N'T-Shirt')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (2, N'Nike Yellow Claw', N'Nike''s Original Yellow Claw',
        N'../assets/Images/Products/Shoes/Nike Yellow Claw.png', N'4,999', N'Shoes')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (3, N'Marble White', N'Apple Watch - Marble White',
        N'../assets/Images/Products/Wrist Watch/Apple Watch - Marble White.png', N'40,599', N'Wrist Watch')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (4, N'Macbook Pro', N'Silver - Macbook Pro 16 Inch', N'../assets/Images/Products/Laptops/Macbook Pro.png',
        N'2,35,990', N'Laptops')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (5, N'Concrete Grey T-Shirt', N'Men''s Concrete Grey Trek T-Shirt',
        N'../assets/Images/Products/T-Shirts/Concrete Grey.png', N'399', N'T-Shirt')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (6, N'Nike Black Swift', N'Nike''s Black Swifties', N'../assets/Images/Products/Shoes/Nike Black Swift.png',
        N'7,599', N'Shoes')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (7, N'Rose Gold', N'Apple Watch - Rose Gold',
        N'../assets/Images/Products/Wrist Watch/Apple Watch - Rose Gold.png', N'30,599', N'Wrist Watch')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (8, N'Macbook Air', N'Silver - Macbook Air 13 Inch', N'../assets/Images/Products/Laptops/Macbook Air.png',
        N'1,07,500', N'Laptops')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (9, N'Pink Red T-Shirt', N'Men''s Pink Red Casual T-Shirt', N'../assets/Images/Products/T-Shirts/Pink Red.png',
        N'699', N'T-Shirt')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (10, N'Nike Air Force', N'Nike''s Rare Air Force', N'../assets/Images/Products/Shoes/Nike Air Force.png',
        N'3,199', N'Shoes')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (11, N'Dark Knight', N'Apple Watch - Dark Knight',
        N'../assets/Images/Products/Wrist Watch/Apple Watch - Dark Knight.png', N'35,999', N'Wrist Watch')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (12, N'Asus Vivobook', N'Slate Grey - Asus Vivobook 14', N'../assets/Images/Products/Laptops/Asus Vivobook.png',
        N'35,990', N'Laptops')
GO
SET IDENTITY_INSERT [dbo].[products] OFF
GO
ALTER TABLE [dbo].[orders]
    WITH CHECK ADD CONSTRAINT [FK_orders_customers] FOREIGN KEY ([customer_id])
        REFERENCES [dbo].[customers] ([id])
GO
ALTER TABLE [dbo].[orders]
    CHECK CONSTRAINT [FK_orders_customers]
GO
ALTER TABLE [dbo].[orders]
    WITH CHECK ADD CONSTRAINT [FK_orders_products] FOREIGN KEY ([product_id])
        REFERENCES [dbo].[products] ([id])
GO
ALTER TABLE [dbo].[orders]
    CHECK CONSTRAINT [FK_orders_products]
GO
/****** Object:  StoredProcedure [dbo].[spCustomerSignUp]    Script Date: 18-Sep-22 12:58:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spCustomerSignUp] @FirstName VARCHAR(50),
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
/****** Object:  StoredProcedure [dbo].[spForgotPassword]    Script Date: 18-Sep-22 12:58:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spForgotPassword] @Email VARCHAR(50),
                                          @Phone VARCHAR(50),
                                          @NewPassword VARCHAR(70) = NULL
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
                    WHERE email = @Email
                      AND phone = @Phone
                END
        END
END
GO
/****** Object:  StoredProcedure [dbo].[spInsertAndGetOrdersForCustomer]    Script Date: 18-Sep-22 12:58:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spInsertAndGetOrdersForCustomer] @CustomerId INT,
                                                         @ProductId INT = NULL
AS

    SET NOCOUNT ON
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN
    IF (@ProductId IS NOT NULL)
        BEGIN
            INSERT INTO orders (order_number, customer_id, product_id, purchase_date, purchase_time)
            VALUES ('WB' + CAST(@CustomerId AS VARCHAR(20)) + CAST(@ProductId AS VARCHAR(20)) + 'STR'
                        + CONVERT(VARCHAR(10), GETDATE(), 112)
                        + SUBSTRING(REPLACE(CONVERT(VARCHAR(25), GETDATE(), 113), ':', ''), 13, 10),
                    @CustomerId,
                    @ProductId,
                    CONVERT(VARCHAR(12), GETDATE(), 107),
                    FORMAT(CONVERT(DATETIME, GETDATE()), 'hh:mm tt'))
        END

    CREATE TABLE #tmp_orders_customers
    (
        OrderId          INT          NOT NULL,
        OrderNumber      VARCHAR(70)  NOT NULL,
        CustomerId       INT          NOT NULL,
        CustomerName     VARCHAR(50)  NOT NULL,
        CustomerEmail    VARCHAR(50)  NOT NULL,
        CustomerPhone    VARCHAR(50)  NOT NULL,
        ProductId        INT          NOT NULL,
        ProductName      VARCHAR(50)  NOT NULL,
        ProductPrice     VARCHAR(20)  NOT NULL,
        PurchaseDate     VARCHAR(12)  NOT NULL,
        PurchaseTime     VARCHAR(8)   NOT NULL,
        ProductImagePath VARCHAR(MAX) NOT NULL
    )

    INSERT INTO #tmp_orders_customers
    SELECT o.id,
           o.order_number,
           c.id,
           c.first_name + ' ' + c.last_name,
           c.email,
           c.phone,
           p.id,
           p.name,
           p.price,
           o.purchase_date,
           o.purchase_time,
           p.image_path
    FROM orders o
             JOIN customers c ON c.id = o.customer_id
             JOIN products p ON p.id = o.product_id

    IF (@ProductId > 0)
        BEGIN
            SELECT *
            FROM #tmp_orders_customers toc
            WHERE toc.CustomerId = @CustomerId
              AND toc.ProductId = @ProductId
        END
    ELSE
        BEGIN
            SELECT *
            FROM #tmp_orders_customers toc
            WHERE toc.CustomerId = @CustomerId
            ORDER BY toc.OrderId DESC
        END

    DROP TABLE #tmp_orders_customers
END
GO
/****** Object:  StoredProcedure [dbo].[spManageCartWishlist]    Script Date: 18-Sep-22 12:58:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spManageCartWishlist] @CustomerId INT,
                                              @ProductId INT = 0,
                                              @ProductType VARCHAR(10),
                                              @RemoveProduct BIT = 0,
                                              @Quantity INT = 1
AS

    SET NOCOUNT ON
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN
    IF (@ProductType = 'Cart')
        BEGIN
            IF (@ProductId > 0)
                BEGIN
                    IF (@RemoveProduct = 0)
                        BEGIN
                            IF NOT EXISTS(SELECT 1
                                          FROM cart
                                          WHERE product_id = @ProductId AND customer_id = @CustomerId)
                                BEGIN
                                    INSERT INTO cart
                                    SELECT c.id, p.id, p.name, p.image_path, p.price, @Quantity
                                    FROM products p
                                             JOIN customers c ON c.id = @CustomerId
                                    WHERE p.id = @ProductId
                                END
                        END
                    ELSE
                        BEGIN
                            IF EXISTS(SELECT 1 FROM cart WHERE product_id = @ProductId AND customer_id = @CustomerId)
                                BEGIN
                                    DELETE
                                    FROM cart
                                    WHERE product_id = @ProductId
                                END
                        END
                END
            ELSE
                BEGIN
                    SELECT ct.id        AS CartId,
                           c.id         AS CustomerId,
                           p.id         AS ProductId,
                           p.name       AS ProductName,
                           p.image_path AS ProductImagePath,
                           p.price      AS ProductPrice,
                           ct.quantity  AS ProductQuantity
                    FROM cart ct
                             JOIN customers c ON c.id = ct.customer_id
                             JOIN products p ON p.id = ct.product_id
                    WHERE ct.customer_id = @CustomerId
                    ORDER BY ct.id DESC
                END
        END


    IF (@ProductType = 'Wishlist')
        BEGIN
            IF (@ProductId > 0)
                BEGIN
                    IF (@RemoveProduct = 0)
                        BEGIN
                            IF NOT EXISTS(SELECT 1
                                          FROM wishlist
                                          WHERE product_id = @ProductId AND customer_id = @CustomerId)
                                BEGIN
                                    INSERT INTO wishlist
                                    SELECT c.id, p.id, p.name, p.image_path, p.price
                                    FROM products p
                                             JOIN customers c ON c.id = @CustomerId
                                    WHERE p.id = @ProductId
                                END
                        END
                    ELSE
                        BEGIN
                            IF EXISTS(SELECT 1
                                      FROM wishlist
                                      WHERE product_id = @ProductId AND customer_id = @CustomerId)
                                BEGIN
                                    DELETE
                                    FROM wishlist
                                    WHERE product_id = @ProductId
                                END
                        END
                END
            ELSE
                BEGIN
                    SELECT w.id         AS WishlistId,
                           c.id         AS CustomerId,
                           p.id         AS ProductId,
                           p.name       AS ProductName,
                           p.image_path AS ProductImagePath,
                           p.price      AS ProductPrice
                    FROM wishlist w
                             JOIN customers c ON c.id = w.customer_id
                             JOIN products p ON p.id = w.product_id
                    WHERE w.customer_id = @CustomerId
                    ORDER BY w.id DESC
                END
        END
END
GO
USE [master]
GO
ALTER DATABASE [DEV_MASTER] SET READ_WRITE
GO
