'use strict';

const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  content: {type:String, required: true},
});

module.exports = mongoose.model('note', noteSchema);
