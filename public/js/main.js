var map, markers
var image = '/images/DropPin.png';

function locationSuccess(position) {
  console.log('Location success')
  var current = {lat: position.coords.latitude, lng: position.coords.longitude};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: current
  });
  markers = [];
  var marker = new google.maps.Marker({
    position: current,
    map: map,
    icon: image
  });

  socket.emit('newUser', current);
  socket.on('broadcast location', function (data) {
    console.log('broadcast location',data);

    var marker = new google.maps.Marker({
      position: data,
      map: map,
      icon: image
    });
    markers.push(marker);
  });
}

function locationError() {
  console.log('Cound not get location')
}

// Get user location
function initMap() {
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
//   infoWindow = new google.maps.InfoWindow;
//
//   if (navigator.geolocation) {
//      navigator.geolocation.getCurrentPosition(function(position) {
//        var pos = {
//          lat: position.coords.latitude,
//          lng: position.coords.longitude
//        };
//
//        infoWindow.setPosition(pos);
//        infoWindow.setContent('Location found.');
//        infoWindow.open(map);
//        map.setCenter(pos);
//      }, function() {
//        handleLocationError(true, infoWindow, map.getCenter());
//      });
//    } else {
//      // Browser doesn't support Geolocation
//      handleLocationError(false, infoWindow, map.getCenter());
//    }
//
//    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//                         'Error: The Geolocation service failed.' :
//                         'Error: Your browser doesn\'t support geolocation.');
//   infoWindow.open(map);
// }
}


// browser on load, RUN all these :
$(document).ready(function() {

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

function deleteMarkers() {
  clearMarkers();
  markers = [];
}

socket = io.connect(window.location.href, {secure: true, transports: ['websocket']});

  socket.on('broadcast message', function (data) {
    console.log(data);

    var msg = $('<div>').text(data);
    $('#chat').append(msg);
  });

  socket.on('broadcast marker', function (data) {
    console.log(data);
    console.log('broadcast success')
    var marker = new google.maps.Marker({
      position: data,
      map: map,
      icon: image
    });
    markers.push(marker);
  });

  $('#chat button').on('click', function(e){
      e.preventDefault();
      var message = $('#chat input').val();
      socket.emit('newMessage', message);
      $('#chat input').val('');
  });

  $('#free-auntie').on('click', function(e){
    console.log('delete auntie')
    deleteMarkers();
    var auntieFreeButton = document.getElementsByClassName('btn-success')[0];
    auntieFreeButton.style.display = 'none';
    var auntieReportButton = document.getElementsByClassName('btn-danger')[0];
    auntieReportButton.style.display ='block';
  })

  $('#add-auntie').on('click', function(e){

    function placeMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: image
        });
        markers.push(marker);

        return location;

    }


    google.maps.event.addListener(map, 'click', function(event) {
      console.log('add marker')
      socket.emit('newMarker', placeMarker(event.latLng))
    });

    var auntieFreeButton = document.getElementsByClassName('btn-success')[0];
    auntieFreeButton.style.display = 'block';
    var auntieReportButton = document.getElementsByClassName('btn-danger')[0];
    auntieReportButton.style.display ='none';

  })

});
