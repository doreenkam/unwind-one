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

// --------------- Giphy Search Function ----------- //

let gifLink = "";

function sendApiRequest() {
  let userInput = document.getElementById("inputGiphy").value;
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

// --------------- Create Post Output ----------- //

const form = document.getElementById("postform");
const title = document.getElementById("titleForm");
const content = document.getElementById("contentForm");
const gif = document.getElementById("gifImage");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = event.target.titleForm.value;
  const content = event.target.contentForm.value;
  const gif = event.target.gifImage.value;

  submitPost(title, content, gif);
  alert("Post created");
  form.reset();
  redirectHome();
});

function submitPost(title, description, content, gif) {
  const newPostElements = {
    title: title,
    content: content,
    gif: gif,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(newPostElements),
  };

  fetch("http://localhost:3000/posts/newpost", options);
}

function redirectHome() {
  window.location.href = "posts.html";
}
