const express = require('express')
const router = express.Router()

// Import routes
const ratingFullcoverGet = require('./rating_fullcover_get/rating_fullcover_get')
//const ratingGet = require('./rating_get/rating_get')
const ratingPost = require('./rating_post/rating_post')

/**
 * @swagger
 * tags:
 *   name: Rating
 *   description: Rating Management Section
 */

// Use the imported routers for their respective routes
router.use('/', ratingFullcoverGet) // This will handle the GET request for fullcover
//router.use('/', ratingGet) // This will handle the GET request
router.use('/', ratingPost) // This will handle the POST request

module.exports = router