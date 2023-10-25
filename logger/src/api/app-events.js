const LoggerService = require("../services/logger");

module.exports = (app) => {
  const service = new LoggerService();
  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;

    // handle subscribe events
    service.SubscribeEvents(payload);

    console.log("============= Logger ================");
    res.json(payload);
  });
};
