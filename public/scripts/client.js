/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const _createTweetElement = (tweet) => {
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

const _renderTweets = (tweets) => {
  for(const tweet of tweets) {
    _createTweetElement(tweet);
  }
}
const loadTweets = () => {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/tweets/",
    success: (success) => {
      _renderTweets(success);
    },
    error: (error) => {
      console.log("GET error");
      console.log(error);
    }
  });
};
const submitTweet = (urlEncodedData) => {
  $.ajax({
    type: "POST",
    url: "http://localhost:8080/tweets/",
    data: urlEncodedData,
    success: (success) => {
      loadTweets();
    },
    error: (error) => {
      console.log("error");
      console.log(error);
    }
  });
}
$(document).ready(() => {
  loadTweets();
  $("#frmTweets").submit(function (evt) {
    evt.preventDefault();
    submitTweet($(this).serialize());
  });
});
