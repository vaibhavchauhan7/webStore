USE [master]
GO
/****** Object:  Database [WEB_MASTER]    Script Date: 20-09-2020 11:53:06 PM ******/
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
/****** Object:  Table [dbo].[contact]    Script Date: 20-09-2020 11:53:06 PM ******/
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
/****** Object:  Table [dbo].[customers]    Script Date: 20-09-2020 11:53:06 PM ******/
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
/****** Object:  Table [dbo].[orders]    Script Date: 20-09-2020 11:53:06 PM ******/
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
/****** Object:  Table [dbo].[products]    Script Date: 20-09-2020 11:53:06 PM ******/
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
/****** Object:  StoredProcedure [dbo].[spCustomerSignUp]    Script Date: 20-09-2020 11:53:06 PM ******/
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
/****** Object:  StoredProcedure [dbo].[spGetCustomerByEmail]    Script Date: 20-09-2020 11:53:06 PM ******/
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
/****** Object:  StoredProcedure [dbo].[spInsertAndGetOrdersForCustomer]    Script Date: 20-09-2020 11:53:06 PM ******/
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
