import chai from "chai";
import countBy from "../src/countBy.js";
const expect = chai.expect;

describe("countBy.js", () => {
  describe("positive tests", () => {
    it("should count elements based on the result of the iteratee", () => {
      const users = [
        { user: "barney", active: true },
        { user: "betty", active: true },
        { user: "fred", active: false },
      ];

      const result = countBy(users, (value) => value.active);

      expect(result).to.deep.equal({ true: 2, false: 1 });
    });

    it("should count elements based on a custom iteratee", () => {
      const fruits = ["apple", "banana", "orange", "grape"];

      const result = countBy(fruits, (value) => value.length);

      expect(result).to.deep.equal({ 5: 2, 6: 1, 7: 1 });
    });
  });

  describe("negative tests", () => {
    it("should handle an empty collection", () => {
      const result = countBy([], (value) => value);
      expect(result).to.deep.equal({});
    });

    it("should handle string as an array", () => {
      const result = countBy("abc", (value) => value.length);
      expect(result).to.deep.equal({ 1: 3 });
    });

    it("should throw a TypeError param collection", () => {
      expect(function () {
        countBy(12345, (value) => value.length);
      }).to.throw(TypeError);
    });

    it("should throw a TypeError param function", () => {
      expect(function () {
        countBy("abcde", 5);
      }).to.throw(TypeError);
    });
  });
});
