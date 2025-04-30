const express = require('express')
const router = express.Router()

const coverhomepage = require('./cover_get/cover_homepage')
const coverflashcard = require('./cover_get/cover_myflashcard')
const coverbookmark = require('./cover_get/cover_mybookmarks')
const ratingFullcoverGet = require('./full/rating_fullcover_get')
const recently = require('./cover_get/cover_recently')

/**
 * @swagger
 * tags:
 *   name: Cover
 *   description: Cover Management Section
 */

router.use('/', coverhomepage)
router.use('/', coverflashcard)
router.use('/', coverbookmark)
router.use('/', ratingFullcoverGet)
router.use('/', recently)
module.exports = router