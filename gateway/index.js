const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", proxy("http://localhost:4001"));
app.use("/logger", proxy("http://localhost:4002"));

app.listen(4000, () => {
  console.log("Gateway is Listening to Port 4000");
});
