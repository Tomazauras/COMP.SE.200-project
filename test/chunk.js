import chai from "chai";
import chunk from "../src/chunk.js";
const expect = chai.expect;

describe("chunk.js", () => {
  describe("positive tests", () => {
    it("should split array into chunks of specified size", () => {
      const result = chunk(["a", "b", "c", "d", "e"], 2);
      expect(result).to.deep.equal([["a", "b"], ["c", "d"], ["e"]]);
    });

    it("should handle a size larger than array length", () => {
      const result = chunk(["a", "b", "c", "d"], 5);
      expect(result).to.deep.equal([["a", "b", "c", "d"]]);
    });

    it("should handle a size equal to array length", () => {
      const result = chunk(["a", "b", "c", "d"], 4);
      expect(result).to.deep.equal([["a", "b", "c", "d"]]);
    });

    it("should handle a size of 1", () => {
      const result = chunk(["a", "b", "c", "d"], 1);
      expect(result).to.deep.equal([["a"], ["b"], ["c"], ["d"]]);
    });
  });

  describe("negative tests", () => {
    it("should handle an empty array", () => {
      const result = chunk([], 2);
      expect(result).to.deep.equal([]);
    });

    it("should handle a size of 0", () => {
      const result = chunk(["a", "b", "c", "d"], 0);
      expect(result).to.deep.equal([]);
    });

    it("should handle negative size by treating it as 0", () => {
      const result = chunk(["a", "b", "c", "d"], -2);
      expect(result).to.deep.equal([]);
    });

    it("should handle string as an array", () => {
      const result = chunk("abc", 2);
      expect(result).to.deep.equal([["a", "b"], ["c"]]);
    });

    it.skip("should throw a TypeError param size", () => {
      expect(function () {
        chunk(["a", "b", "c", "d"], "two");
      }).to.throw(TypeError);
    });

    it.skip("should throw a TypeError param collection", () => {
      expect(function () {
        chunk(12345, 2);
      }).to.throw(TypeError);
    });
  });
});
