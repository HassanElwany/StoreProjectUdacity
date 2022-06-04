API Endpoints
Products
A SHOW ALL products route: 'products' [GET]
A SHOW product route: 'products/:id' [GET]
A CREATE product route: 'products' [POST] [token required]
[OPTIONAL] A SHOW TOP 5 products route: 'products/top-5' [GET]
[OPTIONAL] A SHOW BY CAT route: 'products/category/:category' [GET]
Users
A SHOW ALL route: 'users' [GET] [token required]
A SHOW route: 'users/:id' [GET] [token required]
A CREATE route: 'users' [POST] [token required]
Orders
A SHOW current order by user route: 'users/:uid/current-order' [GET] [token required]
[OPTIONAL] A SHOW completed orders by user route: 'users/:uid/completed-orders' [GET] [token required]
Data Shapes
Product
Table: Products (id:serial primary key, name:varchar, price:numeric, category:varchar)
User
Table: Users (id:serial primary key, first_name:varchar, last_name:varchar, password:varchar)
Orders
CREATE TYPE order_status AS ENUM ('active', 'complete');

Table: Orders (id:serial primary key, user_id[foreign key to users table], status:order_status)

Table: Products_in_Order (id:serial primary key, order_id:integer[foreign key to orders table], product_id:integer[foreign key to products table], quantity:integer)