/**
 * @swagger
 * /api/cover/homepage:
 *   get:
 *     summary: Get all public records for the homepage
 *     tags: [Cover]
 *     responses:
 *       200:
 *         description: List of public records with user name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   record_id:
 *                     type: string
 *                     example: abc123
 *                   title:
 *                     type: string
 *                     example: Learn Chemistry
 *                   description:
 *                     type: string
 *                     example: Basic concepts and fun facts
 *                   name:
 *                     type: string
 *                     example: Alice Nguyen
 *                   category:
 *                     type: string
 *                     example: Science
 *       500:
 *         description: Server error while fetching public records
 */
