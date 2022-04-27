'use strict'

const express = require('express')

const application = require('../Controllers/appController').sending_application
const count = require('../Controllers/appController').countAll
const details = require('../Controllers/appController').allWithDetails
const shortlist =  require('../Controllers/appController').markComplete 
const countSh = require('../Controllers/appController').countAllShortlisted 

const router = express.Router()


router.post('/send_application', application)
router.get('/countAll', count)
router.get('/allApplications', details)
router.get('/markComplete', shortlist)
router.get('/getShort', countSh)

router.get('/statusComplete', require('../Controllers/appController').statusComplete)
 
router.get('/getBeneficiaries',require('../Controllers/appController').beneficiaries)

router.get('/add', require('../Controllers/appController').addBeneficiary)

module.exports = router