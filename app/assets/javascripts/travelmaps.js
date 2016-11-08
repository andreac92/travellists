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
  var map;

  var continentCount = function(shortName){
    continentNum[shortName] += 1;
  }

  var getPlaces = function() {
    var places = $("#list > div");
    if (places.length){
      console.log("there are places!");
      places.each(function (){
        var id = $(this).attr('class');
        var coords = JSON.parse($(this).children('span').text());
        addPlacetoMap(id, coords);
      });
      console.log(addedPlaces);
    } else {
      console.log("no places...");
    }
  }

  var addPlacetoMap = function(id, coords) {
    var coords = {"lat":coords.lat, "lng":coords.lng};
    var marker = new google.maps.Marker({
      position: coords,
      map: map,
      title: id
    });
    addedPlaces[id] = {coords: coords, marker: marker};
  }

  var initMap = function() {
      console.log("rendering...");
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: 41.9, lng: 12.6},
        mapTypeControl: false,
        streetViewControl: false,
        panControl: false
      });
      getPlaces();
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
        var coordInput = document.getElementById('place_coords');
        coordInput.value = JSON.stringify(coords);
      }
     }
     autocomplete.addListener('place_changed', onPlaceChanged);
  }

  return initMap;
})();