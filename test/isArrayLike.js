import chai from "chai";
import isArrayLike from "../src/isArrayLike.js";
const expect = chai.expect;

describe("isArrayLike.js", () => {
  describe("positive tests", () => {
    it("should return true for arrays", () => {
      const result = isArrayLike([1, 2, 3]);
      expect(result).to.equal(true);
    });

    it("should return true for strings", () => {
      const result = isArrayLike("abc");
      expect(result).to.equal(true);
    });

    it("should return false for objects without a length property", () => {
      const result = isArrayLike({ prop: "value" });
      expect(result).to.equal(false);
    });

    it("should return true for objects with a length property", () => {
      const person = { name: "Alice", length: 5 };
      const result = isArrayLike(person);
      expect(result).to.equal(true);
    });

    it("should return false for numbers", () => {
      const result = isArrayLike(123);
      expect(result).to.equal(false);
    });
  });

  describe("negative tests", () => {
    it("should return false for null", () => {
      const result = isArrayLike(null);
      expect(result).to.equal(false);
    });

    it("should return false for undefined", () => {
      const result = isArrayLike(undefined);
      expect(result).to.equal(false);
    });

    it("should return false for functions", () => {
      const result = isArrayLike(() => {});
      expect(result).to.equal(false);
    });

    it("should return false for functions with a length property", () => {
      const result = isArrayLike(() => {}, { length: 1 });
      expect(result).to.equal(false);
    });
  });
});
