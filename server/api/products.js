const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    // fetch all products
    res.send("All products");
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    // fetch a single product by id
    res.send(`Product with id ${productId}`);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    //  update a product by id
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    // delete a product by id
    res.status(204).send();
  } catch (error) {
    if (isNaN(req.params.id)) {
      res.status(400).send();
    } else {
      next(error);
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    // create a new product
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
