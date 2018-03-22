
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose



const authorSchema = new Schema({
  email: { type: String },
  username: { type: String },
  password: { type: String }
});


// Export Module/Schema
module.exports = mongoose.model('authors', authorSchema);
