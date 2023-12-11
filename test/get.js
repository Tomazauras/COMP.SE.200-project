import chai from "chai";
import get from "../src/get.js";

const expect = chai.expect;

describe("get.js", () => {
  describe("positive tests", () => {
    it("should get the value at the specified path in an object", () => {
      const userObject = { user: { details: { age: 25 } } };
      const result = get(userObject, "user.details.age");
      expect(result).to.equal(25);
    });

    it("should get the value at the specified path using an array as the path argument", () => {
      const person = { details: { name: { first: "John", last: "Doe" } } };
      const result = get(person, ["details", "name", "first"]);
      expect(result).to.equal("John");
    });

    it("should return the default value for undefined resolved values", () => {
      const car = { brand: { model: { year: 2022 } } };
      const result = get(car, "brand.model.color", "default");
      expect(result).to.equal("default");
    });

    it("should return object", () => {
      const book = { title: "12 rules of life", pages: 325, chapters: 12 };
      const result = get(book, "book", "default");
      expect(result).to.equal("default");
    });

    it("should return element of array", () => {
      const books = ["book1", "book2"];
      const result = get(books, books.indexOf("book1"));
      expect(result).to.equal("book1");
    });
  });

  describe("negative tests", () => {
    it("should return undefined for undefined resolved values if no default value is provided", () => {
      const product = { category: { type: "Electronics" } };
      const result = get(product, "category.price");
      expect(result).to.equal(undefined);
    });

    it("should handle undefined input object", () => {
      const result = get(undefined, "user.age", "default");
      expect(result).to.equal("default");
    });

    it("should handle null input object", () => {
      const result = get(null, "user.age", "default");
      expect(result).to.equal("default");
    });

    it("should handle empty path", () => {
      const person = { details: { name: "Alice", age: 30 } };
      const result = get(person, "", "default");
      expect(result).to.deep.equal("default");
    });

    it("should throw a TypeError param object", () => {
      expect(function () {
        get("string", "string.property1");
      }).to.throw(TypeError);
    });

    it("should throw a TypeError param path", () => {
      expect(function () {
        const person = { details: { name: "Alice", age: 30 } };
        get(person, 12345);
      }).to.throw(TypeError);
    });
  });
});
