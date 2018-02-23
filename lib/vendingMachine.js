module.exports = class vendingMachine {
  constructor({ inventory, change }) {
    (this.inventory = inventory), (this.change = change);
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
};
