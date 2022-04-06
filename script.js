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
