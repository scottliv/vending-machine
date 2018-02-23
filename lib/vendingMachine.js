module.exports = class vendingMachine {
  constructor({ inventory, change }) {
    (this.inventory = inventory), (this.change = change);
  }
  returnInventory() {
    return this.inventory;
  }
  restockItems({ item, quantity }) {}
};
