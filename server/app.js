const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// Index route
app.get("/", (req, res) => res.send("Hello World!"));

// Route for retrieving all quotees
app.get("/messages", (req, res) => {
  res.send(messages);
});

// Route for getting quotes by ID & haandling out of range IDs
// app.get("/messages/:id", (req, res) => {
//   console.log(req.query);
//   const msgId = req.params.id - 1;
//   const selectedMsg = messages[msgId];
//   if (!selectedMsg) {
//     res.status(404).send(`404 ERROR: Pick a number between 1 & 15`);
//   } else {
//     res.send(selectedMsg);
//   }
// });

module.exports = app;
