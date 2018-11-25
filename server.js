const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI);
} else{
  mongoose.connect('mongodb://localhost/kudos_db', { useNewUrlParser: true });
}

var db=mongoose.connection;


require('./routes/api-routes')(app);
require('./routes/html-routes')(app);


db.on('error',function(err){
  console.log('Mongoose Error: ',err);
})
db.once('open',function(){
  console.log('Mongoose connection successful');
})
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});