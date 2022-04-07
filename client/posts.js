const postSection = document.getElementById("postSection");
const searchBar = document.getElementById("searchBar");
const main = document.getElementById("main");

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

    // Reaction Button // "like");
    const reactionBtns = document.createElement("div");
    const like = document.createElement("button");
    const dislike = document.createElement("button");

    reactionBtns.setAttribute("id", `reactionBtns${post.id}`);
    article.append(reactionBtns);

    // Like Button //
    like.setAttribute("id", `like${post.id}`);
    like.setAttribute("class", "fas fa-thumbs-up like__btn");
    like.textContent = ` ${post.reaction.like}`;
    reactionBtns.append(like);
    reactionCount(like, post.reaction.like, post.id, "like");

    // Dislike Button //
    dislike.setAttribute("id", `dislike${post.id}`);
    dislike.setAttribute("class", "fas fa-thumbs-down dislike__btn");
    dislike.textContent = ` ${post.reaction.dislike}`;
    reactionBtns.append(dislike);
    reactionCount(dislike, post.reaction.dislike, post.id, "dislike");
    // const love = document.createElement("button");
    // love.setAttribute("id", `love${post.id}`);
    // love.textContent = ` ${post.reaction.love}`;
    // love.setAttribute("class", "fas fa-heart");
    // reactionBar.append(love);
    // reactionCount(love, post.reaction.love, post.id, "love");

    // Comments Area//
    const commentsArea = document.createElement("div");
    commentsArea.setAttribute("class", "commentsArea");
    article.append(commentsArea);

    // Published Comments
    const publishedComments = document.createElement("div");
    publishedComments.setAttribute("id", `publishedComments${post.id}`);
    commentsArea.append(publishedComments);

    const commentHeader = document.createElement("h3");
    commentHeader.setAttribute("id", "commentHeader");
    commentHeader.textContent = "Comments";
    publishedComments.append(commentHeader);

    // For printing the comments
    for (const comment of post.comments) {
      const commentP = document.createElement("p");
      commentP.textContent = comment;
      publishedComments.append(commentP);
    }

    // For to add commentss
    const commentForm = document.createElement("form");
    commentForm.setAttribute("id", `commentForm${post.id}`);
    commentsArea.append(commentForm);

    // Input label for the text ar
    const commentLabel = document.createElement("label");
    commentLabel.setAttribute("id", `commentLabel${post.id}`);
    commentLabel.setAttribute("for", `commentInput${post.id}`);
    commentForm.append(commentLabel);

    // Text input input
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
