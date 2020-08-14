const togleTweetInput = () => {
  $(".new-tweet").slideToggle();
};
$(document).ready(() => {
  $(window).scroll(() => {
    if ($(window).scrollTop() > 100) {
      $(".scrollUpButton").removeClass("hide-scrollUpButton");
    }
  });
  $(".scrollUpButton").click(function() {
    $(window).scrollTop(0);
    $(this).addClass("hide-scrollUpButton");
  });
  $(".new-tweet-button").click(function() {
    togleTweetInput();
  });
  $(".new-tweet-down-arrow").click(function() {
    togleTweetInput();
  });
});