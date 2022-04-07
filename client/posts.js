const postSection = document.getElementById("postSection");
const main = document.getElementById("main");

fetch("http://localhost:3000/posts")
  .then((r) => r.json())
  .then((data) => displayPosts(data));

function displayPosts(posts) {
  for (post of posts) {
    // Creating the article container for the post and append to post page

    const article = document.createElement(`article`);

    article.style.border = "#341C09 3px solid";
    article.style.marginBottom = "30px";
    article.style.borderRadius = "10px";
    article.style.textAlign = "center";

    article.setAttribute("id", `post${post.id}`);
    document.getElementById("postSection").append(article);

    // Creating the title for the post and adding to the article

    const title = document.createElement("h1");
    title.style.fontSize = "35px";
    title.style.color = "#341C09";
    title.setAttribute("id", `title${post.id}`);
    title.textContent = post.title;
    article.append(title);

    // Creating the content and adding to the article

    const main = document.createElement("p");
    main.style.fontSize = "20px";
    main.setAttribute("id", `main${post.id}`);
    main.textContent = post.content;
    article.append(main);

    //Creating a div element for gif and adding to article

    const gifDiv = document.createElement("div");
    gifDiv.setAttribute("id", "gifDiv");
    article.append(gifDiv);

    const giphy = document.createElement("img");
    const url = `http://api.giphy.com/v1/gifs/search?q=${post.gif}&api_key=JRAJgNDb1SCjVI5M9EcLC24CFEBZt6ys&offset=${post.id}&rating=g&limit=1`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        // Getting the
        giphy.src = data.data[0].images.original.url;
        // Centering gif & Appending GIF to '<div>' Element
        gifDiv.style.textAlign = "center";
        gifDiv.append(giphy);
      })
      // Catch error if there is no gif entry
      .catch(function () {
        console.log("No GIF found");
      });

    // Creating Reaction Buttons
    const reactionBtns = document.createElement("div");
    const like = document.createElement("button");
    const dislike = document.createElement("button");

    reactionBtns.setAttribute("id", `reactionBtns${post.id}`);
    article.append(reactionBtns);

    // Assigning Styling & Value to 'Likes' Button
    like.setAttribute("id", `like${post.id}`);
    like.setAttribute("class", "fas fa-thumbs-up like__btn");
    like.textContent = ` ${post.reaction.like}`;
    reactionCount(like, post.reaction.like, post.id, "like");
    reactionBtns.append(like);

    // Assigning Styling & Value to 'Dislikes' Button
    dislike.setAttribute("id", `dislike${post.id}`);
    dislike.setAttribute("class", "fas fa-thumbs-down dislike__btn");
    dislike.textContent = ` ${post.reaction.dislike}`;
    reactionCount(dislike, post.reaction.dislike, post.id, "dislike");

    reactionBtns.append(dislike);

    // const love = document.createElement("button");
    // love.setAttribute("id", `love${post.id}`);
    // love.textContent = ` ${post.reaction.love}`;
    // love.setAttribute("class", "fas fa-heart");
    // reactionBar.append(love);
    // reactionCount(love, post.reaction.love, post.id, "love");

    // Comments Area
    const commentsArea = document.createElement("div");
    commentsArea.style.borderTop = "black 1px solid";

    commentsArea.setAttribute("class", "commentsArea");
    article.append(commentsArea);

    // Comments retrieved from to database

    const publishedComments = document.createElement("div");
    publishedComments.setAttribute("id", `publishedComments${post.id}`);
    commentsArea.append(publishedComments);

    const commentHeader = document.createElement("h3");
    commentHeader.setAttribute("id", "commentHeader");
    commentHeader.style.marginLeft = "30px";
    commentHeader.textContent = "Comments";
    publishedComments.append(commentHeader);

    // Add commentss
    const commentForm = document.createElement("form");
    commentForm.style.opacity = "0.5";
    commentForm.style.marginLeft = "30px";
    commentForm.setAttribute("id", `commentForm${post.id}`);
    commentsArea.append(commentForm);

    // Input label for the text
    const commentLabel = document.createElement("label");
    commentLabel.setAttribute("id", `commentLabel${post.id}`);
    commentLabel.setAttribute("for", `commentInput${post.id}`);
    commentForm.append(commentLabel);

    // Text input input
    const commentInput = document.createElement("textarea");
    commentInput.style.width = "500px";
    commentInput.style.border = "none";
    commentInput.style.borderRadius = "7px";
    commentInput.setAttribute("id", `commentInput${post.id}`);
    commentInput.setAttribute("name", `commentInput${post.id}`);
    commentInput.setAttribute("placeholder", " Let us know what you think!");
    commentInput.setAttribute("required", "required");
    commentInput.style.width = "550px";
    commentForm.append(commentInput);

    const br = document.createElement("br");
    commentForm.append(br);

    const submitComment = document.createElement("input");
    submitComment.style.width = "500px";
    submitComment.style.height = "30px";
    submitComment.style.cursor = "pointer";
    submitComment.style.backgroundColor = "#6491fb";
    submitComment.style.color = "rgb(255, 255, 255)";
    submitComment.style.borderRadius = "7px";
    submitComment.style.border = "none";
    submitComment.style.marginBottom = "10px";

    submitComment.setAttribute("id", `submitComment${post.id}`);
    submitComment.setAttribute("type", "submit");
    submitComment.setAttribute("value", "Submit Comment");
    submitComment.style.width = "200px";
    submitComment.style.position = "relative";
    submitComment.style.left = "175px";
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
