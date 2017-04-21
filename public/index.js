<<<<<<< HEAD:index.js
let nowPlayingFromAPI = fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`)
.then(response => response.json()) //take above promise and convert to json
.then(object => object.results) //taking the results array from the json
.then(getDetailsFromAPI)
=======
try{
  let nowPlayingFromAPI = fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`)
  .then(response => response.json()) //take above promise and convert to json
  .then(object => object.results) //taking the results array from the json
  .then(getDetailsFromAPI)
} catch (err) {
  console.log(err.message);
}
>>>>>>> bf06fafecd91101b38052f88c7d48cc5b8069232:public/index.js


function getDetailsFromAPI (arr) {
let promises = arr.map( (movie, index) => { //map (element that we're iterating over (objects within result), 0-19)
  return fetch (`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${key}&language=en-US`)
  .then(response => response.json())

  .then(movieDetailsData => {
    arr[index].runtime = movieDetailsData.runtime;  //the runtime property of first movie is
    return arr[index];}) //returning the first movie with runtime added to it


  .then(movie => {  //movie from line 15
    return fetch (`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${key}`)
    .then(response => response.json())

    .then(movieCastCrewData => {
      arr[index].cast = [];
      arr[index].crew =[];
      arr[index].cast[0] = movieCastCrewData.cast[0].name;
      arr[index].cast[1] = movieCastCrewData.cast[1].name;
      arr[index].cast[2] = movieCastCrewData.cast[2].name;
      arr[index].cast[3] = movieCastCrewData.cast[3].name;
      arr[index].crew[0] = movieCastCrewData.crew[0].name;
      return arr[index];
    });
  });
});
  Promise.all(promises).then(placeInTemplate); //once map has gone through every item in the array it store it in promises
}


//putting data into the html

let source = document.querySelector("#movies-now-playing-list").innerHTML;
let template = Handlebars.compile(source);

function placeInTemplate (movies) {
      let html = movies.map(obj => template(obj)).join('');
      let destination = document.querySelector('.handlebars-demo');
      destination.innerHTML = html;
}
