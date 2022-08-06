const express = require("express");
require("dotenv").config();
cors = require("cors");

// API Routes
const addBanRoute = require("./routes/addBan");
const moderatorRoute = require("./routes/getModeratorId");
const lookUpBanRoute = require("./routes/lookUpBan");
const addModeratorRoute = require("./routes/addModerator");

// Initialize Express Client
const app = express();

const PORT = process.env.SERVER_PORT || 3333;

// Middlewares
app.use(express.json());
app.use(cors());

// Status Check
app.get("/", async (req, res) => {
  console.info("Server was pinged");
  res.status(200);
  res.send("Hello World");
});

// API Routes
app.use("/add-ban", addBanRoute);
app.use("/get-moderator-id", moderatorRoute);
app.use("/lookup-ban", lookUpBanRoute);
app.use("/add-moderator", addModeratorRoute);

app.listen(PORT, () =>
  console.info(`🚀 Server ready at: http://localhost:${PORT}`)
);
