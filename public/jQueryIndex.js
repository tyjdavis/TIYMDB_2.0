// Get the initial list of top movies from moviedb.
$.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${keys.moviedb}&language=en-US&page=1`, function(object){
    let arr = object.results;

    let movies = arr.map((obj)=>{
      let movie = new Movie();
      movie.poster_path = obj.poster_path;
      movie.overview = obj.overview;
      movie.release_date = obj.release_date;
      movie.title = obj.title;
      movie.vote_average = obj.vote_average;
      movie.id = obj.id;
      return movie;
    });

    // Take each movie and get runtime.
    movies = movies.map((movie)=>{
      $.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${keys.moviedb}&language=en-US`, function(data){
        movie.runtime = data.runtime;
      });
      return movie;
    });

    // Take each movie and get cast and crew.
    movies = movies.map((movie)=>{
      $.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${keys.moviedb}`, function(data) {
        movie.cast = data.cast.slice(0, 3);
        movie.cast = movie.cast.map((obj)=> obj.name);
        movie.crew = data.crew[0].name;
      });
      return movie;
    });

    // Take each movie and get youtube ID link
    movies = movies.map((movie)=>{
      $.get(`https://www.googleapis.com/youtube/v3/search?key=${keys.google}&part=snippet&q=${movie.title}}trailer`, function(data){
        movie.YTID = data.items[0].id.videoId;
      });
      return movie;
    });

    movies.forEach((movie)=>{
      movie.display();
    });
});

//putting data into the html

let source = document.querySelector("#movies-now-playing-list").innerHTML;
let template = Handlebars.compile(source);

function placeInTemplate(movies) {
    let html = movies.map(obj => template(obj)).join('');
    let destination = document.querySelector('.handlebars-demo');
    destination.innerHTML = html;
}
