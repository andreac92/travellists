var travelMaps = {};

travelMaps.init = (function () {

  var continentNum = {
    "North America": 0,
    "South America": 0,
    "Africa": 0,
    "Asia": 0,
    "Europe": 0,
    "Australia": 0
  }

  var addedPlaces = {};

  var continentCount = function(shortName){
    continentNum[shortName] += 1;
  }

  var getPlaces = function() {
    var places = $("#list > p");
    if (places.length){
      console.log("there are places!");
      addedPlaces = places;
    } else {
      console.log("no places...");
    }
  }

  var addPlacestoMap = function() {
    getPlaces();
    if (addedPlaces) {

    }
  }

  var initMap = function() {
      console.log("rendering...");
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: 41.9, lng: 12.6},
        mapTypeControl: false,
        streetViewControl: false,
        panControl: false
      });
     autocomplete = new google.maps.places.Autocomplete(
      (
          document.getElementById('place_name')), {
        types: ['geocode']
      });

     var onPlaceChanged = function() {
      var place = autocomplete.getPlace();
      console.log(place);
      var coords = place.geometry.location;
      if (coords){
        coords = JSON.parse(JSON.stringify(coords));
        var last = place.address_components.length - 1;
        coords.short_name = (place.address_components)[last].short_name;
        console.log("Location: "+JSON.stringify(coords));
        var coordInput = document.getElementById('coords');
        coordInput.value = JSON.stringify(coords);
      }
     }
     autocomplete.addListener('place_changed', onPlaceChanged);
  }

  return initMap;
})();