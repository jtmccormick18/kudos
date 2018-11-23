const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-email')

/**
 * Create a new Task Schema to map Mongo documents to an object in our node application
 */
var UsersSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is Required"
  },
  kudos:{
    type:Schema.Types.ObjectId,
    ref:'Kudos'
  }
  

});

const Users = mongoose.model("User", UsersSchema);

module.exports = Users;