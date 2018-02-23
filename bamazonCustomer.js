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
  // call function to display all products
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
    // all funciton to prompt user
    promptUser();
  });
}

// function that askes for what product and product quantity
//==========================================================================================================
function promptUser() {
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
    
    // Check if the store has enough product to fill the order.
    connection.query("SELECT * FROM bamazonDB.products WHERE ?",
    [
      {
        item_id: answer.productId
      }
    ],
    function(err, res) {
      if (err) throw err;

      if (res[0].stock_quantity >= answer.productQuant) {
        // store answers in variables
        var prodId = answer.productId;
        var prodQuant = answer.productQuant;
        console.log("prodId "+prodId);
        console.log("prodQuant "+prodQuant);
        console.log("Thank you for your order!");
        // run update db function
        updateProduct(prodId, prodQuant);
      } else {
        console.log("Insufficient quantity!");
        connection.end();
      }
    }); 
  })
}

// Update product quantity in the database
    //==========================================================================================================
  function updateProduct(prodId, prodQuant) {
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
      var name = res[0].product_name;
      var stock = res[0].stock_quantity;
      var price = res[0].price;
      var total = price * prodQuant
      console.log("-------------------------------------");
      console.log("Purchase details:");
      console.log("Item: " + name);
      console.log("Quantity: " + prodQuant);
      console.log("Total: $" + total);
      console.log("-------------------------------------");

      connection.query("UPDATE bamazonDB.products SET ? WHERE ?",
    [
      {
        stock_quantity: res[0].stock_quantity - prodQuant
      },
      {
        item_id: prodId
      }
    ],
    function(err, res) {
      if (err) throw err;
    });

    });
  }
