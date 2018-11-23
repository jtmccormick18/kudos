const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Create a new Task Schema to map Mongo documents to an object in our node application
 */
var KudosSchema = new Schema({
  title:{
      type:String,
      trim:true,
      required:'Must title your Kudo'
  },
  body:{
      type:String,
      trim:true,
      required:'Kudos must have a message'
  },
  sender_name:{
      type:String,
      trim:true,
      required:'Must Have a Sender'
  },
  receiver_name:{
    type:String,
    trim:true,
    required:'Must Have a Reciever'
  }

});

const Kudos = mongoose.model("Kudos", KudosSchema);

module.exports = Kudos;