"use strict";

const {
  db,
  models: { User },
} = require("../server/db");
const Dog = require("../server/db/models/Dog");

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");
}

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      lastName: "cool",
      firstName: "cody",
      address: "123 123 street",
      email: "cody@cod.com",
    }),
    User.create({
      username: "murphy",
      password: "123",
      lastName: "cool2",
      firstName: "murphy",
      address: "2222 2222 ave",
      email: "murphy@murph.com",
    }),
    User.create({
      username: "admin",
      password: "admin",
      isAdmin: true,
      lastName: "aaaa",
      firstName: "bbbb",
      address: "admin street",
      email: "admin@admin.admin",
    }),
  ]);
  //Creating Dogs aka Products
  const dogs = await Promise.all([
    Dog.create({
      name: "Gregorius",
      sponsorFee: 89,
      gender: "Male",
    }),
    Dog.create({
      name: "Jacobo",
      sponsorFee: 38,
      gender: "Male",
    }),
    Dog.create({
      name: "Selie",
      sponsorFee: 73,
      gender: "Female",
    }),
    Dog.create({
      name: "Glynis",
      sponsorFee: 63,
      gender: "Female",
    }),
    Dog.create({
      name: "Millard",
      sponsorFee: 29,
      gender: "Male",
    }),
    Dog.create({
      name: "Dyann",
      sponsorFee: 73,
      gender: "Female",
    }),
    Dog.create({
      name: "Tobiah",
      sponsorFee: 62,
      gender: "Male",
    }),
    Dog.create({
      name: "Normy",
      sponsorFee: 41,
      gender: "Male",
    }),
    Dog.create({
      name: "Linn",
      sponsorFee: 28,
      gender: "Female",
    }),
    Dog.create({
      name: "Dionysus",
      sponsorFee: 4,
      gender: "Male",
      imageURL: "https://picsum.photos/200/300",
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${dogs.length} dogs`);
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
////////////////////////////////////////////////
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Dogs (Products)
  const dogs = await Promise.all([
    Dog.create({
      name: "Gregorius",
      sponsorFee: 89,
      gender: "Male",
    }),
    Dog.create({
      name: "Jacobo",
      sponsorFee: 38,
      gender: "Male",
    }),
    Dog.create({
      name: "Selie",
      sponsorFee: 73,
      gender: "Female",
    }),
    Dog.create({
      name: "Glynis",
      sponsorFee: 63,
      gender: "Female",
    }),
    Dog.create({
      name: "Millard",
      sponsorFee: 29,
      gender: "Male",
    }),
    Dog.create({
      name: "Dyann",
      sponsorFee: 73,
      gender: "Female",
    }),
    Dog.create({
      name: "Tobiah",
      sponsorFee: 62,
      gender: "Male",
    }),
    Dog.create({
      name: "Normy",
      sponsorFee: 41,
      gender: "Male",
    }),
    Dog.create({
      name: "Linn",
      sponsorFee: 28,
      gender: "Female",
    }),
    Dog.create({
      name: "Dionysus",
      sponsorFee: 4,
      gender: "Male",
      imageURL: "https://picsum.photos/200/300",
    }),
  ]);

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      lastName: "cool",
      firstName: "cody",
      address: "123 123 street",
      email: "cody@cod.com",
    }),
    User.create({
      username: "murphy",
      password: "123",
      lastName: "cool2",
      firstName: "murphy",
      address: "2222 2222 ave",
      email: "murphy@murph.com",
    }),
    User.create({
      username: "admin",
      password: "admin",
      isAdmin: true,
      lastName: "aaaa",
      firstName: "bbbb",
      address: "admin street",
      email: "admin@admin.admin",
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${dogs.length} dogs`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      admin: users[2],
    },
  };
}
