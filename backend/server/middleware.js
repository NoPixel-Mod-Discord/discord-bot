const ReturnValue = require("./utils/models");
const { Config } = require("../config");

const API_KEY_HEADER_NAME = "x-api-key";

const checkAPIKey = async (req, res, next) => {
  const keyFromHeader = req.headers[API_KEY_HEADER_NAME];
  if (!keyFromHeader || keyFromHeader !== Config.serverApiKey) {
    const retVal = new ReturnValue();
    retVal.status = 401;
    retVal.body.err = "Unauthorized";
    return res.status(retVal.status).json(retVal.body);
  }
  next();
};

module.exports = checkAPIKey;
