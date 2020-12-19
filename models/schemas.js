const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect(DB_URI, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // Connection Successful!
});

const SongSchema = new mongoose.Schema({
    s_name: String,
    a_name: String,
    artist: String,
    year: Int32
  });