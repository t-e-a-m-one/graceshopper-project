'use strict';

const { db, models: { User, Order, Cart } } = require('../server/db');
const Dog = require('../server/db/models/Dog');
const faker = require('faker');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  // Create dogs
  const dogs = [];
  for (let i = 0; i < 100; i++) {
    // Generate dog data
    const name = faker.name.firstName();
    const sponsorFee = faker.datatype.number({ min: 10, max: 100 });
    const gender = faker.random.arrayElement(['Male', 'Female']);
    const imageURL = faker.image.imageUrl(); // Generate random image URL

    const dog = await Dog.create({
      name,
      sponsorFee,
      gender,
      imageURL, // Add imageURL property
    });

    dogs.push(dog);
  }

  // Create users
  const users = [];
  const generatedLastNames = []; // Array to store generated last names
  for (let i = 0; i < 20; i++) {
    // Generate user data
    const username = faker.internet.userName();
    const password = '123';
    let lastName = faker.name.lastName();

    // Check if the generated last name already exists
    while (generatedLastNames.includes(lastName)) {
      lastName = faker.name.lastName();
    }
    generatedLastNames.push(lastName);

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

  // Create cart items
  for (const user of users) {
    for (const dog of dogs) {
      const cartItem = await Cart.create({
        userId: user.id,
        dogId: dog.id,
        quantity: faker.datatype.number({ min: 1, max: 5 }),
      });
      // Save the cart item to the user's cartItems array
      user.cartItems.push(cartItem);
    }
    await user.save();
  }

  // Create orders
  const orders = [];
  let newOrder; // Declare newOrder outside the loop
  for (let i = 0; i < 10; i++) {
    newOrder = await Order.create({
      isCart: true,
      transactionID: 'xyz123',
      cartItems: [{ item: 'item1', quantity: 2 }, { item: 'item2', quantity: 1 }],
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
  console.log(`seeded ${users.length * dogs.length} cart items`); // Display the number of cart items
  console.log(`seeded ${orders.length} orders`);
  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
















// 'use strict'
// //I am working here
// const { db, models: { User, Order } } = require('../server/db')
// const Dog = require('../server/db/models/Dog')
// const Cart = require('./server/db/models/Cart')
// const faker = require('faker')

// /**
//  * seed - this function clears the database, updates tables to
//  *      match the models, and populates the database.
//  */

// async function seed() {
//   await db.sync({ force: true });
//   console.log('db synced!');


//   // Create dogs
//   const dogs = [];
//   for (let i = 0; i < 100; i++) {
//     // Generate dog data
//     const name = faker.name.firstName();
//     const sponsorFee = faker.datatype.number({ min: 10, max: 100 });
//     const gender = faker.random.arrayElement(['Male', 'Female']);
//     const imageURL = faker.image.imageUrl(); // Generate random image URL

//     const dog = await Dog.create({
//       name,
//       sponsorFee,
//       gender,
//       imageURL, // Add imageURL property
//     });

//     dogs.push(dog);
//   }

//     // Create users
//     const users = [];
//     const generatedLastNames = []; // Array to store generated last names
//     for (let i = 0; i < 20; i++) {
//       // Generate user data
//       const username = faker.internet.userName();
//       const password = '123';
//       let lastName = faker.name.lastName();

//       // Check if the generated last name already exists
//     while (generatedLastNames.includes(lastName)) {
//       lastName = faker.name.lastName();
//     }
//     generatedLastNames.push(lastName);

//       const firstName = faker.name.firstName();
//       const address = faker.address.streetAddress();
//       const email = faker.internet.email();

//       const user = await User.create({
//         username,
//         password,
//         lastName,
//         firstName,
//         address,
//         email,
//       });

//       users.push(user);
//     }

// // Create cart items
// for (const user of users) {
//   for (const dog of dogs) {
//     const cartItem = await Cart.create({
//       userId: user.id,
//       dogId: dog.id,
//       quantity: faker.datatype.number({ min: 1, max: 5 }),
//     });
//     // Save the cart item to the user's cartItems array
//     user.cartItems.push(cartItem);
//   }
//   //Update the code to save the users and dogs after creating the cart items
// // for (const user of users) {
//   await user.save();
// // }

// // }

// // for (const dog of dogs) {
// //   await dog.save();
// // }

//     // Create orders
// const orders = [];
// let newOrder; // Declare newOrder outside the loop
// for (let i = 0; i < 10; i++) {
//   newOrder = await Order.create({
//     isCart: true,
//     transactionID: 'xyz123',
//     cartItems: [{ item: 'item1', quantity: 2 }, { item: 'item2', quantity: 1 }],
//     checkout: false,
//   });
//   orders.push(newOrder);
// }

// // Update an order (example)
// if (orders.length > 0) {
//   const orderId = orders[0].id; // Use the ID of the first order
//   const orderToUpdate = await Order.findByPk(orderId);
//   if (orderToUpdate) {
//     orderToUpdate.checkout = true;
//     await orderToUpdate.save();
//   }
// }


//   console.log(`seeded ${users.length} users`);
//   console.log(`seeded ${dogs.length} dogs`);
//   console.log(`seeded ${users.length * dogs.length} cart items`); // Display the number of cart items
//   console.log(`seeded ${orders.length} orders`);
//   console.log(`seeded successfully`);

//   return {
//     users: {
//       cody: users[0],
//       murphy: users[1],
//       admin: users[2],
//     },
//   };
// }

// async function runSeed() {
//   console.log('seeding...')
//   try {
//     await seed()
//   } catch (err) {
//     console.error(err)
//     process.exitCode = 1
//   } finally {
//     console.log('closing db connection')
//     await db.close()
//     console.log('db connection closed')
//   }
// }
// if (module === require.main) {
// runSeed();
// }
// module.exports = seed;
