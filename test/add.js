import chai from "chai";
import add from "../src/add.js";
const expect = chai.expect;

describe("add.js", () => {
  describe("positive tests", () => {
    it("should add two numbers correctly", () => {
      const result = add(6, 4);
      expect(result).to.equal(10);
    });

    it("should handle negative numbers", () => {
      const result = add(-6, 4);
      expect(result).to.equal(-2);
    });

    it("should handle zero values", () => {
      const result = add(0, 0);
      expect(result).to.equal(0);
    });

    it("should handle floating values", () => {
      const result = add(1.2, 5.6);
      expect(result).to.equal(6.8);
    });

    it("should handle negative floating values", () => {
      const result = add(-1.2, -5.6);
      expect(result).to.equal(-6.8);
    });
  });

  describe("negative tests", () => {
    it("should throw a TypeError str + number", () => {
      expect(function () {
        add("word", 5);
      }).to.throw(TypeError);
    });

    it("should throw a TypeError str + str", () => {
      expect(function () {
        add("word", "8");
      }).to.throw(TypeError);
    });
  });
});
