USE [master]
GO
/****** Object:  Database [WEB_MASTER]    Script Date: 27-09-2020 07:56:20 PM ******/
CREATE DATABASE [WEB_MASTER]
    CONTAINMENT = NONE
    ON PRIMARY
    ( NAME = N'WEB_MASTER', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\WEB_MASTER.mdf' , SIZE = 8192 KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536 KB )
    LOG ON
    ( NAME = N'WEB_MASTER_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\WEB_MASTER_log.ldf' , SIZE = 8192 KB , MAXSIZE = 2048 GB , FILEGROWTH = 65536 KB )
    WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [WEB_MASTER] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
    begin
        EXEC [WEB_MASTER].[dbo].[sp_fulltext_database] @action = 'enable'
    end
GO
ALTER DATABASE [WEB_MASTER] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [WEB_MASTER] SET ANSI_NULLS OFF
GO
ALTER DATABASE [WEB_MASTER] SET ANSI_PADDING OFF
GO
ALTER DATABASE [WEB_MASTER] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [WEB_MASTER] SET ARITHABORT OFF
GO
ALTER DATABASE [WEB_MASTER] SET AUTO_CLOSE OFF
GO
ALTER DATABASE [WEB_MASTER] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [WEB_MASTER] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [WEB_MASTER] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [WEB_MASTER] SET CURSOR_DEFAULT GLOBAL
GO
ALTER DATABASE [WEB_MASTER] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [WEB_MASTER] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [WEB_MASTER] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [WEB_MASTER] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [WEB_MASTER] SET DISABLE_BROKER
GO
ALTER DATABASE [WEB_MASTER] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [WEB_MASTER] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [WEB_MASTER] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [WEB_MASTER] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [WEB_MASTER] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [WEB_MASTER] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [WEB_MASTER] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [WEB_MASTER] SET RECOVERY FULL
GO
ALTER DATABASE [WEB_MASTER] SET MULTI_USER
GO
ALTER DATABASE [WEB_MASTER] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [WEB_MASTER] SET DB_CHAINING OFF
GO
ALTER DATABASE [WEB_MASTER] SET FILESTREAM ( NON_TRANSACTED_ACCESS = OFF )
GO
ALTER DATABASE [WEB_MASTER] SET TARGET_RECOVERY_TIME = 60 SECONDS
GO
ALTER DATABASE [WEB_MASTER] SET DELAYED_DURABILITY = DISABLED
GO
ALTER DATABASE [WEB_MASTER] SET QUERY_STORE = OFF
GO
USE [WEB_MASTER]
GO
/****** Object:  Table [dbo].[cart]    Script Date: 27-09-2020 07:56:20 PM ******/
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
/****** Object:  Table [dbo].[contact]    Script Date: 27-09-2020 07:56:20 PM ******/
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
/****** Object:  Table [dbo].[customers]    Script Date: 27-09-2020 07:56:20 PM ******/
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
/****** Object:  Table [dbo].[orders]    Script Date: 27-09-2020 07:56:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orders]
(
    [id]            [int] IDENTITY (1,1) NOT NULL,
    [order_number]  [int]                NOT NULL,
    [customer_id]   [int]                NOT NULL,
    [product_id]    [int]                NOT NULL,
    [purchase_date] [varchar](10)        NOT NULL,
    [purchase_time] [varchar](8)         NOT NULL,
    CONSTRAINT [CK_Unique_OrderID_OrderNumber] PRIMARY KEY CLUSTERED
        (
         [id] ASC,
         [order_number] ASC
            ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[products]    Script Date: 27-09-2020 07:56:20 PM ******/
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
/****** Object:  Table [dbo].[wishlist]    Script Date: 27-09-2020 07:56:20 PM ******/
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
        N'$2y$10$7TKi499kTSEqBe3X5WLJquHSIHP8uSfum0KpyKRO91IykauwLMVB6')
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
VALUES (2, N'Pink Red T-Shirt', N'Men''s Pink Red Casual T-Shirt', N'../assets/Images/Products/T-Shirts/Pink Red.png',
        N'699', N'T-Shirt')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (3, N'Concrete Grey T-Shirt', N'Men''s Concrete Grey Trek T-Shirt',
        N'../assets/Images/Products/T-Shirts/Concrete Grey.png', N'399', N'T-Shirt')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (4, N'Nike Yellow Claw', N'Nike''s Original Yellow Claw',
        N'../assets/Images/Products/Shoes/Nike Yellow Claw.png', N'4,999', N'Shoes')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (5, N'Nike Black Swift', N'Nike''s Black Swifties', N'../assets/Images/Products/Shoes/Nike Black Swift.png',
        N'7,599', N'Shoes')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (6, N'Nike Air Force', N'Nike''s Rare Air Force', N'../assets/Images/Products/Shoes/Nike Air Force.png',
        N'3,199', N'Shoes')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (7, N'Dark Knight', N'Apple Watch - Dark Knight',
        N'../assets/Images/Products/Wrist Watch/Apple Watch - Dark Knight.png', N'35,999', N'Wrist Watch')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (8, N'Marble White', N'Apple Watch - Marble White',
        N'../assets/Images/Products/Wrist Watch/Apple Watch - Marble White.png', N'40,599', N'Wrist Watch')
