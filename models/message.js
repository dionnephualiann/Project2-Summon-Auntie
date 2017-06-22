const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  messageArray: [{
   uuid: Number
  }],
  reference: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true
})

module.exports = messageSchema;
