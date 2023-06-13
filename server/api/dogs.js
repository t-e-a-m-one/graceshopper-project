const { Dog, User } = require("../db/index");
const express = require('express');
const router = require("express").Router();

router.use(express.json());

// This route serves up all dogs
router.get("/", async (req, res, next) => {
  try {
    const getAllDogs = await Dog.findAll();
    if (!getAllDogs) {
      return res.status(404).json({ error: "No Dogs Found" });
    }
    res.send(getAllDogs);
  } catch (error) {
    next(error)
  }
});

// This route serves up a single dog
router.get("/:id", async (req, res, next) => {
  try {
    const dog = await Dog.findByPk(req.params.id);
    if (!dog) {
      return res.status(404).json({ error: "Dog not found" });
    }
    res.json(dog);
  } catch (error) {
    next(error);
  }
});

// This route updates a dog's name and sponsor fee
router.put("/:id", async (req, res, next) => {
  try {
    const { name, sponsorFee } = req.body;
    const dog = await Dog.findByPk(req.params.id);
    if (!dog) {
      return res.status(404).json({ error: "Dog not found" });
    }
    dog.name = name;
    dog.sponsorFee = sponsorFee;
    await dog.save();
    res.json(dog);
  } catch (error) {
    next(error);
  }
});

// This route deletes a dog
router.delete("/:id", async (req, res, next) => {
  try {
    const dog = await Dog.findByPk(req.params.id);
    if (!dog) {
      return res.status(404).json({ error: "Dog not found" });
    }
    await dog.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
