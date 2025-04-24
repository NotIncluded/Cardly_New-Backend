const express = require('express');
const router = express.Router();
const { supabase } = require('../../../supabaseClient');

require('./swagger_record_delete'); // Swagger documentation

router.delete('/:record_id', async (req, res) => {
    const { record_id } = req.params;

    if (!record_id) {
        return res.status(400).json({ error: 'Record_ID is required in the URL' });
    }

    // Delete associated flashcards
    const { error: deleteFlashcardsError } = await supabase
        .from('Flashcard')
        .delete()
        .eq('Record_ID', record_id);

    if (deleteFlashcardsError) {
        return res.status(500).json({ error: `Error deleting associated flashcards: ${deleteFlashcardsError.message}` });
    }

    console.log(`🗑️ Flashcards for Record ID ${record_id} deleted.`);

    // Delete the record itself
    const { data, error: deleteRecordError } = await supabase
        .from('Record')
        .delete()
        .eq('Record_ID', record_id)
        .single();

    if (deleteRecordError) {
        return res.status(404).json({ error: 'Cannot find the record.' });
    }

    res.status(200).json({
        message: 'Record deleted successfully.',
    });
});

module.exports = router;
