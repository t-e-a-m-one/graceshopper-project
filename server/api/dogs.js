const {Dog} = require("../db/index")
const express = require('express');
// const User = require("../db/models/User");
const router = require("express").Router();

router.use(express.json());

//This route serves up all dogs
router.get("/", async(req,res,next) => {
  try {
    const getAllDogs = await Dog.findAll();
    if(!getAllDogs) {
      return res.status(404).json({error: "No Dogs Found"});
    }
    res.send(getAllDogs);
  } catch (error) {
    next(error)
  }
 });

 //This route serves up a single dog
 router.get("/:id", async (req,res,next) => {

  const id = req.params.id;
  //This line below helped fix the id issues
  if (!id || !id.length) {
    return res.status(401).json({ error: "Invalid ID" });
  }

  try {
    const dog = await Dog.findByPk(id, {
    });
    if(!dog) {
      return res.status(404).json({error:"Dog not found"});
    }
    res.json(dog);
  } catch (error) {
    next(error);
  }
 });


 module.exports = router;
