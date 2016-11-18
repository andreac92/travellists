var travelMaps = (function () {
  var addedPlaces = {};
  var map = null;
  var autocomplete = null;
  var continentNum = {
    "North America": 0,
    "South America": 0,
    "Africa": 0,
    "Asia": 0,
    "Europe": 0,
    "Australia": 0
  };

  var continentCount = function(shortName){
    continentNum[shortName] += 1;
  }

  var initMap = function() {
      console.log("rendering...");
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1,
        center: {lat: 0, lng: 0},
        mapTypeControl: false,
        streetViewControl: false,
        panControl: false,
        styles: travelMapsStyle
      });
     getPlaces();
     setListeners();
     autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('place_name')), { types: ['geocode']} );
     autocomplete.addListener('place_changed', onPlaceChanged);
   }

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

  var getPlaces = function() {
      var places = $("#list > div");
      if (places.length){
        console.log("there are places!");
        places.each(function (){
          var id = $(this).attr('class');
          var coords = JSON.parse($(this).children('.hiddenCoords').text());
          addPlacetoMap(id, coords);
        });
        console.log(addedPlaces);
        console.log("cont counts: "+JSON.stringify(continentNum));
      } else {
        console.log("no places...");
      }
    }

  var addPlacetoMap = function(id, coords) {
    var mapcoords = {"lat":coords.lat, "lng":coords.lng};
    var marker = new google.maps.Marker({
      position: mapcoords,
      map: map,
      title: id,
      animation: google.maps.Animation.DROP
    });
    addedPlaces[id] = {coords: coords, marker: marker};
    continentNum[continents[coords.short_name]] += 1;
  }

  var setListeners = function() {
    $("#submit > input").click(function(e) {
      e.preventDefault();
      console.log("clicked!!");
      var form = $("#new_place");
      $.ajax({
        type: "POST",
        url: form.attr("action"),
        data: form.serialize(),
        success: function (data) {
          if (data == "NOTOK") {
            console.log("it didnt work!!");
          } else {
            console.log("it worked!!!"+data);
            addPlacetoList(data);
          }
        }
      });
    });

    $(".deletePlace").click(function(e) {
      e.preventDefault();
      console.log("delete clicked!!");
      $.ajax({
        type: "DELETE",
        url: $(this).attr('href'),
        data: "",
        success: function (data) {
          if (data) {
            console.log("deleted!!");
            deletePlaceFromList(data);
          } else {
            console.log("wat");
          }
        }
      });
    })
  }

  var deletePlaceFromList = function(place) {
    $('.'+place.name).remove();
    
  }

  var addPlacetoList = function (place) {
    $("#list").append(renderPlaceDiv(place));
    var coords = JSON.parse(place.coords);
    coords.lat = Number(coords.lat);
    coords.lng = Number(coords.lng);
    console.log(coords.lat);
    addPlacetoMap(place.name, coords);
  }

  var renderPlaceDiv = function (place) {
    return '<div class="'+place.name+'"><span class="hiddenCoords">'+place.coords+'</span><span class="place_visited">'+place.visited+'</span> '+place.name+' <a href="/places/'+place.id+'">Delete</a></div>';
  }


  return { init: initMap };
})();

var travelMapsStyle = [
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape",
    "stylers": [
      {
        "color": "#ff7b9e"
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "labels.text",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];