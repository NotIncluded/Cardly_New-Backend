const express = require('express')
const router = express.Router()

const coverhomepage = require('./cover_get/cover_homepage')
const coverflashcard = require('./cover_get/cover_myflashcard')

router.use('/', coverhomepage)
router.use('/', coverflashcard)

module.exports = router