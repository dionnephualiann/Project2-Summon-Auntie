const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
  markersArray: [{
    lng: Number,
    lat: Number
  }],
  user: String,
  isUser: Boolean
},
{ timestamps: true
});

module.exports = markerSchema;
