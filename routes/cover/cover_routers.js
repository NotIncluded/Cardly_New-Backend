const express = require('express')
const router = express.Router()

const coverhomepage = require('./cover_get/cover_homepage')
const coverflashcard = require('./cover_get/cover_myflashcard')
const coverbookmark = require('./cover_get/cover_mybookmarks')
const ratingFullcoverGet = require('./full/rating_fullcover_get')

router.use('/', coverhomepage)
router.use('/', coverflashcard)
router.use('/', coverbookmark)
router.use('/', ratingFullcoverGet)

module.exports = router