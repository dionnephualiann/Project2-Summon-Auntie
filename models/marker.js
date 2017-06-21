const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
  markersArray: [{
    longitude: String,
    latitude: String
  }],
  reference: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true
})

module.exports = markerSchema;
