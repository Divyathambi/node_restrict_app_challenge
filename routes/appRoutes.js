const express = require('express'); 
const RestrictedApp = require('../models/RestrictedApps');
const appController = require('../controllers/appControllers');


const router = express.Router(); 


router.get('/', appController.timings_index);

router.post('/add-work-time', appController.add_timings);

router.post('/add-work-time-id/:id', appController.add_timings_by_id);

router.patch('/edit-work-time/:id/:timingId', appController.edit_work_timings);

router.post('/restricted-apps/:id', appController.add_restricted_apps);

router.get('/get-restricted-apps/:id', appController.get_restricted_apps); 
 
router.patch('/edit-restricted-apps-weekdays/:id/:appId', appController.edit_restricted_apps_weekdays);

router.patch('/edit-restricted-apps-weekends/:id/:appId', appController.edit_restricted_apps_weekends);


module.exports = router;