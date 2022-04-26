'use strict'

const express = require('express')

const application = require('../Controllers/appController').sending_application
const count = require('../Controllers/appController').countAll
const details = require('../Controllers/appController').allWithDetails
const shortlist =  require('../Controllers/appController').markComplete 
const history = require('../Controllers/appController').prevBen 
const add = require('../Controllers/appController').addBeneficiary
const getAllShortlisted = require('../Controllers/appController').statusComplete
const countAllShortlisted = require('../Controllers/appController').countAllShortlisted

const router = express.Router()


router.post('/send_application', application)
router.get('/countAll', count)
router.get('/countAllShortlisted', countAllShortlisted)
router.get('/allApplications', details)
router.get('/markComplete', shortlist)
router.get('/getPrev', history)

router.get('/statusComplete', getAllShortlisted)
 
// router.post('/overrideSelection/:uuid', validateToken, preAuthorize('ADMIN') ,require('../Controllers/appController').overrideSelection)

router.get('/prev', require('../Controllers/appController').prevShortlisted)
router.post('/addBen/:regNumber', add)

module.exports = router