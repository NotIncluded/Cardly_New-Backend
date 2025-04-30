/**
 * @swagger
 * /api/bookmark/{user_id}/{record_id}:
 *   delete:
 *     summary: Delete a bookmark
 *     tags:
 *       - Bookmark
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *       - in: path
 *         name: record_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the record
 *     responses:
 *       200:
 *         description: Successfully deleted a Bookmark.
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Bookmark not found
 *       500:
 *         description: Internal Server Error
 */
