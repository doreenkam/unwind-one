// --------------- SETUP --------------- //
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;

const posts = require("./database.json");

// ------ Reading JSON file and Writing JSON file for posts ------ //

const readJSON = () => {
  fs.readFile("./database.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      postsRead = JSON.parse(jsonString);
    } catch (err) {
      postsRead = { error: `Error parsing JSON string:${err}` };
    }
  });
};

const writeJSON = () => {
  const err = (error) => {
    if (error) {
      console.error(err);
      return;
    }
    const jsonData = JSON.stringify(posts, null, 2);
    fs.writeFile("./database.json", jsonData, err);
  };
};

// [null, 2] makes the file more readable in the json file
// adds json stringified data to database.json and runs error function if there is an error

readJSON();
app.use(cors());
app.use(express.json());
app.use(bodyParser.text());

// -----------> LISTEN TO SERVER --------------- //

app.listen(port, () => {
  console.log(`Unwind server running at http://localhost:${port}`);
});

// ------------ ROUTES --------------- //

//----> main endpoint
app.get("/", (req, res) => {
  res.send("SERVERSIDE DEPLOYED!");
});

//---->posts endpoint
app.get("/post", (req, res) => {
  readJSON();
  res.send(posts);
});

//posts with specified id endpoint
app.get("/post/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id > 0) {
    const postId = req.params.id - 1;
    res.send(posts[postId]);
  } else {
    res.send({ Error: "Post does not exist" });
  }
});

//----> NEW POST endpoint | ADDING TO DATABASE

app.post("/post", (req, res) => {
  posts.push(req.body);
  readJSON();
  res.json({ success: true });
});
app.post("/post/newpost", (req, res) => {
  const newPostContent = JSON.parse(req.body);
  const newPost = {
    id: posts.length,
    title: "",
    date: "",
    content: "",
    gif: "",
    reaction: "",
    comments: "",
  };

  newPost.title += newPostContent.title;
  newPost.date += newPostContent.date;
  newPost.content += newPostContent.content;
  newPost.gif += newPostContent.gif;
  newPost.comments += newPostContent.comments;
  posts.push(newPost);
  writeJSON(posts);
  readJSON();
});

//-----> PULLING POST FOR DATABASE endpoint
app.get("/post/findpost", (res, req) => {
  let id = req.query.id;
  let type = req.query.type;
  posts[id].reaction[type] += 1;
  writeJSON(posts);
});

//-----> ADDING A COMMENT TO POST
app.post("/post/newcomment", (req, res) => {
  const newCommentContent = JSON.parse(req.body);
  const id = newCommentContent.id;
  const comment = newCommentContent.comment;
  posts[id].comments.push(comment);
  writeJSON(posts);
});

// ------> PLEASE CHECK ABOVE IN ENDPOINTS SECTION IF CORRENT FOR COMMENTS!

// ------> GIPHY endpoint / API & function (if necessary)

// -------> REACTION button endpoint & function (if necessary)

module.exports = app;
