import chai from "chai";
import capitalize from "../src/capitalize.js";
const expect = chai.expect;

describe("capitalize.js", () => {
  describe("positive tests", () => {
    it("should capitalize the first character of a string", () => {
      const result = capitalize("fred");
      expect(result).to.equal("Fred");
    });

    it("should handle already capitalized string", () => {
      const result = capitalize("John");
      expect(result).to.equal("John");
    });

    it("should handle string with leading spaces", () => {
      const result = capitalize("  hello");
      expect(result).to.equal("  hello");
    });

    it("should handle string with all uppercase characters", () => {
      const result = capitalize("ALLCAPS");
      expect(result).to.equal("Allcaps");
    });
  });

  describe("negative tests", () => {
    it("should handle string consisting of numbers", () => {
      const result = capitalize("10");
      expect(result).to.equal("10");
    });

    it.skip("should throw a TypeError for param string", () => {
      expect(function () {
        capitalize(5);
      }).to.throw(TypeError);
    });

    it("should handle an empty string", () => {
      const result = capitalize("");
      expect(result).to.equal("");
    });
  });
});
