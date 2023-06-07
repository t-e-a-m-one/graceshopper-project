const { Dog } = require("../db/index");
const express = require("express");
const router = express.Router();

router.use(express.json());

// This route serves up all dogs
router.get("/", async (req, res, next) => {
  try {
    const getAllDogs = await Dog.findAll();
    if (getAllDogs.length === 0) {
      return res.status(404).json({ error: "No Dogs Found" });
    }
    res.json(getAllDogs);
  } catch (error) {
    next(error);
  }
});

// This route serves up a single dog
router.get("/:id", async (req, res, next) => {
  try {
    const dogId = req.params.id;
    if (!dogId) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const dog = await Dog.findByPk(dogId);
    if (!dog) {
      return res.status(404).json({ error: "Dog not found" });
    }
    res.json(dog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
