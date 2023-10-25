const express = require("express");
const cors = require("cors");
const { logger, appEvents } = require("./api");
const { CreateChannel, SubscribeMessage } = require("./utils");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  // api
  // appEvents(app);

  const channel = await CreateChannel();

  logger(app, channel);
  // error handling
};
