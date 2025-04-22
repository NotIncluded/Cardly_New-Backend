/**
 * @swagger
 * /api/rating/{user_id}/{record_id}:
 *   post:
 *     summary: Create or update a rating for a record
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to submit the rating for
 *       - in: path
 *         name: record_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the record to rate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *     responses:
 *       200:
 *         description: Rating saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rating saved successfully
 *                 data:
 *                   type: object
 *       400:
 *         description: Missing or invalid input
 *       500:
 *         description: Internal server error
 */
