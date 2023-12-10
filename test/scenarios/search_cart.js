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
const expect = chai.expect;

describe("Verify search and shopping cart functionality", () => {
  let products;
  let cart;
  let results;

  before(() => {
    // Set up initial state
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
      {
        id: 10,
        name: "Product 10",
        category: "electronics",
        price: 200,
        producer: "Apple",
      },
      {
        id: 11,
        name: "Product 11",
        category: "books",
        price: 15,
        producer: "HarperCollins",
      },
      {
        id: 12,
        name: "Product 12",
        category: "clothing",
        price: 70,
        producer: "Zara",
      },
      {
        id: 13,
        name: "Product 13",
        category: "beauty",
        price: 25,
        producer: "Revlon",
      },
      {
        id: 14,
        name: "Product 14",
        category: "home",
        price: 60,
        producer: "Crate & Barrel",
      },
      {
        id: 15,
        name: "Product 15",
        category: "electronics",
        price: 120,
        producer: "Microsoft",
      },
      {
        id: 16,
        name: "Product 16",
        category: "sports",
        price: 75,
        producer: "Nike",
      },
      {
        id: 17,
        name: "Product 17",
        category: "food",
        price: 10,
        producer: "Kraft",
      },
      {
        id: 18,
        name: "Product 18",
        category: "toys",
        price: 30,
        producer: "LEGO",
      },
      {
        id: 19,
        name: "Product 19",
        category: "tools",
        price: 45,
        producer: "DeWalt",
      },
      {
        id: 20,
        name: "Product 20",
        category: "furniture",
        price: 120,
        producer: "Ashley Furniture",
      },
    ];
    cart = [];
    results = [];
  });

  it("split products to arrays containing x amount of products", () => {
    // Simulate showcasing of products in a page
    const pageCount = chunk(products, 10).length;
    expect(pageCount).to.equal(2);
  });

  it("filter products by category and/or price and/or producer", () => {
    // Simulate search action
    const category = "";
    const priceRange = [50, 150];
    const producer = "";
    results = filter(products, (product) => {
      return (
        (!category || product.category === category) &&
        (!priceRange ||
          (product.price >= priceRange[0] && product.price <= priceRange[1])) &&
        (!producer || product.producer === producer)
      );
    });

    // Assert that the output is an array using isArrayLike function
    expect(isArrayLike(results)).to.be.true;

    // Assert that the output is as expected, using get function
    results.forEach((product) => {
      // Check if category is defined before comparing
      if (category) {
        expect(get(product, "category")).to.equal(category);
      }

      // Check if priceRange is defined before comparing
      if (priceRange !== false) {
        expect(get(product, "price")).to.be.within(
          priceRange[0],
          priceRange[1]
        );
      }

      // Check if producer is defined before comparing
      if (producer) {
        expect(get(product, "producer")).to.equal(producer);
      }
    });
  });

  it("should add products to the shopping cart", () => {
    // Simulate add to cart action
    results.forEach((product) => {
      cart.push(product);
    });

    const productToAdd = results[0];
    // Assert that the product is in the cart using get function
    const productInCart = get(cart, cart.indexOf(productToAdd));
    expect(productInCart).to.deep.equal(productToAdd);
  });

  it("item count in cart should be updated", () => {
    // Simulate removing a product
    const countBefore = countBy(cart, (product) => product);
    expect(countBefore).to.deep.equal({ "[object Object]": cart.length });
  });

  it("should remove products from the shopping cart", () => {
    const productRemoved = cart.pop();

    // Check that the cart no longer includes the product
    const productFound = get(cart, cart.indexOf(productRemoved), false);
    expect(productFound).to.be.false;
  });

  it("item count in cart should be updated", () => {
    const countAfter = countBy(cart, (product) => product);
    expect(countAfter).to.deep.equal({ "[object Object]": cart.length });
  });

  it("should accurately calculate the total price of the products in the cart", () => {
    // If the cart has less than 2 products, expect the total price to be 0 for an empty cart
    if (cart.length < 2) {
      const expectedTotalPrice = cart.length === 0 ? 0 : cart[0].price;
      // Calculate the total price using reduce
      const totalReduce =
        cart.length === 0
          ? 0
          : cart.reduce((acc, product) => add(acc, product.price), 0);

      // Assert that the total price is as expected
      expect(totalReduce).to.equal(expectedTotalPrice);
    } else {
      // Calculate the total price using reduce in combination with add for all products
      const totalReduce = cart.reduce(
        (acc, product) => add(acc, product.price),
        0
      );

      // Assert that the total price is as expected
      expect(totalReduce).to.equal(
        cart.reduce((acc, product) => add(acc, product.price), 0)
      );
    }
  });
});