GO
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (9, N'Rose Gold', N'Apple Watch - Rose Gold',
        N'../assets/Images/Products/Wrist Watch/Apple Watch - Rose Gold.png', N'30,599', N'Wrist Watch')
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
/****** Object:  StoredProcedure [dbo].[spClearCartWishlist]    Script Date: 27-09-2020 07:56:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spClearCartWishlist] @customerID INT,
                                             @productType VARCHAR(10)
AS

    SET NOCOUNT ON
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN
    IF (@productType = 'Wishlist')
        BEGIN
            DELETE FROM wishlist WHERE wishlist.customer_id = @customerID;
        END
    ELSE
        BEGIN
            DELETE FROM cart WHERE cart.customer_id = @customerID;
        END
END

GO
/****** Object:  StoredProcedure [dbo].[spCustomerSignUp]    Script Date: 27-09-2020 07:56:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spCustomerSignUp] @firstName VARCHAR(50),
                                          @lastName VARCHAR(50),
                                          @email VARCHAR(50),
                                          @phone VARCHAR(50),
                                          @password VARCHAR(70)
AS

    SET NOCOUNT ON
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN
    IF NOT EXISTS(SELECT 1 FROM customers WHERE email = @email OR phone = @phone)
        BEGIN
            INSERT INTO customers
            VALUES (@firstName, @lastName, @email, @phone, @password)
        END
END
GO
/****** Object:  StoredProcedure [dbo].[spForgotPassword]    Script Date: 27-09-2020 07:56:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spForgotPassword] @email VARCHAR(50),
                                          @phone VARCHAR(50),
                                          @newPassword VARCHAR(70) = NULL
AS

    SET NOCOUNT ON
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN
    IF EXISTS(SELECT 1 FROM customers WHERE email = @email OR phone = @phone)
        BEGIN
            IF (@newPassword IS NOT NULL)
                BEGIN
                    UPDATE customers
                    SET password = @newPassword
                    where email = @email
                      and phone = @phone
                END
        END
END
GO
/****** Object:  StoredProcedure [dbo].[spGetCustomerByEmail]    Script Date: 27-09-2020 07:56:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spGetCustomerByEmail] @email VARCHAR(50)
AS

    SET NOCOUNT ON
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN
    SELECT *
    FROM customers c
    WHERE c.email = @email
END

GO
/****** Object:  StoredProcedure [dbo].[spInsertAndGetOrdersForCustomer]    Script Date: 27-09-2020 07:56:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spInsertAndGetOrdersForCustomer] @customerID INT,
                                                         @productID INT = NULL
AS

    SET NOCOUNT ON
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN

    IF (@productID > 0)
        BEGIN
            INSERT INTO orders
            SELECT CASE
                       WHEN MAX(o.id) IS NULL THEN 1
                       ELSE MAX(o.id) + 1
                       END,
                   @customerID,
                   @productID,
                   CONVERT(VARCHAR(10), GETDATE(), 103),
                   FORMAT(CONVERT(DATETIME, GETDATE()), 'hh:mm tt')
            FROM orders o
                     JOIN customers c ON c.id = @customerID
                     JOIN products p ON p.id = @productID
            WHERE o.id = o.order_number
        END

    CREATE TABLE #tmp_orders_customers
    (
        OrderID          INT         NOT NULL,
        OrderNumber      INT         NOT NULL,
        CustomerID       INT         NOT NULL,
        CustomerName     VARCHAR(50) NOT NULL,
        CustomerEmail    VARCHAR(50) NOT NULL,
        CustomerPhone    VARCHAR(50) NOT NULL,
        ProductID        INT         NOT NULL,
        ProductName      VARCHAR(50) NOT NULL,
        ProductPrice     VARCHAR(20) NOT NULL,
        PurchaseDate     VARCHAR(10),
        PurchaseTime     VARCHAR(8),
        ProductImagePath VARCHAR(MAX)
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

    IF (@productID > 0)
        BEGIN
            SELECT *
            FROM #tmp_orders_customers toc
            WHERE toc.CustomerID = @customerID
              AND toc.ProductID = @productID
        END
    ELSE
        BEGIN
            SELECT *
            FROM #tmp_orders_customers toc
            WHERE toc.CustomerID = @customerID
            ORDER BY toc.OrderID DESC
        END

    DROP TABLE #tmp_orders_customers

END

GO
/****** Object:  StoredProcedure [dbo].[spManageCartWishlist]    Script Date: 27-09-2020 07:56:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spManageCartWishlist] @customerID INT,
                                              @productID INT = 0,
                                              @productType VARCHAR(10),
                                              @removeProduct BIT = 0,
                                              @quantity INT = 1
AS

    SET NOCOUNT ON
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN

    IF (@productID > 0 AND @productType = 'Wishlist')
        BEGIN
            IF (@removeProduct = 0)
                BEGIN
                    IF NOT EXISTS(SELECT 1 FROM wishlist WHERE product_id = @productID AND customer_id = @customerID)
                        BEGIN
                            INSERT INTO wishlist
                            SELECT c.id,
                                   p.id,
                                   p.name,
                                   p.image_path,
                                   p.price
                            FROM products p
                                     JOIN customers c ON c.id = @customerID
                            WHERE p.id = @productID
                        END
                END
            ELSE
                BEGIN
                    IF EXISTS(SELECT 1 FROM wishlist WHERE product_id = @productID AND customer_id = @customerID)
                        DELETE
                        FROM wishlist
                        WHERE product_id = @productID
                END
        END
    ELSE
        IF (@productID > 0 AND @productType = 'Cart')
            BEGIN
                IF (@removeProduct = 0)
                    BEGIN
                        IF NOT EXISTS(SELECT 1 FROM cart WHERE product_id = @productID AND customer_id = @customerID)
                            BEGIN
                                INSERT INTO cart
                                SELECT c.id,
                                       p.id,
                                       p.name,
                                       p.image_path,
                                       p.price,
                                       @quantity
                                FROM products p
                                         JOIN customers c ON c.id = @customerID
                                WHERE p.id = @productID
                            END
                    END
                ELSE
                    BEGIN
                        IF EXISTS(SELECT 1 FROM cart WHERE product_id = @productID AND customer_id = @customerID)
                            DELETE
                            FROM cart
                            WHERE product_id = @productID
                    END
            END

    IF (@productType = 'Wishlist')
        BEGIN
            CREATE TABLE #tmp_wishlist
            (
                WishlistID       INT         NOT NULL,
                CustomerID       INT         NOT NULL,
                ProductID        INT         NOT NULL,
                ProductName      VARCHAR(50) NOT NULL,
                ProductImagePath VARCHAR(MAX),
                ProductPrice     VARCHAR(20) NOT NULL
            )

            INSERT INTO #tmp_wishlist
            SELECT w.id,
                   c.id,
                   p.id,
                   p.name,
                   p.image_path,
                   p.price
            FROM wishlist w
                     JOIN customers c ON c.id = w.customer_id
                     JOIN products p ON p.id = w.product_id

            SELECT *
            FROM #tmp_wishlist tmpw
            WHERE tmpw.CustomerID = @customerID
            ORDER BY tmpw.WishlistID DESC
        END
    ELSE
        IF (@productType = 'Cart')
            BEGIN
                CREATE TABLE #tmp_cart
                (
                    CartID           INT         NOT NULL,
                    CustomerID       INT         NOT NULL,
                    ProductID        INT         NOT NULL,
                    ProductName      VARCHAR(50) NOT NULL,
                    ProductImagePath VARCHAR(MAX),
                    ProductPrice     VARCHAR(20) NOT NULL,
                    ProductQuantity  INT         NOT NULL
                )

                INSERT INTO #tmp_cart
                SELECT ct.id,
                       c.id,
                       p.id,
                       p.name,
                       p.image_path,
                       p.price,
                       ct.quantity
                FROM cart ct
                         JOIN customers c ON c.id = ct.customer_id
                         JOIN products p ON p.id = ct.product_id

                SELECT *
                FROM #tmp_cart tmpc
                WHERE tmpc.CustomerID = @customerID
                ORDER BY tmpc.CartID DESC
            END

    IF (@productType = 'Wishlist')
        BEGIN
            DROP TABLE #tmp_wishlist
        END
    ELSE
        BEGIN
            DROP TABLE #tmp_cart
        END

END

GO
USE [master]
GO
ALTER DATABASE [WEB_MASTER] SET READ_WRITE
GO
