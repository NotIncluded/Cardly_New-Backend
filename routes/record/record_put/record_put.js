const express = require('express')
const router = express.Router()
const { supabase } = require('../../../supabaseClient')
const { v4: uuidv4 } = require('uuid')

require('./swagger_record_put')

router.put('/:record_id', async (req, res) => {
    const { record_id } = req.params
    const { title, description, category, status, questions } = req.body

    // Validate required fields
    if (!record_id) {
        return res
            .status(400)
            .json({ error: 'Record_ID is required in the URL' })
    }

    if (!title || !description || !category || !status || !questions) {
        return res.status(400).json({ error: 'Missing required fields' })
    }

    try {
        // Check if the record exists
        const { data: recordData, error: recordError } = await supabase
            .from('Record')
            .select('*')
            .eq('Record_ID', record_id)

        // If no rows found, throw an error
        if (recordError || !recordData) {
            throw new Error('No record found with the given Record_ID')
        }

        console.log('🧾 Record found:', recordData)

        // Update record in the database
        const { data: updatedRecord, error: updateError } = await supabase
            .from('Record')
            .update({
                Title: title,
                Description: description,
                Category: category,
                Status: status,
            })
            .eq('Record_ID', record_id)
            .select()

        if (updateError) {
            throw new Error(`Error updating record: ${updateError.message}`)
        }

        console.log('🧾 Record updated:', updatedRecord)

        // Update flashcards (questions)
        const maxFlashcard = questions.length

        const { data: questionData, error: questionError } = await supabase
            .from('Flashcard')
            .upsert(
                questions.map((question, index) => ({
                    Record_ID: record_id,
                    Flashcard_Num: index + 1,
                    Question: question.question,
                    Answer: question.answer,
                    Hint: question.hint,
                }))
            )

        if (questionError) {
            throw new Error(
                `Error updating flashcards: ${questionError.message}`
            )
        }

        console.log('🧾 Flashcards updated:', questionData)

        // Remove excess flashcards if any
        const { data: deletedFlashcards, error: deleteError } = await supabase
            .from('Flashcard')
            .delete()
            .eq('Record_ID', record_id)
            .gt('Flashcard_Num', maxFlashcard)

        if (deleteError) {
            throw new Error(
                `Error deleting extra flashcards: ${deleteError.message}`
            )
        }

        res.status(200).json({
            message: 'Record and flashcards updated successfully',
        })
    } catch (error) {
        console.error('❌ Error:', error.message)
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
