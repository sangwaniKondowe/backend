'use strict'

const express = require('express')

const application = require('../Controllers/appController').sending_application
const count = require('../Controllers/appController').countAll
const details = require('../Controllers/appController').allWithDetails
const shortlist =  require('../Controllers/appController').markComplete 
<<<<<<< HEAD
const countSh = require('../Controllers/appController').countAllShortlisted 
=======
const history = require('../Controllers/appController').prevBen 
const add = require('../Controllers/appController').addBeneficiary
const getAllShortlisted = require('../Controllers/appController').statusComplete
const countAllShortlisted = require('../Controllers/appController').countAllShortlisted
>>>>>>> f4a870acfd7a6505d20c6afa9369bb82fe360b68

const router = express.Router()


router.post('/send_application', application)
router.get('/countAll', count)
router.get('/countAllShortlisted', countAllShortlisted)
router.get('/allApplications', details)
router.get('/markComplete', shortlist)
router.get('/getShort', countSh)

router.get('/statusComplete', getAllShortlisted)
 
router.get('/getBeneficiaries',require('../Controllers/appController').beneficiaries)

<<<<<<< HEAD
router.get('/add', require('../Controllers/appController').addBeneficiary)
=======
router.get('/prev', require('../Controllers/appController').prevShortlisted)
router.post('/addBen/:regNumber', add)
>>>>>>> f4a870acfd7a6505d20c6afa9369bb82fe360b68

module.exports = router