const router = require("express").Router();
const {
  models: { User },
  Address,
} = require("../db");

module.exports = router;

// GET users at /api/users, include only their id, username, and email.
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET user at /api/users/:userId, include their associated address(es).
router.get("/:userId", async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId, {
      include: [Address],
    });
    res.send(singleUser);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/address", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    const addresses = await user.getAddresses();
    res.json(addresses);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId);
    await singleUser.update(req.body);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// DELETE `/api/users/:userId` is a route to remove a user (based on its id).
router.delete("/:userId", async (req, res, next) => {
  try {
    const userToDelete = await User.findByPk(req.params.userId);
    await userToDelete.destroy();
    res.send(userToDelete);
  } catch (error) {
    next(error);
  }
});
