const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema ({
  latitude: Number,
  longitude: Number,
  userId: String,
  uuid: String

}, {timestamps: true});
