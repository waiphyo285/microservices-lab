const { LoggerRepository } = require("../database");
const { FormateData } = require("../utils");

class LoggerService {
  constructor() {
    this.repository = new LoggerRepository();
  }

  async GetList(args) {
    const getLogs = await this.repository.GetLogs();
    return FormateData(getLogs);
  }

  async Write(args) {
    const { email, phone, action } = args;

    const newLog = await this.repository.WriteLog({
      email,
      phone,
      action,
    });

    return FormateData(newLog);
  }

  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);

    const { event, data } = payload;

    switch (event) {
      case "SIGN_IN":
      case "SIGN_UP":
        this.Write({ ...data, action: `${data.action} is created` });
        break;

      default:
        break;
    }
  }
}

module.exports = LoggerService;
