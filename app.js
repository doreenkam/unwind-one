// --------------- SETUP --------------- //
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

let posts = require("./database.json");
let singlePostId;

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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Unwind server running at ${port}`);
});

// ------------ ROUTES --------------- //

//----> main endpoint
app.get("/", (req, res) => {
  res.send("Blogs API Running!");
});

app.post("/posts", (req, res) => {
  posts.push(req.body);
  readJSON();
  res.json({ success: true });
});

//posts with specified id endpoint
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id > 0) {
    const postId = req.params.id - 1;
    res.send(posts[postId]);
  } else {
    res.send({ Error: "Post does not exist" });
  }
});

//----> NEW POST endpoint | ADDING TO DATABASE

//---->posts endpoint
app.get("/posts", (req, res) => {
  readJSON();
  res.send(posts);
});

app.post("/posts/newpost", (req, res) => {
  const newPostContent = JSON.parse(req.body);
  const newPost = {
    id: posts.length,
    title: "",
    date: "",
    content: "",
    gif: "",
    reaction: {
      like: 0,
      dislike: 0,
      love: 0,
    },
    comments: [],
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
app.get("/posts/findpost", (res, req) => {
  let id = req.query.id;
  let type = req.query.type;
  posts[id].reaction[type] += 1;
  writeJSON(posts);
});

//-----> ADDING A COMMENT TO POST
app.post("/posts/newcomment", (req, res) => {
  const newCommentContent = JSON.parse(req.body);
  const id = newCommentContent.id;
  const comment = newCommentContent.comment;
  posts[id].comments.push(comment);
  writeJSON(posts);
});

// app.get("/posts/postid", (req, res) => {
//   singlePostId = req.query.id;
// });

// app.get("/posts/singlepost", (req, res) => {
//   res.send(JSON.stringify(posts[singlePostId]));
// });

module.exports = app;
