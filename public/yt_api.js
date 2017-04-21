var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
<<<<<<< HEAD
    height: '680',
=======
    height: '600',
>>>>>>> aaf63e5e9ddc7f39e11ac9ccaa4fca2bce5da3e9
    width: '900',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}
