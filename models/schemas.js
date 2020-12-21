var globals = require('../config/globals')
const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect(globals.db, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("yay")
});

const SongSchema = new mongoose.Schema({
    s_name: String,
    a_name: String,
    artist: String,
    year: Number
  });

  module.exports = mongoose.model('Song', SongSchema)