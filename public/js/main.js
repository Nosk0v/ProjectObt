function comeByAdmin(){
    var login = document.getElementById("login").value
    var password = document.getElementById("password").value
    if(password == "")
    {
      $("#balance").text("Пароль не может быть пустым")
    }
    $.get("/main?login=" + login + "&password=" + password, function(data){     
          if (login + " " + password == data){
            location.replace("/adminpanel")
          }           
    })
}
balanceclick = 0
function getBalance(){
    balanceclick++
    if(balanceclick % 2 != 0){
        $.get("/balance", function(money){
            $("#balance").text("Баланс " + money)
           }) 
    }
    else{
        balanceclick = 0
        $("#balance").text("")
    }
}
function loginAsGuest(){
    var login = document.getElementById("login").value;
    $.get("/show_admin", function(data){
      if (login == data){       
      }
      else{
        if (login != "" && login.length == 42){
          $.get("/comeByGuess?address=" + login, function(data){     
          })
          location.replace("/mainpage")       
        }
      }
    })
  }

function logOut(){
    location.replace("/")
  }
function createEstate(){
    var address = document.getElementById("address").value
  var info= document.getElementById("info").value
  var square = document.getElementById("square").value
  $.get("/sendItem?address=" + address + "&info=" + info + "&square=" + square, function(data){
    location.replace("/adminpanel")
  })
  }
function addEstate(){
    location.replace("/addEstate")
  }
function backtoadmin(){
    location.replace("/adminpanel")
  }
function gotoEstate(){
    location.replace("/showEstate")
  }
function getItem(){
    var index = document.getElementById("index").value
    $.get("/getItem?index=" + index, function(data){
      $("#selectedItem").text(data)
    })
  }
function createSale(){
    var id = document.getElementById("idEstate").value
    var price = document.getElementById("price").value
$.get("/createSalea?idEstate=" + id + "&price=" + price, function(data){
  alert(data)
  location.replace("/mainpage")
})
  }
  function gotosale(){
    location.replace("/gotosale")
  }
  function gotomainpage(){
    location.replace("/mainpage")
  }
  function gotoadminestate(){
    location.replace("/showEstateadmin")
  }
  function gotogetsale(){
    location.replace("/gotosale")
  }
  function gotoadminsale(){
    location.replace("/gotosaleadmin")
  }
  function gotocreatesale(){
    location.replace("/createsale")
  }
  function getsale(){
    var id = document.getElementById("saleID").value
    $.get("/getsale?saleID=" + id, function(data){
      $("#selectedItem").text("Номер квартиры: " +  +data["0"] + " | " + "Адрес владельца: " + data["1"] + " | " + "Стоимость: " + data["2"] + " | " + "Адрес покупателя: " + data["3"] + " | " + "Статус продажи: " + data["4"])
    })
  }
  function gotobuy(){
    location.replace("/buy")
  }
  function buy(){
    var id = document.getElementById("buyID").value
    var price = document.getElementById("priceValue").value
    $.get("buye?buyID=" + id + "&priceValue=" + price, function(data){
      alert(data)
      location.replace("/mainpage")
    })
  }
  function confirmSale(){
    var sID = document.getElementById("salesID").value
    var uID = document.getElementById("userID").value
    $.get("/confirmbuy?salesID=" +sID +"&userID=" + uID,function(data){
      alert(data)
      location.replace("/mainpage")
    })
  }
  function gotoconfirmpage(){
    location.replace("/gotoconfirm")
  }