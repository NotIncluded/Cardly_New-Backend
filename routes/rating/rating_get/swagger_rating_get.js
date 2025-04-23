/**
 * @swagger
 * /api/rating/{record_id}/{user_id}:
 *   get:
 *     summary: Get a specific user's rating for a record
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: record_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the record
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: The user's rating for the record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 record_id:
 *                   type: string
 *                   example: "abc123"
 *                 user_id:
 *                   type: string
 *                   example: "user456"
 *                 rating:
 *                   type: number
 *                   example: 5
 *       404:
 *         description: No rating found for the given record and user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No rating found for record ID abc123 by user user456"
 *       500:
 *         description: Server error
 */
