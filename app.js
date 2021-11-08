const mongoose = require('mongoose'); 
const express = require('express'); 
const morgan = require('morgan'); 
const appRoutes = require('./routes/appRoutes');

// initialize express 
const app = express(); 

// convert the values into json format 
app.use(express.json());
// return value into urlencoded format
app.use(express.urlencoded({ extended: true}));


// register view engine 
app.set('view engine', 'ejs');

// store the URI code to a variable
const dbURI = "mongodb+srv://anonymous_user123:anonymous_123@nodecontrolapp.70o4r.mongodb.net/NodeControlApp?retryWrites=true&w=majority";
// 1) Connect to the database
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then((result) => app.listen(3000))
        .catch((err) => console.log(err)); 

// Middlewares


// HTTP formatter
app.use(morgan('dev')); 

// Routes
app.use(appRoutes);
