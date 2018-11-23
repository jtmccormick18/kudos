const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

if(process.env.MONGODB_URI){
  mongoose.connect('mongodb://@ds033113.mlab.com:33113/heroku_hgpl7kqd');
} else{
  mongoose.connect('mongodb://localhost/kudos_db', { useNewUrlParser: true });
}



require('./routes/api-routes')(app);
require('./routes/html-routes')(app);


app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});