
let arrayOfMovies = [];

function main(){
  getData().then(getRuntimes).then(getCasts).then(getYTs).then(displayMovies);
}

function getData(){
  return $.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${keys.moviedb}&language=en-US&page=1`, function(data){
    arrayOfMovies = data.results.map((obj)=>{
      let movie = new Movie();
      movie.poster_path = obj.poster_path;
      movie.overview = obj.overview;
      movie.release_date = obj.release_date;
      movie.title = obj.title;
      movie.vote_average = obj.vote_average;
      movie.id = obj.id;
      return movie; //take this movie for each iteration and store it in Movie
    });
  });
}

function getRuntimes(){
  return arrayOfMovies.map((movie)=>{
    return $.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${keys.moviedb}&language=en-US`, function(data){
      movie.runtime = data.runtime;
    });
  });
}

function getCasts(){
  return arrayOfMovies.map((movie)=>{
    return $.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${keys.moviedb}`, function(data) {
      movie.cast = data.cast.slice(0, 3);
      movie.cast = movie.cast.map((obj)=> obj.name);
      movie.cast = movie.cast.join(', ');
      movie.crew = data.crew[0].name;
    });
  });
}

function getYTs(){
  return arrayOfMovies.map((movie)=>{
    return $.get(`https://www.googleapis.com/youtube/v3/search?key=${keys.google}&part=snippet&q=${movie.title}}trailer`, function(data){
      movie.YTID = data.items[0].id.videoId;
    });
  });
}

function displayMovies(){
  arrayOfMovies.forEach((movie)=>{
    movie.display();
  });
}

main();
