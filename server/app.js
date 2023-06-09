const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const Cart = require("../server/db/models/Cart");
const Dog = require("../server/db/models/Dog");
const User = require("../server/db/models/User");

// Logging
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());

// Auth and API routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/cart", async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Dog }],
    });

    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

module.exports = app;
