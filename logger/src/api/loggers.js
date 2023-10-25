const LoggerService = require("../services/logger");
const { SubscribeMessage } = require("../utils");

module.exports = (app, channel) => {
  const service = new LoggerService();

  // To listen
  SubscribeMessage(channel, service);

  app.get("/list", async (req, res, next) => {
    const { data } = await service.GetList();
    res.json(data);
  });

  app.post("/write", async (req, res, next) => {
    const { email, password, action } = req.body;
    const { data } = await service.Write({ email, password, action });
    res.json(data);
  });

  app.get("/whoami", (req, res, next) => {
    return res.status(200).json({ msg: "/whoami : I am Logger Service" });
  });
};
