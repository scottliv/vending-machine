module.exports = class vendingMachine {
  constructor({ inventory, change }) {
    // Use JSON parse and stringify to deeply copy the passed in object
    // So each vending machine instance has its own internal state
    this.inventory = JSON.parse(JSON.stringify(inventory));
    this.change = JSON.parse(JSON.stringify(change));
  }
  returnInventory() {
    return this.inventory;
  }
  restockItem({ item, quantity }) {
    if (this.inventory[item] === undefined || typeof quantity !== "number") {
      throw new Error();
    }
    return (this.inventory[item].quantity += quantity);
  }
  addChange({ restockChange }) {
    Object.keys(restockChange).forEach(coin => {
      if (this.change[coin] === undefined) {
        throw new Error();
      }
      this.change[coin].quantity += Number(restockChange[coin].quantity);
    });
    return this.change;
  }
  giveChange(costOfItems, amountOfMoneyGiven) {
    if (
      typeof costOfItems !== "number" ||
      typeof amountOfMoneyGiven !== "number" ||
      amountOfMoneyGiven < costOfItems
    ) {
      throw new Error();
    }
    // Go through all possible coins and test if the whole coin can be returned then decrement the remainder before checking the next coin
    // In addition check to see if the amount of coins needed is available in the vending machine
    let remainder = (amountOfMoneyGiven - costOfItems) * 100;
    let twoonies = Math.floor(remainder / 200);
    if (twoonies > this.change.twoonies.quantity) {
      twoonies = this.change.twoonies.quantity;
    }
    remainder -= twoonies * 200;
    this.change.twoonies.quantity -= twoonies;
    let loonies = Math.floor(remainder / 100);
    if (loonies > this.change.loonies.quantity) {
      loonies = this.change.loonies.quantity;
    }
    remainder -= loonies * 100;
    this.change.loonies.quantity -= loonies;
    let quarters = Math.floor(remainder / 25);
    if (quarters > this.change.quarters.quantity) {
      quarters = this.change.quarters.quantity;
    }
    remainder -= quarters * 25;
    this.change.quarters.quantity -= quarters;
    let dimes = Math.floor(remainder / 10);
    if (dimes > this.change.dimes.quantity) {
      dimes = this.change.dimes.quantity;
    }
    remainder -= dimes * 10;
    this.change.dimes.quantity -= dimes;
    let nickels = Math.floor(remainder / 5);
    if (nickels > this.change.nickels.quantity) {
      nickels = this.change.twoonies.quantity;
    }
    remainder -= nickels * 5;
    this.change.nickels.quantity -= nickels;

    const returnedChange = {
      twoons: twoonies,
      loons: loonies,
      quarts: quarters,
      dimesies: dimes,
      nicks: nickels
    };
    console.log(returnedChange);
    return Object.keys(returnedChange).reduce((acc, coin) => {
      if (returnedChange[coin] >= 1) {
        acc.push(`${coin}: ${returnedChange[coin]}`);
      }
      return acc;
    }, []);
  }
  sellItem({ item, coins }) {
    if (this.inventory[item] === undefined) {
      throw new Error();
    }
    if (typeof coins !== "object") {
      throw new Error();
    }
    Object.keys(coins).forEach(coin => {
      if (this.change[coin] === undefined) {
        throw new Error();
      }
    });
  }
};
