const router = require('express').Router();
const { Dog, User } = require("../db/index");

// Authorization middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized access' });
  }
};

// Route to display the admin page
router.get('/admin', isAdmin, (req, res) => {
  res.send('Welcome to the admin page');
});

// Route to update a product (dog)
router.put('/dogs/:id', isAdmin, async (req, res, next) => {
  try {
    const dogId = req.params.id;
    const { name, sponsorFee, gender, imageURL } = req.body;

    // Check admin authorization
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Find the dog by ID
    const dog = await Dog.findByPk(dogId);
    if (!dog) {
      return res.status(404).json({ error: 'Dog not found' });
    }

    // Update the dog
    dog.name = name;
    dog.sponsorFee = sponsorFee;
    dog.gender = gender;
    dog.imageURL = imageURL;

    // Save the updated dog
    await dog.save();

    res.json(dog);
  } catch (error) {
    next(error);
  }
});

// Route to delete a product (dog)
router.delete('/dogs/:id', isAdmin, async (req, res, next) => {
  try {
    const dogId = req.params.id;

    // Check admin authorization
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Find the dog by ID
    const dog = await Dog.findByPk(dogId);
    if (!dog) {
      return res.status(404).json({ error: 'Dog not found' });
    }

    // Delete the dog
    await dog.destroy();

    res.json({ message: 'Dog deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Route to create a new product (dog)
router.post('/dogs', isAdmin, async (req, res, next) => {
  try {
    const { name, sponsorFee, gender, imageURL } = req.body;

    // Check admin authorization
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Create a new dog
    const dog = await Dog.create({
      name,
      sponsorFee,
      gender,
      imageURL,
    });

    res.json(dog);
  } catch (error) {
    next(error);
  }
});

// Route to get all users
router.get('/users', isAdmin, async (req, res, next) => {
  try {
    // Check admin authorization
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Find all users with selected attributes
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'address', 'firstName', 'lastName', 'isAdmin'],
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
