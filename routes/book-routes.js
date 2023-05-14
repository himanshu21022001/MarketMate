const express = require("express"); //importing required libraries
const router = express.Router();
const booksController = require("../controllers/books-controller");
//declaration of functions
router.get("/", booksController.getAllBooks); //function to read the content
router.post("/", booksController.addBook);   //function to create the content
router.get("/:id", booksController.getById); //function to read the content by id
router.put("/:id", booksController.updateBook); //function to update the content
router.delete("/:id", booksController.deleteBook); //function to delete the content
module.exports = router;
