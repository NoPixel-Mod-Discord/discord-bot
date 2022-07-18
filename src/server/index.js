const express = require("express");
require("dotenv").config();

// API Routes
const banRoute = require("./routes/ban");

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
app.use("/ban", banRoute);

app.listen(PORT, () =>
  console.info(`🚀 Server ready at: http://localhost:${PORT}`)
);
