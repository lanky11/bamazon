-- Drops the bamazon database if it exists currently --
DROP DATABASE IF EXISTS bamazonDB;
-- Creates the "bamazonDB" database --
CREATE DATABASE bamazonDB;

-- Makes it so all of the following code will affect bamazonDB --
USE bamazonDB;

-- Creates the table "products" within animals_db --
CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "product_name" which cannot contain null --
  product_name VARCHAR(30) NOT NULL,
  -- Makes a string column called "product_name" which cannot contain null --
  department_name VARCHAR(30) NOT NULL,
  -- Makes a sting column called "pet_name" --
  price INTEGER(10),
  -- Makes an numeric column called "pet_age" --
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("1 doz Titleist Pro V1", "sporting goods", 45, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nike Hat", "sporting goods", 20, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hand lotion", "beauty and health", 15, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Face Wash", "beauty and health", 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Disney Cars track", "toys", 30, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Thomas the Train", "toys", 5, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Red Shirt", "clothing", 20, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blue Jeans", "clothing", 65, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beats headphones", "electronics", 100, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("6ft HDMI cable", "electronics", 10, 100);

