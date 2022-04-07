// ----------- Settings Button ------------
const settingsMenu = document.querySelector(".settings-menu");

function settingsMenuToggle() {
  settingsMenu.classList.toggle("settings-menu-height");
}

// ----------- Dark Mode Button ------------ //

const darkBtn = document.getElementById("dark-btn");

darkBtn.onclick = function () {
  darkBtn.classList.toggle("dark-btn-on");
  document.body.classList.toggle("dark-theme");

  if (localStorage.getItem("theme") == "light") {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
};

if (localStorage.getItem("theme") == "light") {
  darkBtn.classList.remove("dark-btn-on");
  document.body.classList.remove("dark-theme");
} else if (localStorage.getItem("theme") == "dark") {
  darkBtn.classList.add("dark-btn-on");
  document.body.classList.add("dark-theme");
} else {
  localStorage.setItem("theme", "light");
}

// ----------- Reaction Button Functions ------------ //

const likeBtn = document.querySelector(".like__btn");
let likeIcon = document.querySelector("#icon");
let count = document.querySelector("#count");

let clicked = true;

likeBtn.addEventListener("click", () => {
  if (clicked) {
    likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
    count.textContent++;
  } else {
    likeIcon.innerHTML = `<i class="far fa-thumbs-up"></i>`;
  }
});

// ===== REACTION ==== //

const like = document.getElementById("like");
const dislike = document.getElementById("dislike");
const likeCount = document.getElementById("likeCount");
const dislikeCount = document.getElementById("dislikeCount");

function reactionCount(button, count, id, type) {
  button.addEventListener("click", () => {
    count += 1;
    fetch(`http://localhost:3000/id=${id}`);
    button.innerHTML = ` ${count}`;
    button.disabled = true;
  });
}

// --------------- Giphy Search Function ----------- //

let gifLink = "";

function sendApiRequest() {
  let userInput = document.getElementById("input-giphy").value;
  console.log(userInput);

  const giphyApiKey = "01YtqfkM52wCXgAyJ2YbXdE2aoOyXPdF";

  const giphyApiURL = `https://api.giphy.com/v1/gifs/search?q=${userInput}&rating=g&api_key=${giphyApiKey}`;

  fetch(giphyApiURL)
    .then(function (data) {
      return data.json();
    })
    .then(function (json) {
      let index = Math.floor(Math.random() * json.data.length);
      console.log(json.data[0].images.fixed_height.url);
      let imagePath = json.data[index].images.fixed_height.url;
      let gifImage = document.querySelector("#gifImage");
      gifImage.setAttribute("src", imagePath);
      gifLink = imagePath;
    });
}

// ---------- Comment Section ----------- //

function commentSection(form, data, section) {
  const form3 = document.createElement("form");
  form3.setAttribute("class", "comment-form");
  form3.setAttribute("name", data.id);

  const header = document.createElement("h4");
  header.textContent = "Comment";

  const textArea = document.createElement("textarea");
  textArea.setAttribute("class", "comment-input");
  textArea.setAttribute("id", "commentForm");

  form3.setAttribute("name", "comment");
  form3.setAttribute("cols", "90");
  form3.setAttribute("rows", "3");
  form3.setAttribute("placeholder", "Share your thoughts!");

  const input = document.createElement("input");
  input.setAttribute("type", "submit");
  input.setAttribute("class", "fa button send-comment");
  input.setAttribute("value", "send comment");

  // const commentSection = document.createElement("section");
  section.setAttribute("class", "comment-section");
  section.setAttribute("id", "comment-section");

  // append form to new post section
  form3.append(textArea);
  form3.append(header);
  form3.append(input);
  commentSection.append(form3);

  let commentWrapper = document.querySelector("section.comment-section");
  commentWrapper.setAttribute("name", data.id);

  data.comment.forEach((comment) => {
    const comments1 = document.createElement("p");
    comments1.textContent = `${comment}`;
    commentWrapper.append(comments1);
    commentSection.append(commentWrapper);
  });
}

// ------------------- POST INTO ARRAY BUTTON ------------------ //

const form = document.getElementById("postForm");
const title = document.getElementById("titleForm");
const date = document.getElementById("dateForm");
const content = document.getElementById("contentForm");
const gif = document.getElementById("gifImage");
const comments = document.getElementById("commentForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = event.target.titleForm.value;
  const date = event.target.dateForm.value;
  const content = event.target.contentForm.value;
  const gif = event.target.gifImage.value;
  const comments = event.target.commentForm.value;

  submitPost(title, date, content, gif, comments);
  alert("Unwind Post Submitted!");
  form.reset();
  redirectHome();
});

function submitPost(title, date, content, gif, comments) {
  const newPostElements = {
    title: title,
    date: date,
    content: content,
    gif: gif,
    commments: comments,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(newPostElements),
  };

  fetch("http://localhost:3000/post", options);
}

function redirectHome() {
  window.location.href = "index.html";
}

// ------------------- PULL FROM ARRAY ---------------///

fetch("http://localhost:3000/post")
  .then((r) => r.json())
  .then((data) => displayPosts(data));

function displayPosts(posts) {
  for (post of posts) {
    //NEW POST
    const newPost = document.createElement(`newPost`);
    newPost.setAttribute("id", `post${post.id}`);
    document.getElementById("postSection").append(newPost);

    //TITLE OF NEW POST
    const title = document.createElement("h4");
    title.setAttribute("id", `title${post.id}`);
    title.textContent = post.title;
    newPost.append(title);

    //DATE OF NEW POST
    const date = document.createElement("span");
    date.setAttribute("id", `date${post.id}`);
    date.textContent = post.date;
    newPost.append(date);

    //CONTENT OF NEW POST
    const content = document.createElement("p");
    content.setAttribute("id", `content${post.id}`);
    content.textContent = post.content;
    newPost.append(content);
  }
}

// ------ END OF FUNCTION TO FETCH FROM ARRAY ------ //
