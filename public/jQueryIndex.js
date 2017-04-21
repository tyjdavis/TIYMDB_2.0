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
    console.log(movies);
    placeInTemplate(movies);
    // getDetailsFromAPI(arr);
});

// function getDetailsFromAPI(arr) {
//     let promises = arr.map((movie, index) => {
//         return $.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${key}&language=en-US`, function(id) {
//             arr[index].runtime = id.runtime;
//             return arr[index];
//         })
//         $.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${key}`, function() {
//             arr[index].cast = [];
//             arr[index].crew = [];
//             arr[index].cast[0] = movieCastCrewData.cast[0].name;
//             arr[index].cast[1] = movieCastCrewData.cast[1].name;
//             arr[index].cast[2] = movieCastCrewData.cast[2].name;
//             arr[index].cast[3] = movieCastCrewData.cast[3].name;
//             arr[index].crew[0] = movieCastCrewData.crew[0].name;
//             return arr[index];
//         });
//     });
//     Promise.all(promises).then(placeInTemplate);
// }

//putting data into the html

let source = document.querySelector("#movies-now-playing-list").innerHTML;
let template = Handlebars.compile(source);

function placeInTemplate(movies) {
    let html = movies.map(obj => template(obj)).join('');
    let destination = document.querySelector('.handlebars-demo');
    destination.innerHTML = html;
}
