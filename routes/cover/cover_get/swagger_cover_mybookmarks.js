/**
 * @swagger
 * /api/cover/bookmark/{user_id}:
 *   get:
 *     summary: Get all bookmarked records for a user
 *     tags: [Cover]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: The ID of the user whose bookmarks are being fetched
 *         schema:
 *           type: string
 *           example: "123"
 *     responses:
 *       200:
 *         description: List of bookmarked records with record details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   record_id:
 *                     type: integer
 *                     example: 456
 *                   title:
 *                     type: string
 *                     example: "Amazing Science Facts"
 *                   description:
 *                     type: string
 *                     example: "Explore fascinating scientific concepts."
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   category:
 *                     type: string
 *                     example: "Science"
 *       400:
 *         description: User_ID is required in the URL.
 *       500:
 *         description: Server error while fetching bookmarks.
 */
