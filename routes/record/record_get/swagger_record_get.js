/**
 * @swagger
 * /api/record/{record_id}:
 *   get:
 *     summary: Get a record and its associated flashcards
 *     tags: [Record]
 *     parameters:
 *       - in: path
 *         name: record_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the record to retrieve
 *     responses:
 *       200:
 *         description: Record and flashcards retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: Biology Basics
 *                 description:
 *                   type: string
 *                   example: Introductory biology flashcards
 *                 category:
 *                   type: string
 *                   example: Science
 *                 status:
 *                   type: string
 *                   example: Public
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       question:
 *                         type: string
 *                         example: What is the powerhouse of the cell?
 *                       answer:
 *                         type: string
 *                         example: Mitochondria
 *                       hint:
 *                         type: string
 *                         example: It's in the cytoplasm
 *       400:
 *         description: Missing record_id in the request URL
 *       500:
 *         description: Server error while fetching data
 */
