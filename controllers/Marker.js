// Marker controller
//Create marker
const mongoose = require('mongoose');
const Marker = mongoose.model('Marker', require('../models/marker'));

// Add marker
exports.placeMarker = (req, res) => {
 // send req to server to create marker
 // server creates marker and pushes it into database
 // if u click place marker, the function should call the route to
 // to place marker
  // Create Marker with an empty object
    let marker = new Marker({});

    // Add the marker to the markersArray
    marker.markersArray.push(req.body.marker);
    // Add the user id to the marker as well, we don't use the full reference model,
    // because we don't want to return it in the body of the response
    marker.user = req.user.id;

    // Save the marker and wait for it to complete
    marker.save((err, value) => {
      // If there was an error return a 500 status which indicates a server error
      if (err) {
        return res.sendStatus(500);
      }

      // Otherwise return the object as JSON
      res.json(value.toObject());
    });
};

// Delete markers
exports.removeMarkers = (req, res) => {
  // TODO Add the remove logic here
  // delete is set to false until the user clicks
  // remove to remove all marked markers
  let deleted = false;
  // calling the model and deleting the elements from Mongoose DB.
  // Mongo Query: isUser not equal to true - delete all markers
      Marker.remove({ user: req.user.id, isUser: { $ne: true } }
        , function (err) {
        if (err) {
          return res.sendStatus(500);
        } else {
          return res.sendStatus(200);
        }
      })
  return deleted;
};

// Get a list of all the markers
exports.listMarkers = (req, res) => {

  // Find all the markers
  Marker.find().exec((err, docs) => {
    if (err) {
      res.sendStatus(500);
    }

    // Return all the markers
    res.json(docs);
  });
};
