/**
 * @swagger
 * /api/cover/myflashcard/{user_id}:
 *   get:
 *     summary: Get all records created by a specific user
 *     tags: [Cover]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: List of records created by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   record_id:
 *                     type: string
 *                     example: a1b2c3d4
 *                   title:
 *                     type: string
 *                     example: My Study Notes
 *                   description:
 *                     type: string
 *                     example: Flashcards on basic math topics
 *                   category:
 *                     type: string
 *                     example: Math
 *                   status:
 *                     type: string
 *                     example: Draft
 *       400:
 *         description: Missing or invalid user_id in the URL
 *       500:
 *         description: Server error while fetching user records
 */
