const { log } = require("console");
var express = require("express");
const { stat } = require("fs");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
server.listen(8080);
app.use(express.static("public"));
app.get("/", function(req, res){
res.sendFile(__dirname + "/public/html/index.html")});
app.get("/mainpage", function(req, res){
res.sendFile(__dirname + "/public/html/mainpage.html")});
app.get("/adminpanel", function(req, res){
res.sendFile(__dirname + "/public/html/adminpanel.html")});
app.get("/addEstate", function(req, res){
res.sendFile(__dirname + "/public/html/addEstate.html")});
app.get("/showEstate", function(req, res){
res.sendFile(__dirname + "/public/html/showEstate.html")});
app.get("/showEstateadmin", function(req, res){
  res.sendFile(__dirname + "/public/html/showEstateadmin.html")});
app.get("/gotosale", function(req, res){
  res.sendFile(__dirname + "/public/html/getSale.html")});
  app.get("/gotosaleadmin", function(req, res){
    res.sendFile(__dirname + "/public/html/getSaleadmin.html")});
    app.get("/createsale", function(req, res){
      res.sendFile(__dirname + "/public/html/createSale.html")});
      app.get("/buy", function(req, res){
        res.sendFile(__dirname + "/public/html/buyEstate.html")});
        app.get("/gotoconfirm", function(req, res){
          res.sendFile(__dirname + "/public/html/Confirm.html")});
const ganacheUrl = 'http://localhost:7545';
const { Web3 } = require('web3');
var provider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(provider);
var contract = new web3.eth.Contract([
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "estates",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "info",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "square",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "sale_status",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "sales",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "estate_id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "customer",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_admin",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "password",
        "type": "string"
      }
    ],
    "name": "set_admin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "get_admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "get_adminPassword",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "show_name",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "show_info",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "show_square",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "show_status",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "info",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "square",
        "type": "uint256"
      }
    ],
    "name": "create_estate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "e_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "create_sale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "s_id",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "buy",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "s_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "u_id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "confirm_sale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "s_id",
        "type": "uint256"
      }
    ],
    "name": "get_sale",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
],"0x1685562833e9AA2Bd63f1535dC0b29F0F1725d67")
var login = ""
app.get("/main", function(req,res){
  var admin = req.query.login
  var password = req.query.password
  contract.methods.get_admin().call().then(function(data){
    if(data == "0x0000000000000000000000000000000000000000"){
      {
        contract.methods.set_admin(admin, password).send({from: admin, gas: '1000000',gasPrice:1000000000}).then(function(account){
      })
      }
    }
    else
    {
      contract.methods.get_admin().call().then(function(data){
        login = data;
        contract.methods.get_adminPassword().call().then(function(account){
         res.send(data + " " + account);
         console.log(data + " " + account)
         console.log("админ: " + login);
        })
     })
    }
  })
})
app.get("/balance", function(req,res){
  web3.eth.getBalance(login).then(function(bank){
    bank = web3.utils.fromWei(bank,'ether')
    res.send(bank.toString())   
  })
})
app.get("/show_admin", function(req, res){
  contract.methods.get_admin().call().then(function(data){
    res.send(data)
  })
})
app.get("/comeByGuess", function(req, res){
  login = req.query.address
  console.log(login)
})

app.get("/sendItem", function(req, res){
  var address = req.query.address
  var info = req.query.info
  var square = req.query.square
  console.log(req.query)
  contract.methods.create_estate(address,info,Number(square)).send({from: login, gas: '1000000',gasPrice:1000000000}).then(function(data){
    res.send(data.transactionHash)
  })
})

app.get("/getItem", function(req, res){
  var index = req.query.index;
  var result = ""
  contract.methods.show_name(Number(index)).call().then(function(data){
    contract.methods.show_info(Number(index)).call().then(function(info){
      contract.methods.show_square(Number(index)).call().then(function(square){
        contract.methods.show_status(Number(index)).call().then(function(status){
          res.send("Владелец: " + data + " | " + "Информация: " + info + " | " + "Площадь: " + square + " | " + "Статус продажи: " + status)
        })
      })
    })
  })
})



app.get("/getsale", function(req,res){
  var index = req.query.saleID;
  console.log(req.query)
  contract.methods.get_sale(Number(index)).call().then(function(data){
    data["2"] = Number(data["2"])
    data["0"] = Number(data["0"])
    console.log(data)
    res.send(data) 
  })
})

app.get("/createSalea", function(req,res){
  console.log(login);
  var eId = req.query.idEstate;
  var price = req.query.price;
  price = web3.utils.toWei(price, 'ether'); // Преобразование из ETH в wei
  contract.methods.create_sale(Number(eId), price, login).send({from: login, gas: '1000000', gasPrice: '1000000000'}).then(function(data){
    res.send(data.transactionHash);
  });
});


app.get("/buye", function(req, res){
  var id = req.query.buyID;
  var price = req.query.priceValue;
  price = web3.utils.toWei(price, 'ether'); // Преобразуем цену в wei
  contract.methods.get_sale(Number(id)).call().then(function(address){
      var owner = address["1"];
      var sid = Number(address["0"]);
      contract.methods.buy(Number(sid), owner, price).send({from: login, value: price, gas:'1000000', gasPrice:1000000000})
      .then(function(data){
          res.send(data.transactionHash);
      }).catch(function(error){
          console.log(error);
          res.status(500).send("Error occurred during purchase.");
      });
  }).catch(function(error){
      console.log(error);
      res.status(500).send("Error occurred during purchase.");
  });
});


app.get("/confirmbuy", function(req,res){
  var id = req.query.salesID;
  var uID = req.query.userID;
  console.log(req.query);
  contract.methods.get_sale(Number(id)).call().then(function(address){
      var owner = address["1"];
      var price = Number(address["2"]);
      price = web3.utils.toWei(price.toString(), 'ether'); // Преобразуем цену в wei
      contract.methods.confirm_sale(Number(id), Number(uID), owner).send({from: login, gas:'1000000', gasPrice:1000000000})
      .then(function(data){
          web3.eth.sendTransaction({from: login, to: owner, value: price,gas:'1000000', gasPrice:1000000000})
          .then(function(money){
              res.send(money.transactionHash);
          }).catch(function(error){
              console.log(error);
              res.status(500).send("Error occurred during confirmation of sale.");
          });
      }).catch(function(error){
          console.log(error);
          res.status(500).send("Error occurred during confirmation of sale.");
      });
  }).catch(function(error){
      console.log(error);
      res.status(500).send("Error occurred during confirmation of sale.");
  });
});
