import chai from "chai";
import drop from "../src/drop.js";
const expect = chai.expect;

describe("drop.js", () => {
  describe("positive tests", () => {
    it("should drop the one element from the beginning of the array when number not specified", () => {
      const result = drop([1, 2, 3]);
      expect(result).to.deep.equal([2, 3]);
    });

    it("should drop the specified number of elements from the beginning of the array", () => {
      const result = drop([1, 2, 3], 2);
      expect(result).to.deep.equal([3]);
    });

    it("should handle dropping more elements than the array length", () => {
      const result = drop([1, 2, 3], 5);
      expect(result).to.deep.equal([]);
    });

    it("should handle dropping zero elements", () => {
      const result = drop([1, 2, 3], 0);
      expect(result).to.deep.equal([1, 2, 3]);
    });

    it("should handle dropping all elements", () => {
      const result = drop([1, 2, 3], 3);
      expect(result).to.deep.equal([]);
    });
  });

  describe("negative tests", () => {
    it("should not drop elements when number is negative", () => {
      const result = drop([1, 2, 3], -2);
      expect(result).to.deep.equal([1, 2, 3]);
    });

    it("should handle an empty array", () => {
      const result = drop([], 2);
      expect(result).to.deep.equal([]);
    });

    it("should handle string as an array", () => {
      const result = drop("abc", 2);
      expect(result).to.deep.equal(["c"]);
    });

    it.skip("should throw a TypeError param array", () => {
      expect(function () {
        drop(156526, 2);
      }).to.throw(TypeError);
    });

    it.skip("should throw a TypeError param n", () => {
      expect(function () {
        drop([1, 2, 3], "1");
      }).to.throw(TypeError);
    });
  });
});
