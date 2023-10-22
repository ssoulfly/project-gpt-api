const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const RouterLoader = require("./middlewares/RouterLoader");
const config = require("./config");

const Loader = new RouterLoader({
  path: path.join(__dirname, "routers"),
  app,
});

mongoose
  .connect(config.MONGO_URI)
  .then(async () => {
    console.log(`mongo connection success`);

    await Loader.loadAllRoute();

    const listener = app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
      console.log("Server Started " + listener.address().port + " Port!");
    });
  })
  .catch((err) => {
    console.error(`mongo connection error`);
    console.error(err);
    return err;
  });
