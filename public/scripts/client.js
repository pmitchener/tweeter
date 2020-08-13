/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//this functio will prevent XSS (Cross Site Scripting) attacks by escaping potentially insecure text.
const escape = (html) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(html));
  return div.innerHTML;
};
//this function will format the tweet to proper html
const _getTweetFormat = (tweet) => {
  let dt = new Date(tweet.created_at);
  let html = `
    <article class="tweet">
    <header class="tweet-header">
      <div class="tweet-header-avatar">
        <div class="avatar-image"><img src="${escape(tweet.user.avatars)}"></div>
        <div class="avatar-name"><span>${escape(tweet.user.name)}</span></div>
      </div>
      <div><span class="avatar-handle">${escape(tweet.user.handle)}</span></div>
    </header>
    <p class="tweet-text">${escape(tweet.content.text)}</p>
    <footer class="tweet-footer">
      <div class="tweet-footer-line"></div>
      <div class="tweet-footer-bottom-row">
        <div>${getDisplayDate(escape(tweet.created_at))}</div>
        <div class="tweet-icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>
      </div>
    </footer>
  </article> 
  `;
  return html;
};
const _createTweetElement = (tweet) => {
  $("#tweets").append(_getTweetFormat(tweet));
};
//this function will add the new tweet to the top of the page.
const prependTweet = (tweet) => {
  console.log("prependTweet");
  console.log(tweet);
  $("#tweets").prepend(_getTweetFormat(tweet));
};
//this method will sort tweets by dates from latest. 
const _sortTweets = (tweets) => {
  return tweets.sort((obj1, obj2) => {
    return obj2.created_at - obj1.created_at;
  });
};
const _renderTweets = (tweets) => {
  const sortedTweets = _sortTweets(tweets);
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
      prependTweet(success);
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
    const errorBox = $(this).parent().children(".tweet-submit-error");
    errorBox.slideUp();
    if ( !$(this).children("#tweet-text").val() || $(this).children("#tweet-text").val().length === 0) {
      errorBox.children("span").text("Your tweet is empty.");
      errorBox.slideDown();
      return;
    }
    if ( $(this).children("#tweet-text").val().length > maxCharCount) {
      errorBox.children("span").text(`Your tweet is over ${maxCharCount}. Please modify tweet.`);
      errorBox.slideDown();
      return;
    }
    submitTweet($(this).serialize());
    $(this).children("#tweet-text").val('');
  });
});
