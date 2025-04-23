/**
 * @swagger
 * /api/record/{record_id}:
 *   delete:
 *     summary: Delete a record and its associated flashcards
 *     tags:
 *       - Record
 *     parameters:
 *       - in: path
 *         name: record_id
 *         required: true
 *         description: The ID of the record to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the record and associated flashcards
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Record with ID 123 and its associated flashcards have been successfully deleted."
 *       400:
 *         description: Missing record_id in the URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Record_ID is required in the URL"
 *       404:
 *         description: Record not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Record with ID 123 not found."
 *       500:
 *         description: Server error during deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error deleting record: unexpected error occurred"
 */
