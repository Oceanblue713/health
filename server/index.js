const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json()); // allow us to usereq.body
app.use(cors());

// Routes

app.use("/auth", require("./routes/jwtAuth"))

app.use("/dashboard", require("./routes/dashboard"))

app.listen(5001, () => {
  console.log("Server is running on port 5001");
})