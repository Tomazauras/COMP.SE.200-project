import chai from "chai";
import words from "../src/words.js";
const expect = chai.expect;

describe("words function", () => {
  describe("positive tests", () => {
    it("should split a string into an array of words using unicodeWords", () => {
      const result = words("你好，世界");
      expect(result).to.deep.equal(["你好，世界"]);
    });

    it("should split a string into an array of words using asciiWords", () => {
      const result = words("fred, barney, & pebbles");
      expect(result).to.deep.equal(["fred", "barney", "pebbles"]);
    });

    it("should split a string into an array of words using a custom pattern", () => {
      const result = words("fred, barney, & pebbles", /[^, ]+/g);
      expect(result).to.deep.equal(["fred", "barney", "&", "pebbles"]);
    });

    it("should handle a string with Unicode characters using a custom pattern", () => {
      const result = words("你好，世界", /[\p{Script=Hani}]+/gu);
      expect(result).to.deep.equal(["你好", "世界"]);
    });
  });

  describe("negative tests", () => {
    it("should handle an empty string", () => {
      const result = words("");
      expect(result).to.deep.equal([]);
    });

    it("should handle an invalid pattern", () => {
      const result = words("This is a sentence", "pattern");
      expect(result).to.deep.equal([]);
    });

    it("should handle a string with no spaces or punctuation using the default pattern", () => {
      const result = words("word1word2word3");
      expect(result).to.deep.equal(["word", "1", "word", "2", "word", "3"]);
    });

    it("should handle a string with special characters using the default pattern by omiting special chars", () => {
      const result = words("!@#123$%^&*()word4567");
      expect(result).to.deep.equal(["123", "word", "4567"]);
    });

    it("should throw a TypeError param string", () => {
      expect(function () {
        words(123456879);
      }).to.throw(TypeError);
    });
  });
});
