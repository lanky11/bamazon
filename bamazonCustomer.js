var inquirer = require('inquirer');
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  //queryAllProducts();
  start();
});

function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i=0; i<res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name  + " | $" + res[i].price);
    }
    //connection.end();
  });
}

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "productToBuy",
      message: "Please type the ID of the product you would like to buy?",
    })
    .then(function(answer) {
      console.log("Good call, item number " + answer.productToBuy + " is a great buy!");
      connection.end();
    });
}

