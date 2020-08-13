$(document).ready(() => {
  $(window).scroll(() => {
    if ($(window).scrollTop() > 100) {
      $(".scrollUpButton").removeClass("hide-scrollUpButton");
    }
  });
  $(".scrollUpButton").click( function(evt) {
    $(window).scrollTop(0);
    $(this).addClass("hide-scrollUpButton");
  })
  $(".new-tweet-button").click(function() {
    $(".new-tweet").slideToggle();
  });
  $("new-tweet-down-arrow").animate({"top": "-=130px"}, 4000, "linear") ;
  $("new-tweet-down-arrow").animate({"top": "+=130px"}, 4000, "linear") ;

});