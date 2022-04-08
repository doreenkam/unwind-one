/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../../client/index.html'), 'utf8');

beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
})

// testing the broader structor of the webpage //

test ('check there is a drop down nav bar',()=>{
    let dropNavBar = document.getElementsByClassName("settings-menu");
    expect (dropNavBar).toBeTruthy();
})

test ('check there is a stories section',()=>{
    let stories = document.getElementsByClassName("story-gallery");
    expect (stories).toBeTruthy();
})

test ('check dark button exists',()=>{
    let button = document.getElementById("dark-btn");
    expect (button).toBeTruthy();
})

test ('check there is a button to get gif from Giphy',()=>{
    let gifButton = document.getElementById("giphyButton");
    expect (gifButton).toBeTruthy();
})

test ('check there is a form container for new posts ',()=>{
    let newPostContainer = document.getElementById("postform");
    expect (newPostContainer).toBeTruthy();
}) 

test ('check there are filler posts on page ',()=>{
    let fillerPost = document.getElementsByClassName("post-container")
    expect (fillerPost).toBeTruthy();
})

test ('check there is a text link to see to all posts',()=>{
    let allPostLink = document.getElementsByClassName("allposts");
    expect (allPostLink).toBeTruthy();
})

test ('check there is a comment section',()=>{
    let commentSection = document.getElementsByClassName("commentsArea");
    expect (commentSection).toBeTruthy();
})

test ('check there are three reaction buttons - LIKE',()=>{
    let reactLike = document.getElementsByClassName("fas fa-thumbs-up like__btn");
    expect (reactLike).toBeTruthy();
})

test ('check there are three reaction buttons - DISLIKE',()=>{
    let reactDislike = document.getElementsByClassName("fas fa-thumbs-down dislike__btn");
    expect (reactDislike).toBeTruthy();
})
