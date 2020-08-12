/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const testTweet =  [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];
const createTweetElement = (tweet) => {
  let dt = new Date(tweet.created_at);
  let html = `
    <article class="tweet">
    <header class="tweet-header">
      <div class="tweet-header-avatar">
        <div class="avatar-image"><img src="${tweet.user.avatars}"></div>
        <div class="avatar-name"><span>${tweet.user.name}</span></div>
      </div>
      <div><span class="avatar-handle">${tweet.user.handle}</span></div>
    </header>
    <p class="tweet-text">${tweet.content.text}</p>
    <footer class="tweet-footer">
      <div class="tweet-footer-line"></div>
      <div class="tweet-footer-bottom-row">
        <div>${getDisplayDate(tweet.created_at)}</div>
        <div class="tweet-icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>
      </div>
    </footer>
  </article> 
  `;
  $("#tweets").append(html);
};

const renderTweets = (tweets) => {
  for(const tweet of tweets) {
    createTweetElement(tweet);
  }
}
$(document).ready(() => {
  //renderTweets(testTweet);
  $("#frmTweets").submit(function (evt) {
    evt.preventDefault();
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/tweets/",
      data: $(this).serialize(),
      success: (success) => {
        console.log("success");
        //console.log(success);
        $.ajax({
          type: "GET",
          url: "http://localhost:8080/tweets/",
          success: (success) => {
            console.log("GET success");
            renderTweets(success);
          },
          error: (error) => {
            console.log("GET error");
            console.log(error);
          }
        });
      },
      error: (error) => {
        console.log("error");
        console.log(error);
      }
    });
    console.log("form submit");
  });
});
