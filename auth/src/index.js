const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  await expressApp(app);

  app
    .listen(PORT, () => {
      console.log(`OK::Listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log("Err::Application started ", err);
      process.exit();
    });
};

StartServer();
