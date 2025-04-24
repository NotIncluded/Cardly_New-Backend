const express = require('express');
const router = express.Router();
const { supabase } = require('../../../supabaseClient');

require('./swagger_record_delete'); // Assuming you'll create a Swagger definition for this

router.delete('/:record_id', async (req, res) => {
    const { record_id } = req.params;

    if (!record_id) {
        return res.status(400).json({ error: 'Record_ID is required in the URL' });
    }

    try {
        // First, delete the associated flashcards
        const { error: deleteFlashcardsError } = await supabase
            .from('Flashcard')
            .delete()
            .eq('Record_ID', record_id)
            .select()
            .single();

        if (deleteFlashcardsError) {
            throw new Error(`Error deleting associated flashcards: ${deleteFlashcardsError.message}`);
        }

        console.log(`🗑️ Flashcards for Record ID ${record_id} deleted.`);

        // Then, delete the record itself
        const { data, error: deleteRecordError } = await supabase
            .from('Record')
            .delete()
            .eq('Record_ID', record_id)
            .single(); // Assuming Record_ID is unique

        if (deleteRecordError) {
            throw new Error(`Error deleting record: ${deleteRecordError.message}`);
        }

        res.status(200).json({
            message: 'Record deleted successfully.',
        });
        
        res.status(404).json({
            message: 'Cannot find the record.',
        });
    } catch (error) {
        console.error('❌ Error deleting record:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
