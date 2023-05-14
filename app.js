const express = require("express");// used for building server
const mongoose = require("mongoose");// used for connectiong to db
const router = require("./routes/book-routes");// for spectfiying which method does what
const cors = require("cors");// cross origin access 

const app = express();// creating server


app.use(express.json());// Middlewares// converts data in human readebale form 
app.use(cors());
app.use("/books", router); // localhost:5000/books

app.use(express.static("client/build"));
const path = require("path"); 
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));})

mongoose
  .connect(
    "mongodb+srv://himanshumate2017:bigfan@cluster0.gptsyev.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
