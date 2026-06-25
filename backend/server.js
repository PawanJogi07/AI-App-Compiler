const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI App Compiler Running"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
require("dotenv").config();

const generateRoute = require("./routes/generate");

app.use("/api/generate", generateRoute);