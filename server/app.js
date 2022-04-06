// --------------- SETUP --------------- //

const express = require("express");
const app = express();
const cors = require("cors");
const { json } = require("body-parser");
const port = 3001;

app.use(cors());
app.use(express.json());

// ---------------  REQUIRE ARRAY FROM JSON FILE  --------------- //

const postMessage = require("./database.json");

// --------------- CHANGE POSTS SUBMITTED FROM FRONTEND TO JSON AND ADD TO database.json --------------- //

const saveData = () => {
  const finished = (error) => {
    if (error) {
      console.error(err);
      return;
    }
  };
  const jsonData = JSON.stringify(postMessage, null, 2);
  fs.writeFile("database.json", jsonData, finished);
};

// [null, 2] makes the file more readable in the json file
// adds json stringified data to database.json and runs error function if there is an error

// ---------------  PUSHING THE FORM DATA FROM FRONTEND INTO postMessage VARIABLE AND WRITING THE postMessage VARIABLE BACK INTO input.json ---------------- //

app.post("/messages", (req, res) => {
  postMessage.push(req.body);
  saveData();
  res.json({ success: true });
});

// where to post to - messages endpoint
app.post("/messages", (req, res) => {
  console.log(req.body);
  res.status(201).send(users);
});

// --------------- GIPHY --------------- //



// --------------- ROUTES --------------- //

// main endpoint
app.get("/", (req, res) => {
  res.send("SERVERSIDE DEPLOYED!");
});

// posts endpoint
app.get("/posts", (req, res) => {
  res.send(postMessage);
});

// --------------- LISTEN TO SERVER --------------- //

app.listen(port, () => {
  console.log(`App on http://localhost:${port}`);
});
