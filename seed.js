'use strict'

require('dotenv').config();
const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URL);
const Book=require('./models/book.js');

async function seed(){

  await Book.create({
    title:'Fellowship of the ring',
    description:'Hobbits vs the world',
    status:'Awesome, 5 stars'
  });
  console.log('Fellowship of the ring was seeded');

  await Book.create({
    title:'Hitchhikers Guide to the Galaxy',
    description:'Arthur\'s Adventures in space',
    status:'Awesome, 42 stars'
  });
  console.log('Hitchhikers Guide to the Galaxy was seeded');


  await Book.create({
    title:'Starship Troopers',
    description:'Alien bugs are nasty',
    status:'Rico\'s Renegades'
  });
  console.log('Starship Troopers was seeded');
  mongoose.disconnect();

};

seed();