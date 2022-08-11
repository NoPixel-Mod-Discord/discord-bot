require("dotenv").config();
const ReturnValue = require("./utils/models");

const API_KEY_HEADER_NAME = "x-api-key";

const checkAPIKey = async (req, res, next) => {
  const keyFromHeader = req.headers[API_KEY_HEADER_NAME];
  if (!keyFromHeader || keyFromHeader !== process.env.SERVER_API_KEY) {
    const retVal = new ReturnValue();
    retVal.status = 401;
    retVal.body.err = "Unauthorized";
    return res.status(retVal.status).json(retVal.body);
  }
  next();
};

module.exports = checkAPIKey;
