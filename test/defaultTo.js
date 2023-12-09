import chai from "chai";
import defaultTo from "../src/defaultTo.js";
const expect = chai.expect;

describe("defaultTo.js", () => {
  describe("positive tests", () => {
    it("should return the value if it is not NaN, null, or undefined", () => {
      const result = defaultTo(1, 10);
      expect(result).to.equal(1);
    });

    it("should return the default value if the value is undefined", () => {
      const result = defaultTo(undefined, 10);
      expect(result).to.equal(10);
    });

    it("should return the default value if the value is null", () => {
      const result = defaultTo(null, 10);
      expect(result).to.equal(10);
    });

    it("should return the default value if the value is NaN", () => {
      const result = defaultTo(NaN, 10);
      expect(result).to.equal(10);
    });

    it("should handle 0 as a valid value and not use the default value", () => {
      const result = defaultTo(0, 10);
      expect(result).to.equal(0);
    });

    it("should handle false as a valid value and not use the default value", () => {
      const result = defaultTo(false, 10);
      expect(result).to.equal(false);
    });
  });

  describe("negative tests", () => {
    it("should handle empty string as a valid value and not use the default value", () => {
      const result = defaultTo("", 10);
      expect(result).to.equal("");
    });

    it("should handle empty array as a valid value and not use the default value", () => {
      const result = defaultTo([], 10);
      expect(result).to.deep.equal([]);
    });

    it("should handle a function as a valid value and not use the default value", () => {
      const result = defaultTo(() => {}, 10);
      expect(result.toString()).to.equal((() => {}).toString()); // Check string representation
    });
  });
});
