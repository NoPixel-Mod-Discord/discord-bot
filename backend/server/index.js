const express = require("express");
require("dotenv").config();
const cors = require("cors");

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

app.use("/api/v1", require("./routes"));

app.listen(PORT, () =>
  console.info(`🚀 Server ready at: http://localhost:${PORT}`),
);
