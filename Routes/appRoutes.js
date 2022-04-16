'use strict'

const express = require('express')

const application = require('../Controllers/appController').sending_application
const count = require('../Controllers/appController').countAll

const router = express.Router()


router.post('/send_application', application)
router.get('/countAll', count)
// router.get('/getall',require('../Controllers/appController').getall)
// router.get('/markComplete', require('../Controllers/appController').markComplete)
// router.get('/statusComplete', require('../Controllers/appController').statusComplete)
 
// router.post('/overrideSelection/:uuid', validateToken, preAuthorize('ADMIN') ,require('../Controllers/appController').overrideSelection)
// router.get('/allApplications', require('../Controllers/appController').allWithDetails)
// router.get('/all_applications',validateToken, preAuthorize('ADMIN'), require('../Controllers/appController').pendingApp)

module.exports = router