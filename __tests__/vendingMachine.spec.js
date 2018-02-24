const vendingMachine = require("../lib/vendingMachine");
const inventory = require("../__mock__/mockInventory");
const change = require("../__mock__/mockChange");
const myMachine = new vendingMachine({ inventory, change });

describe("vendingMachine", () => {
  describe("inventory", () => {
    test("return inventory", () => {
      const result = myMachine.returnInventory();
      expect(result).toEqual(inventory);
    });
  });
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
  describe("restock change", () => {
    const expectedUpdatedChange = JSON.parse(JSON.stringify(change));
    test("invalid input given to restocking function", () => {
      const result = () => {
        myMachine.addChange("some phoney input");
      };
      expect(result).toThrowError();
    });
    test("one valid coin type is passed", () => {
      const result = myMachine.addChange({
        restockChange: { quarters: { quantity: 10 } }
      });
      expect(result).toEqual({
        ...expectedUpdatedChange,
        quarters: {
          value: 0.25,
          quantity: expectedUpdatedChange.quarters.quantity + 10
        }
      });
    });
    test("multiple coins passed for restocking", () => {
      const result = myMachine.addChange({
        restockChange: {
          loonies: { quantity: 11 },
          dimes: { quantity: 6 },
          nickels: { quantity: 3 }
        }
      });

      expect(result).toEqual({
        ...expectedUpdatedChange,
        loonies: {
          value: 1,
          quantity: expectedUpdatedChange.loonies.quantity + 11
        },
        dimes: {
          value: 0.1,
          quantity: expectedUpdatedChange.dimes.quantity + 6
        },
        nickels: {
          value: 0.05,
          quantity: expectedUpdatedChange.nickels.quantity + 3
        },
        // quarters included here as the myMachine quarter quantities persists from the last test
        quarters: {
          value: 0.25,
          quantity: expectedUpdatedChange.quarters.quantity + 10
        }
      });
    });
  });
  describe("Return Change", () => {
    test("ammount give is less than the cost of the item", () => {
      const result = () => {
        myMachine.giveChange(3, 2);
      };
      expect(result).toThrowError;
    });
    test("Function not called with numbers", () => {
      const result = () => {
        myMachine.giveChange("Hello", 2);
      };
      expect(result).toThrowError;
    });
    test("a resonable purchase and appropriate change given", () => {
      const result = myMachine.giveChange(3, 3.5);
      expect(result).toEqual(["quarts: 2"]);
    });
    test("an unresonable purchase and appropriate change given but exausting the twoonie supply", () => {
      const result = myMachine.giveChange(3.35, 250);
      expect(result).toEqual([
        "twoons: 56",
        "loons: 134",
        "quarts: 2",
        "dimesies: 1",
        "nicks: 1"
      ]);
    });
  });
  describe("sale", () => {
    const saleMachine = new vendingMachine({ inventory, change });
    test("invalid item code passed", () => {
      const result = () => {
        saleMachine.sellItem({
          item: "B52",
          coins: { quarters: { quantity: 56 } }
        });
      };
      expect(result).toThrowError();
    });
    test("invalid coins passed", () => {
      const result = () => {
        saleMachine.sellItem({
          item: "a1",
          coins: { goobers: { quantity: 42 } }
        });
      };
      expect(result).toThrowError();
    });
    test("purchase item", () => {
      const result = saleMachine.sellItem({
        item: "a1",
        coins: {
          loonies: 1,
          quarters: 4
        }
      });
      expect(result).toEqual({ item: "cola", change: ["quarts: 1"] });
    });
  });
});
