USE [WEB_MASTER]
GO

/****** Object:  StoredProcedure [dbo].[spInsertAndGetOrdersForCustomer]    Script Date: 19-09-2020 05:54:54 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[spInsertAndGetOrdersForCustomer]
GO

/****** Object:  StoredProcedure [dbo].[spInsertAndGetOrdersForCustomer]    Script Date: 19-09-2020 05:54:54 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[spInsertAndGetOrdersForCustomer]
	@customerID		int,
	@productID		int = null
AS

SET NOCOUNT ON
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

BEGIN

if @productID > 0
insert into orders
	select
	case
		when max(o.OrderID) is null then 1
		else max(o.OrderID) + 1
	end,
	@customerID,
	@productID
	from orders o
	left join customers c on c.id = @customerID
	left join products p on p.id = @productID
	where o.OrderID = o.OrderNumber

create table #tmp_orders_customers (
	OrderID int not null,
	OrderNumber int not null,
	--PurchaseDate datetime
	CustomerID int not null,
	CustomerName varchar(50) not null,
	CustomerEmail varchar(50) not null,
	ProductID int not null,
	ProductName varchar(50) not null
)

insert into #tmp_orders_customers
select
	o.OrderID,
	o.OrderNumber,
	c.id,
	c.name,
	c.email,
	p.id,
	p.name
from customers c
join orders o on c.id = o.CustomerID
join products p on p.id = o.ProductID

SELECT * FROM #tmp_orders_customers toc where toc.CustomerID = @customerID

drop table #tmp_orders_customers

END
GO


