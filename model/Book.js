const mongoose = require("mongoose"); 

const Schema = mongoose.Schema;//declaration of schema(structure of database)

// this specefies the structure of books table
const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
  },
  image: {
    type: String,
    required: true,
  },
});

// this creates the model by using the above schema structure
module.exports = mongoose.model("Book", bookSchema);


