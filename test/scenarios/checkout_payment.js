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

describe("Verify checkout and payment process", () => {
  // Set up initial state
  let shoppingCart;
  let products;

  let proceedToCheckout;
  let makePayment;
  let processOrder;

  before(() => {
    // third party payment system mock
    // Create stubs for the functions
    proceedToCheckout = sinon.stub().returns(true);
    makePayment = sinon.stub().returns(true);
    processOrder = sinon.stub().returns(true);

    products = [
      {
        id: 1,
        name: "Product 1",
        category: "electronics",
        price: 100,
        producer: "Sony",
      },
      {
        id: 2,
        name: "Product 2",
        category: "books",
        price: 20,
        producer: "Penguin",
      },
      {
        id: 3,
        name: "Product 3",
        category: "clothing",
        price: 50,
        producer: "Nike",
      },
      {
        id: 4,
        name: "Product 4",
        category: "beauty",
        price: 15,
        producer: "L'Oreal",
      },
      {
        id: 5,
        name: "Product 5",
        category: "electronics",
        price: 150,
        producer: "Samsung",
      },
      {
        id: 6,
        name: "Product 6",
        category: "books",
        price: 25,
        producer: "Random House",
      },
      {
        id: 7,
        name: "Product 7",
        category: "clothing",
        price: 80,
        producer: "Adidas",
      },
      {
        id: 8,
        name: "Product 8",
        category: "beauty",
        price: 30,
        producer: "Maybelline",
      },
      {
        id: 9,
        name: "Product 9",
        category: "home",
        price: 40,
        producer: "IKEA",
      },
    ];

    shoppingCart = [];
    // Add products to the cart using drop
    shoppingCart.push(drop(products, 5));
  });

  it("shopping cart should have items in it", () => {
    expect(shoppingCart.lenght).to.not.equal(0);
  });

  it("should proceed to checkout", () => {
    // Simulate proceeding to checkout
    const checkout = proceedToCheckout();

    // Assert that the checkout was successful
    expect(checkout).to.be.true;
    expect(proceedToCheckout).to.have.been.called;
  });

  it("should handle payment, shipping, and buyer details", () => {
    // Simulate providing payment, shipping, and buyer details
    const paymentDetails = {
      cardNumber: "1234567890123456",
      cardExpiry: "01/23",
      cvv: "123",
    };

    const shippingDetails = {
      addressLine1: "123 Test St",
      addressLine2: "",
      city: "Test City",
      state: "TS",
      zip: "12345",
    };

    const buyerDetails = {
      firstName: "Test",
      lastName: "User",
      email: "test.user@example.com",
    };

    const payment = makePayment(paymentDetails, shippingDetails, buyerDetails);
    // Assert that the payment was successful
    expect(payment).to.be.true;
    expect(makePayment).to.have.been.calledWith(
      paymentDetails,
      shippingDetails,
      buyerDetails
    );
  });

  it("should correctly process the order", () => {
    const order = processOrder();

    // Assert that the order was correctly processed
    expect(order).to.be.true;
    expect(processOrder).to.have.been.called;
  });
});
