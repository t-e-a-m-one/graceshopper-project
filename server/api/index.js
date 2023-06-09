const router = require("express").Router();
module.exports = router;
const cors = require("cors");

router.use(cors());

router.use("/users", require("./users"));
router.use("/cart", require("./carts"));
router.use("/products", require("./products"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
