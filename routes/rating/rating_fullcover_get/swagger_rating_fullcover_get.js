/**
 * @swagger
 * /api/rating/{record_id}:
 *   get:
 *     summary: Get the average rating of a record
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: record_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the record to retrieve the overall rating for
 *     responses:
 *       200:
 *         description: Successfully retrieved average rating
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 average:
 *                   type: number
 *                   format: float
 *                   example: 4.25
 *                 count:
 *                   type: integer
 *                   example: 12
 *       400:
 *         description: Missing or invalid record_id
 *       500:
 *         description: Internal server error
 */
