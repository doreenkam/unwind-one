const postSection = document.getElementById("postSection");
const searchBar = document.getElementById("searchBar");
const main = document.getElementById("main");

// searchBar.addEventListener("submit", (event) => {
//     event.preventDefault();
//     document.getElementById("postSection").remove();
//     const postSection = document.createElement("section");
//     postSection.setAttribute("id", "postSection");
//     main.append(postSection);
//     let searchTerm = event.target.search.value; // handle '&'
//     let newSearchTerm = "";
//     for(let i = 0; i < searchTerm.length; i++){
//         let letter = searchTerm[i];
//         if (letter === "&"){
//             newSearchTerm += "%26";
//         } else {
//             newSearchTerm += letter;
//         }
//     };
//     fetch(`http://localhost:3000/posts/search/allPosts?q=${newSearchTerm}`)
//     .then((r) => r.json())
//     .then((data) => displayPosts(data));
// })

fetch("http://localhost:3000/posts")
  .then((r) => r.json())
  .then((data) => displayPosts(data));

function displayPosts(posts) {
  for (post of posts) {
    //article//
    const article = document.createElement(`article`);
    article.setAttribute("id", `post${post.id}`);
    document.getElementById("postSection").append(article);
    //title//
    const title = document.createElement("h2");
    title.setAttribute("id", `title${post.id}`);
    title.textContent = post.title;
    article.append(title);
    //main body of post//
    const main = document.createElement("p");
    main.setAttribute("id", `main${post.id}`);
    main.textContent = post.content;
    article.append(main);
    //gif//
    //Create div element for gif and append to article
    const gifDiv = document.createElement("div");
    gifDiv.setAttribute("id", "gifDiv");
    article.append(gifDiv);
    const giphy = document.createElement("img");
    const url = `http://api.giphy.com/v1/gifs/search?q=${post.gif}&api_key=JRAJgNDb1SCjVI5M9EcLC24CFEBZt6ys&offset=${post.id}&rating=g&limit=1`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        //grabbing gif image
        giphy.src = data.data[0].images.original.url;
        //making gif image append to div
        gifDiv.append(giphy);
      })
      .catch(function () {
        console.log("No GIF entry");
      });
    //reaction bar//
    const reactionBar = document.createElement("div");
    reactionBar.setAttribute("id", `reactionBar${post.id}`);
    article.append(reactionBar);

    //like//
    const like = document.createElement("button");
    like.setAttribute("id", `like${post.id}`);
    like.setAttribute("class", "fas fa-thumbs-up");
    like.textContent = ` ${post.reaction.like}`;
    reactionBar.append(like);
    reactionCount(like, post.reaction.like, post.id, "like");

    //clap//
    const clap = document.createElement("button");
    clap.setAttribute("id", `clap${post.id}`);
    clap.setAttribute("class", "fas fa-sign-language");
    clap.textContent = ` ${post.reaction.clap}`;

    clap.addEventListener("mouseover", function (event) {
      event.target.style.backgroundolor = "rgb(235,219,195)";
    });

    reactionBar.append(clap);
    reactionCount(clap, post.reaction.clap, post.id, "clap");

    //love//
    const love = document.createElement("button");
    love.setAttribute("id", `love${post.id}`);
    love.textContent = ` ${post.reaction.love}`;
    love.setAttribute("class", "fas fa-heart");

    reactionBar.append(love);
    reactionCount(love, post.reaction.love, post.id, "love");

    //comments Area//
    const commentsArea = document.createElement("div");
    commentsArea.setAttribute("class", "commentsArea");
    article.append(commentsArea);

    //published comments
    const publishedComments = document.createElement("div");
    publishedComments.setAttribute("id", `publishedComments${post.id}`);
    commentsArea.append(publishedComments);

    const commentHeader = document.createElement("h3");
    commentHeader.setAttribute("id", "commentHeader");
    commentHeader.textContent = "Comments";
    publishedComments.append(commentHeader);

    //print each comment
    for (const comment of post.comments) {
      const commentP = document.createElement("p");
      commentP.textContent = comment;
      publishedComments.append(commentP);
    }

    //create form to add comments
    const commentForm = document.createElement("form");
    commentForm.setAttribute("id", `commentForm${post.id}`);
    commentsArea.append(commentForm);

    //Text area input label
    const commentLabel = document.createElement("label");
    commentLabel.setAttribute("id", `commentLabel${post.id}`);
    commentLabel.setAttribute("for", `commentInput${post.id}`);
    commentForm.append(commentLabel);

    //Text area input
    const commentInput = document.createElement("textarea");
    commentInput.setAttribute("id", `commentInput${post.id}`);
    commentInput.setAttribute("name", `commentInput${post.id}`);
    commentInput.setAttribute("placeholder", " Write your comment here...");
    commentInput.setAttribute("required", "required");
    commentForm.append(commentInput);

    const br = document.createElement("br");
    commentForm.append(br);

    const submitComment = document.createElement("input");
    submitComment.setAttribute("id", `submitComment${post.id}`);
    submitComment.setAttribute("type", "submit");
    submitComment.setAttribute("value", "Submit Comment");
    commentForm.append(submitComment);

    newComment(commentForm, post.id, `commentInput${post.id}`);
  }
}

function newComment(form, id, name) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const commentContent = { comment: event.target[name].value, id: id };
    const options = { method: "POST", body: JSON.stringify(commentContent) };
    fetch("http://localhost:3000/posts/newcomment", options);
    alert("Comment saved, viewable on refresh");
    form.reset();
  });
}

function reactionCount(button, count, id, type) {
  button.addEventListener("click", () => {
    count += 1;
    fetch(`http://localhost:3000/posts/findpost?id=${id}&type=${type}`);
    button.innerHTML = ` ${count}`;
    button.disabled = true;
  });
}

// To the top button //
const buttonToTop = document.getElementById("buttonToTop");
buttonToTop.addEventListener("click", () => {
  // window.scrollTo(0, 0);
  window.scrollTo({
    top: 0,
    left: 0,
    behaviour: "smooth",
  });
});
// End of "scroll to the top" button//

