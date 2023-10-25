const { LoggerModel } = require("../models");

class LoggerRepository {
  async GetLogs() {
    return await LoggerModel.find();
  }

  async WriteLog({ email, phone, action }) {
    const newLog = new LoggerModel({
      email,
      phone,
      action,
    });

    return await newLog.save();
  }
}

module.exports = LoggerRepository;
