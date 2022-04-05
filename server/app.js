const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// Index route
app.get("/", (req, res) => res.send("Our message board's API is running 👩🏾‍💻"));

// Route for getting quotes by ID & haandling out of range IDs
// app.get("/messages/:id", (req, res) => {
//   console.log(req.query);
//   const msgId = req.params.id - 1;
//   const selectedMsg = messages[msgId];
//   if (!selectedMsg) {
//     res.status(404).send(`404 ERROR`);
//   } else {
//     res.send(selectedMsg);
//   }
// });

module.exports = app;
