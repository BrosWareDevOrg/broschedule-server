import cors from "cors";
const express = require("express");

require("dotenv").config();

const app = express();
app.use(cors());

const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
