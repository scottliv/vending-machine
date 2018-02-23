module.exports = class vendingMachine {
  constructor({ inventory, change }) {
    // Use JSON parse and stringify to deeply copy the passed in object so each vending machine instance has its own internal state
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
    return Object.keys(restockChange).map(coin => {
      if (this.change[coin] === undefined) {
        throw new Error();
      }
      return (this.change[coin].quantity += Number(
        restockChange[coin].quantity
      ));
    });
  }
  giveChange() {}
  sellItem() {}
};
