const Estate = artifacts.require("Estate");

contract("Estate", function(accounts) {
    let estateInstance;

    before(async () => {
        estateInstance = await Estate.deployed();
    });

    it("should create an estate", async () => { // Проверяет, что контракт может создать недвижимость, и генерирует ошибку, если вызывающий не является администратором.
        try {
            await estateInstance.create_estate(accounts[0], "info", 100, { from: accounts[0] });
        } catch (error) {
            assert.include(error.message, "You are not admin", "Error message should include 'You are not admin'");
        }
    });

    it("should buy an estate", async () => { // Проверяет возможность покупки недвижимости и генерирует ошибку, если вызывающий не является администратором.
        try {
            await estateInstance.buy(0, accounts[1], 100, { from: accounts[1], value: 100 });
        } catch (error) {
            assert.include(error.message, "You are not admin", "Error message should include 'You are not admin'");
        }
    });

    it("should confirm a sale", async () => { // Проверяет подтверждение продажи и генерирует ошибку, если продажа не активна.
        try {
            await estateInstance.confirm_sale(0, 0, accounts[0], { from: accounts[0] });
        } catch (error) {
            assert.include(error.message, "Sale must be active", "Error message should include 'Sale must be active'");
        }
    });  

    it("should create an estate with correct details", async () => { // Проверяет создание недвижимости с правильными данными
        const owner = accounts[1];
        const info = "House in the city";
        const square = 200;
        const adminAddress = accounts[0];
        const adminPassword = "password123";

        await estateInstance.set_admin(adminAddress, adminPassword);

        const resultAddress = await estateInstance.get_admin();

        const resultPassword = await estateInstance.get_adminPassword();

        await estateInstance.create_estate(owner, info, square);

        const resultOwner = await estateInstance.show_name(0);
        assert.equal(resultOwner, owner, "Estate owner is not set correctly");

        const resultInfo = await estateInstance.show_info(0);
        assert.equal(resultInfo, info, "Estate info is not set correctly");

        const resultSquare = await estateInstance.show_square(0);
        assert.equal(resultSquare, square, "Estate square is not set correctly");

        const resultStatus = await estateInstance.show_status(0);
        assert.equal(resultStatus, false, "Estate sale status is not set correctly");
    });

    it("should return correct balance for account 0", async () => { // Проверяет, что баланс аккаунтов при развертывании контракта соответствует ожидаемому значению.
        const account0 = accounts[0];
        const finalAccountBalanceWei = await web3.eth.getBalance(account0);
        const finalAccountBalanceEther = web3.utils.fromWei(finalAccountBalanceWei, 'ether');
        const finalAccountBalance = parseFloat(finalAccountBalanceEther);
        const expectedAccountBalance = 100;

        assert.isAtLeast(finalAccountBalance, expectedAccountBalance - 1, "Account 0 balance is less than expected");
        assert.isAtMost(finalAccountBalance, expectedAccountBalance + 1, "Account 0 balance is more than expected");
    });
});
