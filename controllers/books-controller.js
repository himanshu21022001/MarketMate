const Book = require("../model/Book");
//async and await allows a program to run a function without freezing the entire program
const getAllBooks = async (req, res, next) => {
//Middleware functions are functions that have access to the request object (req),the response object (res),
//and the next function in the application’s request-response cycle. The next function is a function
//in the Express router which, when invoked, executes the middleware succeeding the current middleware.
  let books;//let is used to declare a block scoped variable.
  try {//try allows you to define a block of code to be tested for errors while it is being executed.
    books = await Book.find();//await makes a function wait for a Promise
    // A Promise in Node means an action which will either be completed or rejected. In case of
    // completion, the promise is kept and otherwise, the promise is broken
  } catch (err) {//catch statement allows you to define a block of code to be executed, if an error occurs in the try block
    console.log(err); 
  }
  if (!books) {
    return res.status(404).json({ message: "No products found" });//not found
  }
  return res.status(200).json({ books });//ok code i.e request was sucessful
};

const getById = async (req, res) => {
  const id = req.params.id;//object containing properties mapped to the named route “parameters”
  let book;
  try {
    book = await Book.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "No Book found" });
  }
  return res.status(200).json({ book });
};

const addBook = async (req, res) => {
  const { name, author, description, price, available, image } = req.body;
  let book;
  try {
    book = new Book({//structure of book
      name,
      author,
      description,
      price,
      available,
      image,
    });
    await book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(500).json({ message: "Unable To Add" });//server encountered an unexpected condition that 
    //prevented it from fulfilling the request(500)
  }
  return res.status(201).json({ book });
};

const updateBook = async (req, res, next) => {
  const id = req.params.id;
  const { name, author, description, price, available, image } = req.body;
  let book;
  try {
    book = await Book.findByIdAndUpdate(id, {
      name,   
      author,
      description,
      price,
      available,
      image,
    });
    book = await book.save();
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json({ book });
};

const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
};

exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
