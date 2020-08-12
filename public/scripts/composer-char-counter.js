const maxCharCount = 140;//limit of charactero count in tweet input.
$(document).ready(() => {
  $("#tweet-char-count").val(maxCharCount);
  $("#tweet-text").keydown(function() {
    const currentCount = this.value.length;
    const objCounter = $(this).parent().children('div').children('.counter');
    objCounter.val(maxCharCount - currentCount);
    if (currentCount > maxCharCount) {
      objCounter.addClass('counter-over-flow');
    } else {
      objCounter.removeClass('counter-over-flow');
    }
  });
});