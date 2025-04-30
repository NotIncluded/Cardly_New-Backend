/**
 * @swagger
 * /api/bookmark/{user_id}/{record_id}:
 *   post:
 *     summary: Add a bookmark
 *     description: Adds a new bookmark entry that links a user with a specific record.
 *     tags:
 *       - Bookmark
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user bookmarking the record
 *       - in: path
 *         name: record_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the record to be bookmarked
 *     responses:
 *       200:
 *         description: Successfully added the bookmark
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully adding Bookmark.
 *       400:
 *         description: Bad request (e.g., duplicate entry or missing field)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
