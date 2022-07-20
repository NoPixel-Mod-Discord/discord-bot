const express = require("express");
require("dotenv").config();

// API Routes
const addBan = require("./routes/addBan");
const moderatorRoute = require("./routes/getModeratorId");

// Initialize Express Client
const app = express();

const PORT = process.env.SERVER_PORT || 8888;

app.use(express.json());

// Status Check
app.get("/ping", (req, res) => {
  console.info("Server was pinged");
  res.status(200);
  res.send("Hello World");
});

// API Routes
app.use("/add-ban", addBan);
app.use("/get-moderator-id", moderatorRoute);

app.listen(PORT, () =>
  console.info(`🚀 Server ready at: http://localhost:${PORT}`)
);
