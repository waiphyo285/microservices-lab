const UserService = require("../services/auth");
const AuthUser = require("./middlewares/auth");
const { PublishMessage } = require("../utils");
const { LOGGER_SERVICE } = require("../config");

module.exports = (app, channel) => {
  const service = new UserService();

  app.post("/signup", async (req, res, next) => {
    const { email, password, phone } = req.body;
    const { data } = await service.SignUp({ email, password, phone });

    PublishMessage(
      channel,
      LOGGER_SERVICE,
      JSON.stringify({
        data: { email, phone, action: "Sign Up" },
        event: "SIGN_UP",
      })
    );

    res.json(data);
  });

  app.post("/login", async (req, res, next) => {
    const { email, phone, password } = req.body;
    const { data } = await service.SignIn({ email, password });

    PublishMessage(
      channel,
      LOGGER_SERVICE,
      JSON.stringify({
        data: { email, phone, action: "Sign In" },
        event: "SIGN_IN",
      })
    );

    res.json(data);
  });

  app.get("/profile", AuthUser, async (req, res, next) => {
    const { _id } = req.user;
    const { data } = await service.GetProfile({ _id });
    res.json(data);
  });

  app.get("/whoami", (req, res, next) => {
    return res.status(200).json({ msg: "/whoami : I am User Service" });
  });
};
