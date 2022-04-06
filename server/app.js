// --------------- SETUP --------------- //
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;

let posts;
let singlePostId;

// --------------- Converts posts submitted from front-end to json and add to database.json --------------- //

const saveDataJSON = () => {
  const err = (error) => {
    if (error) {
      console.error(err);
      return;
    }
  };
  const jsonData = JSON.stringify(postMessage, null, 2);
  fs.writeFile("./database.json", jsonData, err);
};

// [null, 2] makes the file more readable in the json file
// adds json stringified data to database.json and runs error function if there is an error

// ---------------  Reads database.json and sends to front-end --------------- //

const sendDataJSON = () => {
  fs.readFile("./database.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      posts = JSON.parse(jsonString);
    } catch (err) {
      posts = { error: `Error parsing JSON string:${err}` };
    }
  });
};


sendDataJSON();
app.use(cors());

app.use(express.json());

// ---------------  REQUIRE ARRAY FROM JSON FILE  --------------- //

const postMessage = require("./database.json");


// ---------------  PUSHING THE FORM DATA FROM FRONTEND INTO postMessage VARIABLE AND WRITING THE postMessage VARIABLE BACK INTO input.json ---------------- //

app.post("/messages", (req, res) => {
  postMessage.push(req.body);
  saveDataJSON();
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
  sendDataJSON();
  res.send(postMessage);
});

//posts with specified id endpoint
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id > 0) {
    const postId = req.params.id - 1;
    res.send(postMessage[postId]);
  } else {
    res.send({ Error: "Post does not exist" });
  }
});

// --------------- LISTEN TO SERVER --------------- //

app.listen(port, () => {
  console.log(`App on http://localhost:${port}`);
});
