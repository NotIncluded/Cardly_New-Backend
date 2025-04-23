const express = require('express')
const router = express.Router()

// Import routes
const ratingGet = require('./rating_get/rating_get')
const ratingPost = require('./rating_post/rating_post')

/**
 * @swagger
 * tags:
 *   name: Rating
 *   description: Rating Management Section
 */

// Use the imported routers for their respective routes
router.use('/', ratingGet) // This will handle the GET request
router.use('/', ratingPost) // This will handle the POST request

module.exports = router