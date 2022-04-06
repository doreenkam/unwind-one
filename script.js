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
    clicked = true;
    likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
    count.textContent++;
  } else {
    clicked = false;
    likeIcon.innerHTML = `<i class="far fa-thumbs-up"></i>`;
  }
});

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
  const form = document.createElement("form");
  form.setAttribute("class", "comment-form");
  form.setAttribute("name", data.id);

  const header = document.createElement("h4");
  header.textContent = "Comment";

  const textArea = document.createElement("textarea");
  textArea.setAttribute("class", "comment-input");
  form.setAttribute("name", "comment");
  form.setAttribute("cols", "90");
  form.setAttribute("rows", "3");
  form.setAttribute("placeholder", "Share your thoughts!");

  const input = document.createElement("input");
  input.setAttribute("type", "submit");
  input.setAttribute("class", "fa button send-comment");
  input.setAttribute("value", "send comment");

  const commentSection = document.createElement("section");
  commentSection.setAttribute("class", "comment-section");

  // append form to new post section
  form.append(textArea);
  form.append(header);
  form.append(input);
  commentSection.append(form);

  let commentWrapper = document.querySelector("section.comment-section");
  commentWrapper.setAttribute("name", data.id);

  data.comment.forEach((comment) => {
    const comments1 = document.createElement("p");
    comments1.textContent = `${comment}`;
    commentWrapper.append(comments1);
    commentSection.append(commentWrapper);
  });
}
