const Movie = function(){

};

Movie.prototype.display = function(){
  let source = document.querySelector("#movies-now-playing-list").innerHTML;
  let template = Handlebars.compile(source);
  let html = template(this)
  let $destination = $('.handlebars-demo');
  $destination.append(html);
  // Each time a movie is displayed, add the click event for YT.
  let $button = $('.YT-button').last();
  $button.on('click', (e)=>{
    // Lightbox appears with YT video.
    let $iFrame = $('#player');
    $iFrame.attr('src', `https://www.youtube.com/embed/${this.YTID}?enablejsapi=1&amp;origin=http%3A%2F%2F127.0.0.1%3A3000&amp;widgetid=1`)
  });
};
