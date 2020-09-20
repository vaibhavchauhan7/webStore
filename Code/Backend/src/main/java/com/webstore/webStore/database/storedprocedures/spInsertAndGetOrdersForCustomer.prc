USE [WEB_MASTER]
GO

/****** Object:  StoredProcedure [dbo].[spInsertAndGetOrdersForCustomer]    Script Date: 20-09-2020 10:25:36 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[spInsertAndGetOrdersForCustomer]
GO

/****** Object:  StoredProcedure [dbo].[spInsertAndGetOrdersForCustomer]    Script Date: 20-09-2020 10:25:36 PM ******/
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
begin
	insert into orders
	select
	case
		when max(o.OrderID) is null then 1
		else max(o.OrderID) + 1
	end,
	@customerID,
	@productID,
	convert(varchar(10),getdate(),103),
	format(convert(datetime, getdate()), 'hh:mm tt')
	from orders o
	left join customers c on c.id = @customerID
	left join products p on p.id = @productID
	where o.OrderID = o.OrderNumber
end

create table #tmp_orders_customers (
	OrderID int not null,
	OrderNumber int not null,
	CustomerID int not null,
	CustomerName varchar(50) not null,
	CustomerEmail varchar(50) not null,
	CustomerPhone varchar(50) not null,
	ProductID int not null,
	ProductName varchar(50) not null,
	ProductPrice int not null,
	PurchaseDate varchar(10),
	PurchaseTime varchar(8),
	ProductImagePath varchar(max)
)

insert into #tmp_orders_customers
select
	o.OrderID,
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
	select * from #tmp_orders_customers toc
	where toc.CustomerID = @customerID and toc.ProductID = @productID
end
else
begin
	select * from #tmp_orders_customers toc
	where toc.CustomerID = @customerID
	order by toc.OrderID desc
end

drop table #tmp_orders_customers

END
GO


