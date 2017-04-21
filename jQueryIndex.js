$.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`, function(object) {
    let arr = object.results;
    getDetailsFromAPI(arr);
})

function getDetailsFromAPI(arr) {
    let promises = arr.map((movie, index) => {
        return $.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${key}&language=en-US`, function(id) {
            arr[index].runtime = id.runtime;
            return arr[index];
        })
        $.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${key}`, function() {
            arr[index].cast = [];
            arr[index].crew = [];
            arr[index].cast[0] = movieCastCrewData.cast[0].name;
            arr[index].cast[1] = movieCastCrewData.cast[1].name;
            arr[index].cast[2] = movieCastCrewData.cast[2].name;
            arr[index].cast[3] = movieCastCrewData.cast[3].name;
            arr[index].crew[0] = movieCastCrewData.crew[0].name;
            return arr[index];
        });
    });
    Promise.all(promises).then(placeInTemplate);
}

//putting data into the html

let source = document.querySelector("#movies-now-playing-list").innerHTML;
let template = Handlebars.compile(source);

function placeInTemplate(movies) {
    let html = movies.map(obj => template(obj)).join('');
    let destination = document.querySelector('.handlebars-demo');
    destination.innerHTML = html;
}
