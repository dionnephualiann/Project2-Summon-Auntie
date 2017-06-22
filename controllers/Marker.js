// Marker controller
const uuidV4 = require('uuid/v4');

//Create marker
const Marker = require('../models/marker');

// Add marker
exports.placeMarker = (req, res) => {
 // send req to server to create marker
 // server creates marker and pushes it into database
 // if u click place marker, the function should call the route to
 // to place marker
  return req.user.id;
  // Create Marker
    let marker1 = new Marker ({
       longitude: req.marker.longitude,
       latitude: req.marker.latitude,
       uuid: uuidv4()
    })
    marker1.save();

};



//getting the marker ID
exports.markerId = (req, res) => {
  if (req.marker) {
    console.log(marker.uuid);
  }
};
