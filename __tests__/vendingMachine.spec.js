const vendingMachine = require("../lib/vendingMachine");
const inventory = require("../__mock__/mockInventory");
const change = require("../__mock__/mockChange");
const myMachine = new vendingMachine({ inventory, change });

describe("vendingMachine", () => {
  describe("restock", () => {
    test("invalid item is passed to the function", () => {
      const result = () => {
        myMachine.restockItem({ item: "a33", quantity: 1000 });
      };
      expect(result).toThrowError();
    });
    //initial a1 quantity is 5
    test("valid item is passed to the function", () => {
      const result = myMachine.restockItem({ item: "a1", quantity: 63 });
      expect(result).toEqual(68);
    });
    //quantity should persist with the current instance of the vending machine
    test("add more items to a previously restocked item", () => {
      const result = myMachine.restockItem({ item: "a1", quantity: 2 });
      expect(result).toEqual(70);
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
