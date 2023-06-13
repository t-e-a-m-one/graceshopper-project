const express = require('express');
const router = require('express').Router();
const { Dog, User } = require('../db/index');

// Middleware function to check if user is an admin
const isAdmin = (req, res, next) => {
  const user = req.user; // Assuming you have set up user authentication middleware to attach the user object to the request
  if (user.username === 'admin') {
    next(); // Proceed to admin routes
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Admin route to get all dogs
router.get('/dogs', isAdmin, async (req, res, next) => {
  try {
    const dogs = await Dog.findAll();
    res.json(dogs);
  } catch (error) {
    next(error);
  }
});

// Admin route to update a dog
router.put('/dogs/:id', isAdmin, async (req, res, next) => {
  try {
    const { name, sponsorFee } = req.body;
    const dog = await Dog.findByPk(req.params.id);
    if (!dog) {
      return res.status(404).json({ error: 'Dog not found' });
    }
    // Update the dog properties (only sponsorFee and name)
    dog.name = name;
    dog.sponsorFee = sponsorFee;
    // Save the updated dog
    await dog.save();
    res.json(dog);
  } catch (error) {
    next(error);
  }
});

// Admin route to delete a dog
router.delete('/dogs/:id', isAdmin, async (req, res, next) => {
  try {
    const dog = await Dog.findByPk(req.params.id);
    if (!dog) {
      return res.status(404).json({ error: 'Dog not found' });
    }
    // Delete the dog
    await dog.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Admin route to get all users
router.get('/users', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
