/**
 * @swagger
 * /api/record/{user_id}:
 *   post:
 *     summary: Create a new record with flashcards
 *     tags: [Record]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user creating the record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *               - status
 *               - questions
 *             properties:
 *               title:
 *                 type: string
 *                 example: Biology Basics
 *               description:
 *                 type: string
 *                 example: Introductory biology flashcards
 *               category:
 *                 type: string
 *                 example: Science
 *               status:
 *                 type: string
 *                 example: Public
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                       example: What is the powerhouse of the cell?
 *                     answer:
 *                       type: string
 *                       example: Mitochondria
 *                     hint:
 *                       type: string
 *                       example: It's in the cytoplasm
 *     responses:
 *       201:
 *         description: Record and flashcards created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully added new record and flashcards.
 *                 data:
 *                   type: object
 *                 questionData:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Missing required fields or invalid input
 *       500:
 *         description: Server error
 */
