"use strict";

const {
  db,
  models: { User, Order },
} = require("../server/db");
const Dog = require("../server/db/models/Dog");
const faker = require("faker");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  // Create dogs
  const dogs = [];
  for (let i = 0; i < 100; i++) {
    // Generate dog data
    const name = faker.name.firstName();
    const sponsorFee = faker.datatype.number({ min: 10, max: 100 });
    const gender = faker.random.arrayElement(["Male", "Female"]);
    const imageUrl = `https://placedog.net/640/480?random=${i + 1}`; // Generate random image URL

    const dog = await Dog.create({
      name,
      sponsorFee,
      gender,
      imageUrl: imageUrl, // Add imageURL property
    });

    dogs.push(dog);
  }

  // Create users
  const users = [];
  for (let i = 0; i < 20; i++) {
    // Generate user data
    const username = faker.internet.userName();
    const password = "123";
    const lastName = faker.name.lastName();
    const firstName = faker.name.firstName();
    const address = faker.address.streetAddress();
    const email = faker.internet.email();

    const user = await User.create({
      username,
      password,
      lastName,
      firstName,
      address,
      email,
    });

    users.push(user);
  }
  // Create orders
  const orders = [];
  let newOrder; // Declare newOrder outside the loop
  for (let i = 0; i < 10; i++) {
    newOrder = await Order.create({
      isCart: true,
      transactionID: "xyz123",
      cartItems: [
        { item: "item1", quantity: 2 },
        { item: "item2", quantity: 1 },
      ],
      checkout: false,
    });
    orders.push(newOrder);
  }

  // Update an order (example)
  if (orders.length > 0) {
    const orderId = orders[0].id; // Use the ID of the first order
    const orderToUpdate = await Order.findByPk(orderId);
    if (orderToUpdate) {
      orderToUpdate.checkout = true;
      await orderToUpdate.save();
    }
  }

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${dogs.length} dogs`);
  console.log(`seeded ${orders.length} orders`);
  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      murphy: users[1],
      admin: users[2],
    },
  };
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}
if (module === require.main) {
  runSeed();
}
module.exports = seed;
