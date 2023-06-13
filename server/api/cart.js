
const { Cart, Dog } = require('../db/index');
const { models: { User, Order }} = require('../db');
const express = require('express');
const router = express.Router();

//Retrieves all cart items for a specific user from the database.
router.get('/:userId', async (req, res, next) => {
  try {
    const userId  = req.params.userId;
    if (!userId) {
      // If userId is undefined or missing, return an appropriate error response
      return res.status(400).json({ error: 'userId is required'});
    }
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [ { model: Dog }],
    });
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

// Adds a new item to the cart in the database
router.post('/', async (req, res, next) => {
  try {
    const { userId, dogId, quantity } = req.body;
    if (!userId || !dogId) {
      // If userId or dogId is missing, return an appropriate error response
      return res.status(400).json({ error: 'userId and dogId are required' });
    }
    const cartItem = await Cart.create({ userId, dogId, quantity });
    res.status(201).json(cartItem);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      // Handle validation errors
      const validationErrors = error.errors.map((err) => ({
        message: err.message,
        field: err.path,
      }));
      return res.status(400).json({ errors: validationErrors });
    }
    next(error);
  }
});
// Creates a new order in the database
router.post('/new-order', async (req, res, next) => {
  try {
    const { userId, cartItems, transactionID, checkout } = req.body;

    const order = await Order.create({ userId, transactionID, checkout });

    // Associate the cart items with the order
    await Promise.all(
      cartItems.map(async (cartItem) => {
        const { dogId, quantity } = cartItem;
        await order.addDog(dogId, { through: { quantity } });
      })
    );

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

// Updates the quantity of an item in the cart in the database based on the provided itemId parameter.
router.put('/:itemId', async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findByPk(itemId);
    if (!cartItem) {
      return res.sendStatus(404);
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    next(error);
  }
});

// Removes an item from the cart in the database based on the provided itemId parameter.
router.delete('/:itemId', async (req, res, next) => {
  try {
    const { itemId } = req.params;

    await Cart.destroy({ where: { id: itemId } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;













// const { Cart, Dog } = require('../db/index');
// const { models: { User }} = require('../db')
// const express = require('express');
// const router = express.Router();

// // Retrieves all cart items for a specific user from the database.
// router.get('/', async (req, res, next) => {
//   try {
//     const { userId }  = req.query;
//     if (!userId) {
//       // If userId is undefined or missing, return an appropriate error response
//       return res.status(400).json({ error: 'userId is required' });
//     }
//     const cartItems = await Cart.findAll({
//       where: {userId } ,
//       include: [{ model: User }, { model: Dog }],
//     });
//     res.json(cartItems);
//   } catch (error) {
//     next(error);
//   }
// });

// // Adds a new item to the cart in the database
// router.post('/', async (req, res, next) => {
//   try {
//     const { userId, dogId, quantity } = req.body;
//     if (!userId || !dogId) {
//       // If userId or dogId is missing, return an appropriate error response
//       return res.status(400).json({ error: 'userId and dogId are required' });
//     }
//     const cartItem = await Cart.create({ userId, dogId, quantity });
//     res.status(201).json(cartItem);
//   } catch (error) {
//     if (error.name === 'SequelizeValidationError') {
//       // Handle validation errors
//       const validationErrors = error.errors.map((err) => ({
//         message: err.message,
//         field: err.path,
//       }));
//       return res.status(400).json({ errors: validationErrors });
//     }
//     next(error);
//   }
// });

// // Updates the quantity of an item in the cart in the database based on the provided itemId parameter.
// router.put('/:itemId', async (req, res, next) => {
//   try {
//     const { itemId } = req.params;
//     const { quantity } = req.body;

//     const cartItem = await Cart.findByPk(itemId);
//     if (!cartItem) {
//       return res.sendStatus(404);
//     }

//     cartItem.quantity = quantity;
//     await cartItem.save();

//     res.json(cartItem);
//   } catch (error) {
//     next(error);
//   }
// });

// // Removes an item from the cart in the database based on the provided itemId parameter.
// router.delete('/:itemId', async (req, res, next) => {
//   try {
//     const { itemId } = req.params;

//     await Cart.destroy({ where: { id: itemId } });
//     res.sendStatus(204);
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;















// const { Cart, User, Dog } = require('../db/index');
// const express = require('express');
// const router = express.Router();

// // Retrieves all cart items for a specific user from the database.
// router.get('/', async (req, res, next) => {
//   try {
//     const { userId } = req.query;
//     const cartItems = await Cart.findAll({
//       where: { userId },
//       include: [
//         {
//           model: User,
//           attributes: ['id', 'name'], // Include specific user attributes
//         },
//         {
//           model: Dog, // Include the dogs model association
//           attributes: ['id', 'name', 'sponsorFee'], // Include specific dog attributes
//         },
//       ],
//     });
//     res.json(cartItems);
//   } catch (error) {
//     next(error);
//   }
// });

// // Adds a new item to the cart in the database
// router.post('/', async (req, res, next) => {
//   try {
//     const { userId, dogId, quantity } = req.body;
//     const cartItem = await Cart.create({ userId, dogId, quantity });
//     res.status(201).json(cartItem);
//   } catch (error) {
//     next(error);
//   }
// });

// // Removes an item from the cart in the database based on the provided itemId parameter.
// router.delete('/:itemId', async (req, res, next) => {
//   try {
//     const { itemId } = req.params;

//     await Cart.destroy({ where: { id: itemId } });
//     res.sendStatus(204);
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;

