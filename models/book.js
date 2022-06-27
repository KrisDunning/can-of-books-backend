'use strict'

const mongoose=require('mongoose');

const {Schema}= mongoose;

const bookSchema= new Schema({
  title:{type:String,required:true},
  description:{type:String,required:true},
  status:{type:String,required:true}
});

const bookModel = mongoose.model('Book',bookSchema);

module.exports= bookModel;