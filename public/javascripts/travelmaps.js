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
        zoom: 2,
        center: {lat: 28, lng: 0},
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
      var places = $("#list .place-rows");
      if (places.length){
        console.log("there are places!");
        places.each(function (){
          var id = $(this).attr('id');
          var name = $(this).children('.name').text();
          var coords = JSON.parse($(this).children('.hiddenCoords').text());
          var seen = $(this).find('.seen').length ? true : false;
          addPlacetoMap(id, name, coords, seen);
        });
      } else {
        console.log("no places...");
      }
    }

  var addPlacetoMap = function(id, name, coords, seen) {
    var mapcoords = {"lat":coords.lat, "lng":coords.lng};
    var ops = {
      position: mapcoords,
      map: map,
      title: name,
      animation: google.maps.Animation.DROP
    };
    if (seen) {
      console.log("yes");
      ops.icon = '/images/markerSeen.png';
    }
    var marker = new google.maps.Marker(ops);
    addedPlaces[id] = {marker: marker};
    continentNum[continents[coords.short_name]] += 1;
    updatePlaceCount(1);
  }

  var updatePlaceCount = function(num) {
    var countEl = $(".visitTotal");
    var curr = countEl.text().split(' ');
    var num = (parseInt(curr[0])) + num;
    if (num == 1) {
      countEl.text("1 place");
    } else {
      countEl.text(num+" places");
    }
  }

  var updateVisitCount = function(num) {
    var countEl = $('.visitCount');
    var count = parseInt(countEl.text());
    countEl.text(count + num);
  };

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
            form.trigger('reset');
            addPlacetoList(data);
          }
        }
      });
    });

    $("#list")
    .on("click", ".deletePlace", addDeleteListener)
    .on("click", ".place_visited", function(){
      console.log("clicked");
      var id = $(this).closest('.place-rows').attr('id');
      console.log("id: "+id);
      var el = $(this);
      $.ajax({
        type: "POST",
        url: "/places/" + id + "/visit",
        data: {},
        success: function (data) {
          if (data == "NOTOK") {
            console.log("it didnt work!!");
          } else {
            console.log("it worked!!!"+data);
            toggleSeen(el.children('.visitedStatus'));
            var marker = addedPlaces[id].marker;
            if (marker.getIcon()) {
              marker.setIcon();
            } else {
              marker.setIcon('/images/markerSeen.png');
            }
          }
        }
      });
    });
  }

  var toggleSeen = function(status) {
    status.toggleClass("seen");
    statusTXT = status.children('span');
    if (statusTXT.text() == "Visited") {
      statusTXT.text("Unvisited");
      updateVisitCount(-1);
    } else {
      statusTXT.text("Visited");
      updateVisitCount(1);
    }
  }

  var deletePlaceFromList = function(place) {
    $('#'+place.id).remove();
    var marker = addedPlaces[place.id].marker;
    marker.setMap(null);
    updatePlaceCount(-1);
    if (place.visited){
      updateVisitCount(-1);
    }
    delete addedPlaces[place.name];
  }

  var addPlacetoList = function (place) {
    $("#list").append(renderPlaceTr(place));
    var coords = JSON.parse(place.coords);
    coords.lat = Number(coords.lat);
    coords.lng = Number(coords.lng);
    console.log(coords.lat);
    addPlacetoMap(place.id, place.name, coords, false);
  }

  var renderPlaceTr = function (place) {
    return `<tr id="${place.id}">
    <td class="name">${place.name}</td>
    <td class="place_visited" id="${place.id}">
      <span class="label visitedStatus"><span>Unvisited</span>
    </td> 
    <td><a href="/places/${place.id}" class="deletePlace">Delete</a></td>
    <td class="hiddenCoords">${place.coords}</td>
    </tr>`;
  }

  var addDeleteListener = function(e) {
      e.preventDefault();
      console.log("delete clicked!!");
      $.ajax({
        type: "DELETE",
        url: $(this).attr('href'),
        data: "",
        success: function (data) {
          if (data) {
            console.log(data);
            console.log("deleted!!");
            deletePlaceFromList(data);
          } else {
            console.log("wat");
          }
        }
      });
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