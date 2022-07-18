require("dotenv").config();
const tmi = require("tmi.js");

const tmiClient = new tmi.Client({
  connection: {
    reconnect: true,
    secure: true
  }
});

module.exports = {
  tmiClient
};
