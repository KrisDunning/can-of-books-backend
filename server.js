'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
// const axios=require('axios');
const PORT = process.env.PORT || 3001;
const mongoose= require('mongoose');
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

app.get('/test', (request, response) => {
  
  response.status(200).send('test request received')
  
})

app.get('*'),(request,response)=>{
  response.status(404).send('Sorry Books Not Found! Might I reccomend the local library.');
};




app.listen(PORT, () => console.log(`listening on ${PORT}`));
