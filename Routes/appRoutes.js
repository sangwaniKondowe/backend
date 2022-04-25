'use strict'

const express = require('express')

const application = require('../Controllers/appController').sending_application
const count = require('../Controllers/appController').countAll
const details = require('../Controllers/appController').allWithDetails
const shortlist =  require('../Controllers/appController').markComplete 
const history = require('../Controllers/appController').prevBen 

const router = express.Router()


router.post('/send_application', application)
router.get('/countAll', count)
router.get('/allApplications', details)
router.get('/markComplete', shortlist)
router.get('/getPrev', history)

router.get('/statusComplete', require('../Controllers/appController').statusComplete)
 
// router.post('/overrideSelection/:uuid', validateToken, preAuthorize('ADMIN') ,require('../Controllers/appController').overrideSelection)

router.get('/prev', require('../Controllers/appController').prevShortlisted)

module.exports = router