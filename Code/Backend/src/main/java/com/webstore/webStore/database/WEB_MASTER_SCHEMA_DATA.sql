USE [master]
GO
/****** Object:  Database [WEB_MASTER]    Script Date: 20-09-2020 11:51:35 PM ******/
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
/****** Object:  Table [dbo].[contact]    Script Date: 20-09-2020 11:51:35 PM ******/
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
/****** Object:  Table [dbo].[customers]    Script Date: 20-09-2020 11:51:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customers]
(
    [id]       [int] IDENTITY (1,1) NOT NULL,
    [name]     [varchar](50)        NOT NULL,
    [email]    [varchar](50)        NOT NULL,
    [phone]    [varchar](50)        NOT NULL,
    [password] [varchar](70)        NOT NULL,
    CONSTRAINT [PK_customers] PRIMARY KEY CLUSTERED
        (
         [id] ASC
            ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[orders]    Script Date: 20-09-2020 11:51:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orders]
(
    [OrderID]      [int] IDENTITY (1,1) NOT NULL,
    [OrderNumber]  [int]                NOT NULL,
    [CustomerID]   [int]                NOT NULL,
    [ProductID]    [int]                NOT NULL,
    [PurchaseDate] [varchar](10)        NOT NULL,
    [PurchaseTime] [varchar](8)         NOT NULL,
    CONSTRAINT [CK_Unique_OrderID_OrderNumber] PRIMARY KEY CLUSTERED
        (
         [OrderID] ASC,
         [OrderNumber] ASC
            ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[products]    Script Date: 20-09-2020 11:51:35 PM ******/
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
SET IDENTITY_INSERT [dbo].[contact] ON

INSERT [dbo].[contact] ([id], [name], [email], [subject], [message])
VALUES (1, N'Vaibhav Chauhan', N'vc@vc.com', N'I am Logged In', N'While Filling Up This Form')
INSERT [dbo].[contact] ([id], [name], [email], [subject], [message])
VALUES (2, N'Name w/o Login', N'iamnot@logged.in', N'I have Logged Out', N'To Test If It Works')
SET IDENTITY_INSERT [dbo].[contact] OFF
GO
SET IDENTITY_INSERT [dbo].[customers] ON

INSERT [dbo].[customers] ([id], [name], [email], [phone], [password])
VALUES (1, N'Vaibhav Chauhan', N'vc@vc.com', N'1234567890',
        N'$2y$10$QvSDfmML1qNLx4IkmW88sOSskZo5VKxf7IvU/xPoFP5Y8FvjvVbgW')
INSERT [dbo].[customers] ([id], [name], [email], [phone], [password])
VALUES (2, N'Ajay K Bhardwaj', N'akb@akb.com', N'1234567891',
        N'$2y$10$cYlgr91oMMvs0cR6bzE6X.8KNErkJTRm0Ll.bUBUSNZMYAKldJJka')
INSERT [dbo].[customers] ([id], [name], [email], [phone], [password])
VALUES (3, N'Karann Jakhar', N'kj@kj.com', N'1234567892',
        N'$2y$10$PzXivpopD435peA8Frp4ku01VLGPinaRz/oyqnX6ztKKaheuKSxLS')
INSERT [dbo].[customers] ([id], [name], [email], [phone], [password])
VALUES (4, N'Ritwik Giri', N'rg@rg.com', N'1234567893', N'$2y$10$FJemNBHxqweXxB78ojMZFu4y.PxoentZFxDxtC1iv1ggcb3auxwFW')
INSERT [dbo].[customers] ([id], [name], [email], [phone], [password])
VALUES (5, N'Sanket Kaliraman', N'sk@sk.com', N'1234567894',
        N'$2y$10$uZVY8WaTJ9yGfOVNyYJtfex9q9A7KMy/xcXN9hMZxb5MPGf/gRpUW')
INSERT [dbo].[customers] ([id], [name], [email], [phone], [password])
VALUES (6, N'Shishpal Chauhan', N'sc@sc.com', N'1234567895',
        N'$2y$10$/UCCEcFppGKxaR9Cmg1aRu/EY1PH8G3Dzf2q/AxCjS5WPkqZhn0JC')
INSERT [dbo].[customers] ([id], [name], [email], [phone], [password])
VALUES (7, N'Renu Chauhan', N'rc@rc.com', N'1234567896',
        N'$2y$10$t2sv1Y0CuC/H.wcd.d3B9.EzPHt8C5nwb1fgHT3YN5Ag6RdcxR1Su')
SET IDENTITY_INSERT [dbo].[customers] OFF
GO
SET IDENTITY_INSERT [dbo].[orders] ON

INSERT [dbo].[orders] ([OrderID], [OrderNumber], [CustomerID], [ProductID], [PurchaseDate], [PurchaseTime])
VALUES (1, 1, 1, 6, N'20/09/2020', N'11:41 PM')
INSERT [dbo].[orders] ([OrderID], [OrderNumber], [CustomerID], [ProductID], [PurchaseDate], [PurchaseTime])
VALUES (2, 2, 6, 1, N'20/09/2020', N'11:43 PM')
SET IDENTITY_INSERT [dbo].[orders] OFF
GO
SET IDENTITY_INSERT [dbo].[products] ON

INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (1, N'Jet Black T-Shirt', N'Men''s Jet Black Sports T-Shirt',
        N'../assets/Images/Products/T-Shirts/Jet Black.png', N'499', N'T-Shirt')
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (2, N'Pink Red T-Shirt', N'Men''s Pink Red Casual T-Shirt', N'../assets/Images/Products/T-Shirts/Pink Red.png',
        N'699', N'T-Shirt')
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (3, N'Concrete Grey T-Shirt', N'Men''s Concrete Grey Trek T-Shirt',
        N'../assets/Images/Products/T-Shirts/Concrete Grey.png', N'399', N'T-Shirt')
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (4, N'Nike Yellow Claw', N'Nike''s Original Yellow Claw',
        N'../assets/Images/Products/Shoes/Nike Yellow Claw.png', N'4,999', N'Shoes')
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (5, N'Nike Black Swift', N'Nike''s Black Swifties', N'../assets/Images/Products/Shoes/Nike Black Swift.png',
        N'7,599', N'Shoes')
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (6, N'Nike Air Force', N'Nike''s Rare Air Force', N'../assets/Images/Products/Shoes/Nike Air Force.png',
        N'3,199', N'Shoes')
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (7, N'Dark Knight', N'Apple Watch - Dark Knight',
        N'../assets/Images/Products/Wrist Watch/Apple Watch - Dark Knight.png', N'35,999', N'Wrist Watch')
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (8, N'Marble White', N'Apple Watch - Marble White',
        N'../assets/Images/Products/Wrist Watch/Apple Watch - Marble White.png', N'40,599', N'Wrist Watch')
INSERT [dbo].[products] ([id], [name], [description], [image_path], [price], [category])
VALUES (9, N'Rose Gold', N'Apple Watch - Rose Gold',
        N'../assets/Images/Products/Wrist Watch/Apple Watch - Rose Gold.png', N'30,599', N'Wrist Watch')
SET IDENTITY_INSERT [dbo].[products] OFF
GO
ALTER TABLE [dbo].[orders]
    WITH CHECK ADD CONSTRAINT [FK_orders_customers] FOREIGN KEY ([CustomerID])
        REFERENCES [dbo].[customers] ([id])
GO
ALTER TABLE [dbo].[orders]
    CHECK CONSTRAINT [FK_orders_customers]
GO
ALTER TABLE [dbo].[orders]
    WITH CHECK ADD CONSTRAINT [FK_orders_products] FOREIGN KEY ([ProductID])
        REFERENCES [dbo].[products] ([id])
GO
ALTER TABLE [dbo].[orders]
    CHECK CONSTRAINT [FK_orders_products]
GO
/****** Object:  StoredProcedure [dbo].[spCustomerSignUp]    Script Date: 20-09-2020 11:51:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spCustomerSignUp] @name varchar(50),
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
/****** Object:  StoredProcedure [dbo].[spGetCustomerByEmail]    Script Date: 20-09-2020 11:51:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spGetCustomerByEmail] @email nvarchar(50)
AS
BEGIN
    SELECT *
    FROM customers c
    WHERE c.email = @email
END
GO
/****** Object:  StoredProcedure [dbo].[spInsertAndGetOrdersForCustomer]    Script Date: 20-09-2020 11:51:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spInsertAndGetOrdersForCustomer] @customerID int,
                                                         @productID int = null
AS

    SET NOCOUNT ON
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN

    if @productID > 0
        begin
            insert into orders
            select case
                       when max(o.OrderID) is null then 1
                       else max(o.OrderID) + 1
                       end,
                   @customerID,
                   @productID,
                   convert(varchar(10), getdate(), 103),
                   format(convert(datetime, getdate()), 'hh:mm tt')
            from orders o
                     left join customers c on c.id = @customerID
                     left join products p on p.id = @productID
            where o.OrderID = o.OrderNumber
        end

    create table #tmp_orders_customers
    (
        OrderID          int         not null,
        OrderNumber      int         not null,
        CustomerID       int         not null,
        CustomerName     varchar(50) not null,
        CustomerEmail    varchar(50) not null,
        CustomerPhone    varchar(50) not null,
        ProductID        int         not null,
        ProductName      varchar(50) not null,
        ProductPrice     varchar(20) not null,
        PurchaseDate     varchar(10),
        PurchaseTime     varchar(8),
        ProductImagePath varchar(max)
    )

    insert into #tmp_orders_customers
    select o.OrderID,
           o.OrderNumber,
           c.id,
           c.name,
           c.email,
           c.phone,
           p.id,
           p.name,
           p.price,
           o.PurchaseDate,
           o.PurchaseTime,
           p.image_path
    from orders o
             join customers c on c.id = o.CustomerID
             join products p on p.id = o.ProductID

    if (@productID > 0)
        begin
            select *
            from #tmp_orders_customers toc
            where toc.CustomerID = @customerID
              and toc.ProductID = @productID
        end
    else
        begin
            select *
            from #tmp_orders_customers toc
            where toc.CustomerID = @customerID
            order by toc.OrderID desc
        end

    drop table #tmp_orders_customers

END
GO
USE [master]
GO
ALTER DATABASE [WEB_MASTER] SET READ_WRITE
GO
