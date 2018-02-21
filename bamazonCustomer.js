// npm packages
var inquirer = require('inquirer');
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazonDB"
});

// connect with database and run app.
//==========================================================================================================
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryAllProducts();
});

// funcitons
//==========================================================================================================

// function to show all the products in bamazon.
function queryAllProducts() {
  console.log("The following items are available for purchase at Bamazon.");
  console.log("----------------------------------------------------------");
  connection.query("SELECT * FROM bamazonDB.products", function(err, res) {
    if (err) throw err;
    for (var i=0; i<res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name  + " | $" + res[i].price + " | Stock " + res[i].stock_quantity);
    }
    promptUser(res);
  });
}

// function that askes for what product and product quantity
//==========================================================================================================
function promptUser(res) {
  inquirer.prompt([
    {
      name: "productId",
      message: "Please type the ID of the product you would like to buy?",
      type: "input"
    },
    {
      name: "productQuant",
      type: "input",
      message: "How many would you like?"
    }
  ]).then(function(answer) {

    // store answers in variables
    var prodId = answer.productId;
    var prodQuant = answer.productQuant;


    // Check if the store has enough product to fill the order.
    //==========================================================================================================
    // connection.query("SELECT stock_quantity FROM bamazonDB.products WHERE ?",
    // [
    //   {
    //     item_id: prodId
    //   }
    // ],
    // function(err, res) {
    //   if (err) throw err;
    // });
    // if (res[0].stock_quantity > prodQuant) {
    //   console.log("Bamazon has enough stock!");
    // } else {
    //   console.log("Insufficient quantity!");
    //   connection.end();
    // }

    // Update product quantity in the database
    //==========================================================================================================
    connection.query("UPDATE bamazonDB.products SET ? WHERE ?",
    [
      {
        stock_quantity: res[prodId].stock_quantity - prodQuant
      },
      {
        item_id: prodId
      }
    ],
    function(err, res) {
      if (err) throw err;
    });

    // Display the total price of the items to the user
    //==========================================================================================================
    connection.query("SELECT * FROM bamazonDB.products WHERE ?",
    [
      {
        item_id: prodId
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log("-------------------------------------");
      console.log("Purchase details:");
      console.log("Item: " + res[0].product_name);
      console.log("Quantity: " + prodQuant);
      console.log("Total: $" + res[0].price * prodQuant);
      console.log("-------------------------------------");
    });
    
    connection.end(); 
    
  });
}

