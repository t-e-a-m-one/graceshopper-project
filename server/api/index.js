const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
//Added this line below
router.use("/dogs", require("./dogs"));
router.use("/admin", require("./admin"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
