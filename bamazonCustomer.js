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
      console.log(res[i].item_id + " | " + res[i].product_name  + " | $" + res[i].price);
    }
    promptUser();
  });
}

// function that askes for what product and product quantity
function promptUser() {
  //queryAllProducts();
  inquirer.prompt([
    {
      name: "productToBuy",
      message: "Please type the ID of the product you would like to buy?",
      type: "input"
    },
    {
      name: "productQuantity",
      type: "input",
      message: "How many would you like?"
    },
    {
      name: "confirm",
      type: "confirm",
      message: "Are you sure you want to complete your order?",
      default: true
    }
  ]).then(function(answer) {

    if (answer.confirm) {
      // store answers in variables
      var prodId = answer.productToBuy;
      var prodQuant = answer.productQuantity;
      
      // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
      // However, if your store does have enough of the product, you should fulfill the customer's order.
      if () {
        // display to user their total
        // console.log("");
        // promptUser);
      
        // If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
      } else {
        // if there wasn't enough stock to fill order.
        // console.log("Insufficient quantity!");
        // promptUser();
      }

      // This means updating the SQL database to reflect the remaining quantity.
      // Once the update goes through, show the customer the total cost of their purchase.


      console.log("Updating stock\n");
      var query = connection.query("UPDATE bamazonDB.products SET ? WHERE ?",
        [
          {
            stock_quantity: prodQuant
          },
          {
            item_id: prodId
          }
        ],
        function(err, res) {
          console.log(res.affectedRows + " products updated!\n");
        }
      );
    
      // logs the actual query being run
      console.log(query.sql);
      
    }
    else {
      console.log("\nSorry to see you go.  Please shop with us again.\n");
      connection.end();
    }
  });
}

// function to update the product
function updateProduct() {
  
}
