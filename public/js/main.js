let map, reportAunties = false;
let markers = [];
const image = '/images/DropPin.png';


if (window.location.hash == '#_=_'){
    history.replaceState
        ? history.replaceState(null, null, window.location.href.split('#')[0])
        : window.location.hash = '';
}


// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  // Need to first tell the server to delete all our markers
  $.ajax({
    url: '/api/markers',
    type: 'DELETE'
  }).done(() => {
    // Once the server has deleted its markers we can delete them locally as well
    clearMarkers();
    markers = [];
  });
}

function placeMarker(location, isUser) {
  // creating marker to Post to database
  $.ajax({
    url: '/api/markers',
    data: JSON.stringify({ marker: location, isUser}),  //had issues with Ajax jQuery by issuing as form-data.
    type: 'POST',
    contentType: 'application/json' // force to prcess as jSon.
  }).done((response) => {
    console.log('Successfully created marker');
    console.log(response);
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: image,
    });
    markers.push(marker);
  });
}

function locationSuccess(position) {
  console.log('Location success');
  // Get the current location of the user
  const current = { lat: position.coords.latitude, lng: position.coords.longitude };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: current
  });

  placeMarker(current, true);

  // Retrieve the list of all markers that the user can see
  $.get('/api/markers')
    // Wait for the server to response with a list of markers
    .done((res) => {
      console.log(res);
      // For each of the markers that is returned we will add them to the markers array
      res.forEach(m => {
        markers.push(new google.maps.Marker({
          map,
          // The lat and lng are nested in the markersArray so we need to extract it
          position: m.markersArray[0],
          icon: image
        }));
      });
    });

  // Adds the event handler to listen for mouse clicks on the map
  map.addListener('click', function (event) {
    // Only place markers if we are in reporting mode
    if (reportAunties) {
      placeMarker(event.latLng, false);
    }
  });
}


function locationError() {
  console.log('Cound not get location');
}

// Get user location
function initMap() {
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
}


// browser on load, RUN all these :
$(document).ready(function () {

  const $freeAuntieBtn = $('#free-auntie > .btn');
  const $reportAuntieBtn = $('#add-auntie > .btn');

  // Clear Markers
  $freeAuntieBtn.click(function (e) {
    console.log('delete auntie');
    deleteMarkers();
    $freeAuntieBtn.hide();
    $reportAuntieBtn.show();
    reportAunties = false;
  });

  // Place Markers
  $reportAuntieBtn.click(function() {
    $freeAuntieBtn.show();
    $reportAuntieBtn.hide();
    reportAunties = true;
  });
});

// ------------------- Real Time Chat ---------------------
