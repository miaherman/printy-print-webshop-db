const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
const productRouter = require("./routers/product.router");
const orderRouter = require("./routers/order.router");
const userRouter = require("./routers/user.router");
const deliveryRouter = require("./routers/delivery.router");
const cookieSession = require("cookie-session");

const port = 4000;
const app = express();

app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    secret: "g5s6kfshj0",
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  })
);

app.use(productRouter);
app.use(userRouter);
app.use(orderRouter);
app.use(deliveryRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json(err.message);
});

// Kopplar an till vår databas
(async function run() {
  try {
    await mongoose.connect("mongodb+srv://admin:majl123@cluster0.yis06.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
  }

  app.listen(port, () => {
    console.log("Server is up and running");
  });
})();
