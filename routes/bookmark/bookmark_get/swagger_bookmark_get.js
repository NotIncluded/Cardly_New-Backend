/**
 * @swagger
 * /api/bookmark/{user_id}/{record_id}:
 *   get:
 *     summary: Get a bookmark by user ID and record ID
 *     tags:
 *       - Bookmark
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - in: path
 *         name: record_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the record
 *     responses:
 *       200:
 *         description: Bookmark data or not found message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookmark_id:
 *                   type: string
 *                   example: "1a2b3c4d"
 *                 record_id:
 *                   type: string
 *                   example: "rec_123"
 *                 user_id:
 *                   type: string
 *                   example: "user_456"
 *                 message:
 *                   type: string
 *                   example: "Bookmark not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
