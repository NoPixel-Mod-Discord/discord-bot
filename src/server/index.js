const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.SERVER_PORT || 5555;

app.use(express.json());

app.listen(PORT, () =>
  console.info(`🚀 Server ready at: http://localhost:${PORT}`)
);
