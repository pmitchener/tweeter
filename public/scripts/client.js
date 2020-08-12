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

//this method will sort tweets by dates from latest. 
const _sortTweets = (tweets) => {
  return tweets.sort((obj1, obj2) => {
    return obj2.created_at - obj1.created_at;
  });
};
const _renderTweets = (tweets) => {
  const sortedTweets = _sortTweets(tweets);
  console.log(sortedTweets);
  for(const tweet of sortedTweets) {
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
    if ( !$(this).children("#tweet-text").val() || $(this).children("#tweet-text").val().length === 0) {
      alert("Your tweet is empty.");
      return;
    }
    if ( $(this).children("#tweet-text").val().length > maxCharCount) {
      alert(`Your tweet is over ${maxCharCount}. Please modify tweet.`);
      return;
    }
    
    $("#tweets").empty();//clear all tweets on page
    submitTweet($(this).serialize());
  });
});
