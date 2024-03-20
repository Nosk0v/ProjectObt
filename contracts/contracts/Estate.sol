//SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.19;

contract Estate {
    
    struct Estate {
        address owner;
        string info;
        uint square;
        bool sale_status;
    }
    
    mapping (uint => Estate) public estates;
    uint e_length = 0;

    struct Sale {
        uint estate_id;
        address owner;
        uint price;
        address payable customer;
        bool status;
    }
    
    mapping (uint => Sale) public sales;
    uint  s_length = 0;
    
    modifier isOwner(uint estate_id) {
        require(msg.sender == estates[estate_id].owner);
        require(estates[estate_id].sale_status == false);
        _;
    }
   
    address admin = 0x0000000000000000000000000000000000000000;
                    
    string adminPassword = "";

    function set_admin(address _admin, string memory password) public{
        admin = _admin;
        adminPassword = password;
    }

    function get_admin() public returns(address){
        return admin;
    }

    function get_adminPassword() public returns(string memory){
        return adminPassword;
    }
   function show_name(uint index) public view returns(address) {
    return estates[index].owner;
}

function show_info(uint index) public view returns(string memory) {
    return estates[index].info;
}

function show_square(uint index) public view returns(uint) {
    return estates[index].square;
}

function show_status(uint index) public view returns(bool) {
    return estates[index].sale_status;
}

    
    function create_estate(address owner, string memory info, uint square) public {
        require(msg.sender == admin, "You are not admin");
        estates[e_length] = Estate(owner, info, square, false);
        e_length = e_length + 1;
    }
    
    function create_sale(uint e_id, uint price, address owner) public isOwner(e_id) {
        sales[s_length] = Sale(e_id, owner, price, payable (0x0000000000000000000000000000000000000000), true);
        estates[e_id].sale_status = true;
        s_length = s_length + 1;
    }
    
    function buy(uint s_id, address payable owner, uint price) public payable {
    sales[s_id].customer = owner;
    sales[s_id].status = false;
    uint e_id = sales[s_id].estate_id;
    estates[e_id].sale_status = false;
    owner.transfer(price); // Отправляем эфир предыдущему владельцу
}


    
    function confirm_sale(uint s_id, uint u_id, address owner) public {
    require(sales[s_id].status == true, "Sale must be active");
    require(owner == sales[s_id].owner, "Only the owner can confirm the sale");

    uint e_id = sales[s_id].estate_id;
    address payable seller = payable(sales[s_id].owner);
    address payable buyer = sales[s_id].customer;

    require(address(this).balance >= sales[s_id].price, "Contract does not have enough balance");

    seller.transfer(sales[s_id].price); // Перевод эфира продавцу
    estates[e_id].owner = buyer; // Обновление владельца недвижимости

    sales[s_id].status = false; // Установка статуса продажи в false
    estates[e_id].sale_status = false; // Установка статуса объявления о продаже в false
}

    
    function get_sale(uint s_id) public view returns(uint, address, uint, address, bool) {
        return(sales[s_id].estate_id, sales[s_id].owner, sales[s_id].price, sales[s_id].customer, sales[s_id].status);
    }
    
    
}
