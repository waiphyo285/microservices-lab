const UserService = require("../services/auth");

module.exports = (app) => {
  const service = new UserService();
  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;

    // handle subscribe events
    service.SubscribeEvents(payload);

    console.log("============= User ================");
    res.json(payload);
  });
};
