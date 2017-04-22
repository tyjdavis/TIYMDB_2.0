
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

let map;
let infowindow;

function initMap() {

  // Use googles geolocater to find your Long/ Lat
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({}, function(results, status){
    let location = {lat: 28.538336, lng: -81.379234};
    location.lat = results[0].geometry.location.lat();
    location.lng = results[0].geometry.location.lng();

    map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: location,
      radius: 10000,
      type: ['movie theatre']
    }, callback);
  });
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
