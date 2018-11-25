const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var url='mongodb://heroku_hgpl7kqd:o58v666g982u1s1o3kkklvoldj@ds033113.mlab.com:33113/heroku_hgpl7kqd'

if(process.env.MONGODB_URI){
  mongoose.connect(MONGODB_URI,{useNewUrlParser:true});
} else{
  mongoose.connect('mongodb://localhost/kudos_db', { useNewUrlParser: true });
}




require('./routes/api-routes')(app);
require('./routes/html-routes')(app);


app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});