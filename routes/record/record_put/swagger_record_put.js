/**
 * @swagger
 * /api/record/{record_id}:
 *   put:
 *     summary: Update a record and its flashcards
 *     tags: [Record]
 *     parameters:
 *       - in: path
 *         name: record_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the record
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
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               status:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                     answer:
 *                       type: string
 *                     hint:
 *                       type: string
 *     responses:
 *       200:
 *         description: Record and flashcards updated successfully
 *       400:
 *         description: Missing or invalid input
 *       500:
 *         description: Server error
 */
