const express = require('express')
const router = express.Router()

// Import the get and post routes
const recordGet = require('./record_get/record_get')
const recordPost = require('./record_post/record_post')
const recordPut = require('./record_put/record_put')

/**
 * @swagger
 * tags:
 *   name: Record
 *   description: Super Idol De Shou Rong Dou Mei Ni De Tian
 */

// Use the imported routers for their respective routes
router.use('/', recordGet) // This will handle the GET request
router.use('/', recordPost) // This will handle the POST request
router.use('/', recordPut) // This will handle the PUT request

module.exports = router
