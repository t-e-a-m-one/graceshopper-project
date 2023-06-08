'use strict'

const {db, models: {User} } = require('../server/db')
const Dog = require('../server/db/models/Dog')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const dogs = [{
  "id": 1,
  "name": "Gregorius",
  "sponsorFee": 89,
  "gender": "Male",
  "imageURL": "https://picsum.photos/200/300"
}, {
  "id": 2,
  "name": "Jacobo",
  "sponsorFee": 38,
  "gender": "Male",
  "imageURL": "https://picsum.photos/200/300"
}, {
  "id": 3,
  "name": "Selie",
  "sponsorFee": 73,
  "gender": "Female",
  "imageURL": "https://picsum.photos/200/300"
}, {
  "id": 4,
  "name": "Glynis",
  "sponsorFee": 63,
  "gender": "Female",
  "imageURL": "https://picsum.photos/200/300"
}, {
  "id": 5,
  "name": "Millard",
  "sponsorFee": 29,
  "gender": "Male",
  "imageURL": "https://picsum.photos/200/300"
}, {
  "id": 6,
  "name": "Dyann",
  "sponsorFee": 73,
  "gender": "Female",
  "imageURL": "https://picsum.photos/200/300"
}, {
  "id": 7,
  "name": "Tobiah",
  "sponsorFee": 62,
  "gender": "Male",
  "imageURL": "https://picsum.photos/200/300"
}, {
  "id": 8,
  "name": "Normy",
  "sponsorFee": 41,
  "gender": "Male",
  "imageURL": "https://picsum.photos/200/300"
}, {
  "id": 9,
  "name": "Linn",
  "sponsorFee": 28,
  "gender": "Female",
  "imageURL": "https://picsum.photos/200/300"
}, {
  "id": 10,
  "name": "Dionysus",
  "sponsorFee": 4,
  "gender": "Male",
  "imageURL": "https://picsum.photos/200/300"
}]


async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // await Promise.all(dogs.map(dog) => {
  //   return Dog.create(dog)
  // })
  await Promise.all(
    dogs.map(async (dogData) => {
      const { id, name, sponsorFee, gender, imageURL } = dogData;
      await Dog.create({ id, name, sponsorFee, gender, imageURL });
    })
  );

  // console.log("dogs", dogs);

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', lastName: 'cool', firstName: 'cody', address: '123 123 street', email: 'cody@cod.com' }),
    User.create({ username: 'murphy', password: '123', lastName: 'cool2', firstName: 'murphy', address: '2222 2222 ave', email: 'murphy@murph.com' }),
    User.create({username: 'admin', password: 'admin', isAdmin: true, lastName: 'aaaa', firstName: 'bbbb', address: 'admin street', email: 'admin@admin.admin'})
  ])


  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      admin: users[2]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
