const vendingMachine = require("../lib/vendingMachine");
const inventory = require("../__mock__/mockInventory");
const change = require("../__mock__/mockChange");
const myMachine = new vendingMachine({ inventory, change });

describe("vendingMachine", () => {
  describe("restock", () => {
    test("invalid item is passed to the function", () => {
      const result = myMachine.restockItems({ item: a33, quantity: 1000 });
      expect(result).toThrowError();
    });
    test("valid item is passed to the function", () => {
      const result = myMachine.restockItems({ item: a1, quantity: 63 });
      expect(result).toEqual(inventory.a1.quantity + 63);
    });
  });
  describe("change", () => {});
  describe("sale", () => {});
  describe("inventory", () => {
    test("return inventory", () => {
      const result = myMachine.returnInventory();
      expect(result).toEqual(inventory);
    });
  });
});
