/**
 * @swagger
 * /api/rating/{record_id}:
 *   get:
 *     summary: Get full information of a record and its average rating
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: record_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the record to fetch rating and metadata for
 *     responses:
 *       200:
 *         description: Record details with average rating
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 record_id:
 *                   type: string
 *                   example: "rec123"
 *                 user_id:
 *                   type: string
 *                   example: "user456"
 *                 title:
 *                   type: string
 *                   example: "Introduction to Databases"
 *                 description:
 *                   type: string
 *                   example: "A record about DB fundamentals."
 *                 name:
 *                   type: string
 *                   example: "Jane Doe"
 *                 category:
 *                   type: string
 *                   example: "Education"
 *                 rating_avg:
 *                   type: number
 *                   format: float
 *                   example: 4.25
 *       404:
 *         description: Record not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Record with ID rec123 not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
