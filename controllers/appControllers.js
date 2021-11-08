const RestrictedApp = require('../models/RestrictedApps');

// 1) Get Timings 
const timings_index = (req, res) => {
    RestrictedApp.find().then((result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err);
    })
}


// 2) Add new work timings
const add_timings = async (req, res) => {
    var timing = new RestrictedApp({
        timings: req.body.timings.map((timing) => 
        { 
         return {
            startTime: timing.startTime,
            endTime: timing.endTime, 
            days: timing.days, 
            isWeekday: timing.isWeekday
          }
        })
    });

    try {
        const savedTiming = await timing.save();
        res.json(savedTiming);
    } catch (err) {
        res.json({ message: err });
    }
}

// 3) Add new work timings by id
const add_timings_by_id = (req, res) => {
    const id = req.params.id; 

    RestrictedApp.findById(id).then((result) => {
        result.timings.push({
            startTime: req.body.timings[0].startTime, 
            endTime: req.body.timings[0].endTime, 
            days: req.body.timings[0].days, 
            isWeekday: req.body.timings[0].isWeekday
        })
        result.save().then((savedTimings) => {
            res.json(savedTimings); 
        }).catch((err) => {
            console.log(err);
        })
    }).catch((err) => {
        console.log(err);
    })
}

// 4) Edit Work Timings 
const edit_work_timings = (req, res) => {
    const id = req.params.id; 
    const timingId = req.params.timingId 

    RestrictedApp.findByIdAndUpdate(id).then((result) => {
        result.timings.map((timing) => {
            if(timing._id == timingId) {
                timing.startTime =  req.body.timings[0].startTime; 
                timing.endTime = req.body.timings[0].endTime; 
                timing.days = req.body.timings[0].days; 
                timing.isWeekday = req.body.timings[0].isWeekday
            }
        });
        result.save().then((savedResults) => {
            res.json(savedResults);
        }).catch((err) => {
            console.log(err);
        })
    }).catch((err) => {
        console.log(err);
    })
}

// 5) Add restrictedApps to the given id 
const add_restricted_apps = (req, res) => {
    const id = req.params.id; 

    RestrictedApp.findById(id).then((result) => {
        result.restrictedApps.push({
            appName: req.body.restrictedApps[0].appName, 
            appUrl: req.body.restrictedApps[0].appUrl, 
            weekdaysTime: req.body.restrictedApps[0].weekdaysTime, 
            weekendsTime: req.body.restrictedApps[0].weekendsTime, 
        });
        result.save().then((savedApps) => {
            res.json(savedApps); 
        }).catch((err) => {
            console.log(err);
        })
    }).catch((err) => {
        console.log(err);
    })
}

// 6) Get the restricted apps list 
const get_restricted_apps = (req, res) => {
    const id = req.params.id; 

    RestrictedApp.findById(id).then((result) => {
        res.json(result.restrictedApps);
    }).catch((err) => {
        console.log(err);
    })
}

// 7) edit app timings during weekdays
const edit_restricted_apps_weekdays = (req, res) => {
    const id = req.params.id; 
    const appTimingId = req.params.appId; 

    RestrictedApp.findByIdAndUpdate(id).then((result) => {
        result.restrictedApps.map((restrictedApp) => {
            if(restrictedApp._id == appTimingId) {
                restrictedApp.weekdaysTime = req.body.restrictedApps[0].weekdaysTime;
            } 
        }); 

        result.save().then((savedResults) => {
            res.json(savedResults); 
        }).catch((err) => {
            console.log(err); 
        })
    }).catch((err) => {
        console.log(err);
    })
}

const edit_restricted_apps_weekends = (req, res) => {
    const id = req.params.id; 
    const appTimingId = req.params.appId; 

    RestrictedApp.findByIdAndUpdate(id).then((result) => {
        result.restrictedApps.map((restrictedApp) => {
            if(restrictedApp._id == appTimingId) {
                restrictedApp.weekendsTime = req.body.restrictedApps[0].weekendsTime;
            }
        });

        result.save().then((savedResults) => {
            res.json(savedResults);
        }).catch((err) => {
            console.log(err);
        })
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = {
    timings_index,
    add_timings,
    add_timings_by_id,
    edit_work_timings,
    add_restricted_apps,
    get_restricted_apps, 
    edit_restricted_apps_weekdays,
    edit_restricted_apps_weekends
}