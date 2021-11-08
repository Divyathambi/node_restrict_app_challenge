const mongoose = require('mongoose');

// create a schema to define the structure of the database 
const Schema = mongoose.Schema;

// initialize a variable for storing Schema for restricted app details
// data stored in database: 
// 1) id (Automatically given by database)
// 2) timings - A list that holds objects that contains attributes: DateTime StartTime, DateTime endTime, list days, boolean isWeekday
// 3) restricted_apps - This attributes holds a list of objects: String app_name, String app_url, DateTime weekdays_time, DateTime weekend_time 

// i) Define a TimingSchema to set Timings

const TimingSchema = new Schema({
    startTime: String, 
    endTime: String, 
    days: [String], 
    isWeekday: Boolean
}); 

// ii) Define a schema to store restricted apps

const AppSchema = new Schema({
    appName: String, 
    appUrl: String, 
    weekdaysTime: String, 
    weekendsTime: String, 
});


const RestrictAppSchema = new Schema({
    // _id: Schema.Types.ObjectId, 
    timings: [TimingSchema], 
    restrictedApps: [AppSchema]
});

const RestrictedApp = mongoose.model('restrictedApp', RestrictAppSchema); 

module.exports = RestrictedApp; 