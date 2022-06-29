'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
// const axios=require('axios');
const PORT = process.env.PORT || 3002;
const mongoose= require('mongoose');
const Book=require('./models/book.js');



// connect Mongoose to our MongoDB
mongoose.connect(process.env.MONGO_URL);
// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

app.get('/', (request,response)=>{
  response.status(200).send('Connected to Heroku Can of Books Home Page');
});

app.get('/books', getBooks);
app.post('/books',postBooks);
app.delete('/books/:id',deleteBooks);

async function getBooks(request,response){

  try {
    let results= await Book.find();
    response.status(200).send(results);
  } catch (error) {
    response.status(error.status).send(error.message);
  }

};

async function postBooks(request,response){

    try{
      console.log(request.body);
      let createdBook= await Book.create({
        title:request.body.title,
        description:request.body.description,
        status:request.body.status,
      });
      console.log('Book created: ',createdBook);
      response.status(200).send(createdBook);
    }catch(error){
      console.log(error);
      response.status(500).send('Book creation failed. Try Again.');
    }
};

async function deleteBooks(request,response){
  let id=request.params.id;
  console.log('ID to delete', id);
  try {
    await Book.findByIdAndDelete(id);
    response.status(200).send('Book Deletion Successful');
  } catch (error) {
    response.status(500).send(error.message);
  }
};

app.get('/test', (request, response) => {
  
  response.status(200).send('test request received')
  
})

app.get('*'),(request,response)=>{
  response.status(404).send('Sorry Books Not Found! Might I reccomend the local library.');
};




app.listen(PORT, () => console.log(`listening on ${PORT}`));
