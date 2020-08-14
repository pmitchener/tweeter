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
// This should be called createTweetElement
const createTweetElement = (tweet) => {
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
        <div>${getDisplayDate(parseInt(escape(tweet.created_at)))}</div>
        <div class="tweet-icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>
      </div>
    </footer>
  </article> 
  `;
  return html;
};
// this one you don't need
/*const createTweetElement = (tweet) => {
  $("#tweets").append(getTweetFormat(tweet));
};*/
//this function will add the new tweet to the top of the page.
const prependTweet = (tweet) => {
  //console.log("prependTweet");
  //console.log(tweet);
  $("#tweets").prepend(createTweetElement(tweet));
};
//this method will sort tweets by dates from latest.
const sortTweets = (tweets) => {
  return tweets.sort((obj1, obj2) => {
    return obj1.created_at - obj2.created_at;
  });
};
const renderTweets = (tweets) => {
  // not necessary if you used prepend
  //const sortedTweets = sortTweets(tweets);
  for (const tweet of tweets) {
    // $("#tweets").prepend(_createTweetElement(tweet));
    prependTweet(tweet);
  }
};
const loadTweets = () => {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/tweets/",
    success: (success) => {
      renderTweets(sortTweets(success));
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
      renderTweets([success]);
    },
    error: (error) => {
      console.log("error");
      console.log(error);
    }
  });
};
const formValidation = (frm) => {
  const errorBox = $(frm).parent().children(".tweet-submit-error");
  errorBox.slideUp();
  if (!$(frm).children("#tweet-text").val() || $(frm).children("#tweet-text").val().length === 0) {
    errorBox.children("span").text("Your tweet is empty.");
    errorBox.slideDown();
    return false;
  }
  if ($(frm).children("#tweet-text").val().length > maxCharCount) {
    errorBox.children("span").text(`Your tweet is over ${maxCharCount}. Please modify tweet.`);
    errorBox.slideDown();
    return false;
  }
  return true;
};
$(document).ready(() => {
  loadTweets();
  $("#frmTweets").submit(function(evt) {
    evt.preventDefault();
    if (!formValidation($(this))) {
      return;
    }
    submitTweet($(this).serialize());
    $(this).children("#tweet-text").val('');
  });
});
