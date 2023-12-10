import add from "../../src/add.js";
import capitalize from "../../src/capitalize.js";
import chunk from "../../src/chunk.js";
import countBy from "../../src/countBy.js";
import defaultTo from "../../src/defaultTo.js";
import drop from "../../src/drop.js";
import filter from "../../src/filter.js";
import get from "../../src/get.js";
import isArrayLike from "../../src/isArrayLike.js";
import words from "../../src/words.js";

import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);
const expect = chai.expect;

describe("Verify adding and removing product functionality", () => {
  let login;
  let addProduct;
  let removeProduct;
  let formatProductData;
  let product;

  before(() => {
    // Create stubs for the functions
    login = sinon.stub().returns(true);
    addProduct = sinon.stub().returns(true);
    removeProduct = sinon.stub().returns(true);

    // reformat product data using functions: defaultTo, capitalize, words
    formatProductData = function (Product) {
      let prod = Product;
      prod.category = defaultTo(prod.category, "other");
      prod.category = capitalize(prod.category);

      prod.producer = defaultTo(prod.producer, "unknown");
      prod.producer = words(prod.producer)
        .map((word) => capitalize(word))
        .join(" ");

      prod.description = defaultTo(prod.description, "Description not found");
      return prod;
    };

    product = {
      id: 1,
      name: "Test Product",
      category: null,
      description: null,
      producer: "Test producer",
      price: 100,
    };
  });

  it("should log in a verified producer account", () => {
    // Simulate logging in a verified producer account
    const credentials = {
      username: "testproducer",
      password: "testpassword",
    };
    const loginResult = login(credentials);

    // Assert that the login was successful
    expect(loginResult).to.be.true;
    expect(login).to.have.been.calledWith(credentials);
  });

  it("should reformat malformed/incorrect product data", () => {
    const prod = {
      id: 1,
      name: "Test Product",
      category: "Other",
      description: "Description not found",
      producer: "Test Producer",
      price: 100,
    };

    const reformedProd = formatProductData(product);

    expect(prod).to.deep.equal(reformedProd);
  });

  it("should add a product", () => {
    const addResult = addProduct(product);

    // Assert that the product was added successfully
    expect(addResult).to.be.true;
    expect(addProduct).to.have.been.calledWith(product);
  });

  it("should remove a product", () => {
    // Simulate removing a product
    const productId = 1;
    const removeResult = removeProduct(productId);

    // Assert that the product was removed successfully
    expect(removeResult).to.be.true;
    expect(removeProduct).to.have.been.calledWith(productId);
  });
});
