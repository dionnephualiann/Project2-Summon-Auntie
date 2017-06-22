var map, markers
var image = '/images/DropPin.png';

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// function deleteOne(uuid) {
//   console.log(uuid)
//   console.log(markers.indexOf(uuid))
// }

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}

function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: image,
        uuid: uuidv4()
    });
    markers.push(marker);
  }

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
    map: map
  });

  // socket.emit('newUser', current);
  // socket.on('broadcastLocation', function (data) {
  //   console.log('broadcast Location',data);
    var marker = new google.maps.Marker({
      // position: data,
      map: map
    });
    markers.push(marker);
    map.addListener('click', function(event) {
            placeMarker(event.latLng);
          });
  // });
}

function locationError() {
  console.log('Cound not get location')
}

// Get user location
function initMap() {
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
}


// browser on load, RUN all these :
$(document).ready(function() {
// socket = io.connect(window.location.href, {secure: true, transports: ['websocket']});
  // Listening to Broadcast Markers
  // socket.on('broadcastMessage', function (data) {
  //   console.log(data);
  //   var msg = $('<div>').text(data);
  //   $('#chat').append(msg);
  // });

  // Listening to Broadcast Markers
  // socket.on('broadcastMarker', function (data) {
  //   console.log(data);
  //   console.log('broadcast success')
  //   var marker = new google.maps.Marker({
  //     position: data,
  //     map: map,
  //     icon: image
  //   });
  //   markers.push(marker);
  // });






  // Clear Markers
  $('#free-auntie').on('click', function(e){
    console.log('delete auntie')
    deleteMarkers();
    //console.log($(e.target))
    //deleteOne($(e.target).);
    var auntieFreeButton = document.getElementsByClassName('btn-success')[0];
    auntieFreeButton.style.display = 'none';
    var auntieReportButton = document.getElementsByClassName('btn-danger')[0];
    auntieReportButton.style.display ='block';

    })
  })

 // Add Markers
  $('#add-auntie').on('click', function(e){
    //  addMarkers(location);
        placeMarker();

// creating marker to Post to database
        $.ajax ({
          url: './api/markers',
          type: 'POST',
          data: {
            marker: {
              longitude: location.longitude,
              latitude: location.latitude
            }
          }
          }).done(function(response) {
        console.log(response);
        });


        if ($('#free-auntie') !== 0) {
              google.maps.event.addListener(map, 'click', function(event) {
              console.log('add marker')
              console.log(event)
            //   socket.emit('newMarker', placeMarker(event.latLng))
            });
            google.maps.event.addListener(markers, 'click', function(event){
              console.log('marker')
            })
        }
            // Change of buttons
            var auntieFreeButton = document.getElementsByClassName('btn-success')[0];
            auntieFreeButton.style.display = 'block';
            var auntieReportButton = document.getElementsByClassName('btn-danger')[0];
            auntieReportButton.style.display ='none';

        return location;

// ------------------- Real Time Chat ---------------------

  // (function poll(){
  // setTimeout(function(){
  //   $.ajax({ url: "server", success: function(data){
  //     //Update your dashboard gauge
  //     salesGauge.setValue(data.value);
  //
  //     //Setup the next poll recursively
  //     poll();
  //   }, dataType: "json"});
  // }, 30000);
  // })();

        // // Broadcast Message/ Append Message
        // $('#chat button').on('click', function(e){
        //     e.preventDefault();
        //     var message = $('#chat input').val();
        //     // socket.emit('newMessage', message);
        //     $('#chat input').val('');
        // });
});
