const express = require('express');
const router = express.Router();

// Import the individual route files for POST, GET, DELETE
const bookmarkPostRoutes = require('./bookmark_post/bookmark_post');
const bookmarkGetRoutes = require('./bookmark_get/bookmark_get');
const bookmarkDeleteRoutes = require('./bookmark_delete/bookmark_delete');

/**
 * @swagger
 * tags:
 *   name: Bookmark
 *   description: Bookmark Management Section
 */

// Use the individual route files
router.use('/', bookmarkPostRoutes);  // POST route for creating a bookmark
router.use('/', bookmarkGetRoutes);  // GET route for fetching bookmarks
router.use('/', bookmarkDeleteRoutes); // DELETE route for deleting a bookmark

module.exports = router