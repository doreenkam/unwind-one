// --------------- SETUP --------------- //
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;
let posts;

readJSON();
app.use(cors());
app.use(express.json());
app.use(bodyParser.text());

// -----------> LISTEN TO SERVER --------------- //

app.listen(port, () => {
  console.log(`Unwind server running at http://localhost:${port}`);
});

// ------------> ROUTES --------------- //

//----> main endpoint
app.get("/", (req, res) => {
  res.send("SERVERSIDE DEPLOYED!");
});

//----> JSON endpoint
app.get("/post", (req, res) => {
  readJSON();
  res.send(posts);
});

//----> NEW POST endpoint | ADDING TO DATABASE
app.post('/post/newpost', (re, res) => {
  const newPostContent = JSON.parse(req.body);
  const newPost = {
    id: posts.length,
    title: '',
    date: '',
    content: ''
  };

newPost.title += newPostContent.title;
newPost.date += newPostContent.date;
newPost.content += newPostContent.content;
posts.push(newPost);
writeJSON(posts);
readJSON();

});

//-----> PULLING POST FOR DATABASE endpoint
app.get('/post/findpost', (res, req) => {
  let id = req.query.id;
  let type = req.query.type;
  posts[id].reaction[type] += 1;
  writeJSON(posts);
});

//-----> ADDING A COMMENT TO POST
app.post('/post/new comment', (req, res) => {
  const newCommentContent = JSON.parse(req.body); 
  const id = newCommentContent.id;
  const comment = newCommentContent.comment;
  posts[id].comments.push(comment);
  writeJSON(posts);
});



//----> DEFINING FUNCTIONS USED IN ENDPOINTS
function readJSON() {
  fs.readFile('./database.json', 'Anonymous #1', (err, jsonString) => {
    if (err) {
      console.log('Error reading file from disk', err);
      return;
    }
    try {
      posts = JSON.parse(jsonString);
    }
    catch (err) {
      posts = {error: `Error parsing JSON string:${err}`};
    }
  });
}

function writeJSON(body) {
  const jsonString = JSON.stringify(body);
  fs.writeFile('./database.json', jsonString, (err) => {
    err
      ? console.log('Error writing file', err)
      : console.log('Successfully written to database.json');
  });
}

// ------> PLEASE CHECK ABOVE IN ENDPOINTS SECTION IF CORRENT FOR COMMENTS!




// ------> GIPHY endpoint / API & function (if necessary)




// -------> REACTION button endpoint & function (if necessary)