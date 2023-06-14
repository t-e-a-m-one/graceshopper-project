// import { useNavigate } from "react-router-dom";

const router = require("express").Router();
const {
  models: { User },
} = require("../db");

module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
    // const navigate = useNavigate();
    // navigate("/home");
    res.redirect("/home");
  } catch (err) {
    x;
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName, address } =
      req.body;
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      address,
    });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
