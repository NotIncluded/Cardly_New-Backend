const express = require('express')
const router = express.Router()
const { supabase } = require('../../../supabaseClient')

require('./swagger_record_get')

router.get('/:record_id', async (req, res) => {
    const { record_id } = req.params

    // Validate record_id presence
    if (!record_id) {
        return res
            .status(400)
            .json({ error: 'Record_ID is required in the URL' })
    }

    try {
        // Fetch record data
        const { data: recordData, error: recordError } = await supabase
            .from('Record')
            .select('*')
            .eq('Record_ID', record_id)
            .single()

        if (recordError) {
            throw new Error(`Error fetching record: ${recordError.message}`)
        }

        // Fetch associated flashcards (questions)
        const { data: questionData, error: questionError } = await supabase
            .from('Flashcard')
            .select('*')
            .eq('Record_ID', record_id)
            .order('Flashcard_Num', { ascending: true })

        if (questionError) {
            throw new Error(
                `Error fetching flashcards: ${questionError.message}`
            )
        }

        // Format the response
        const formattedResponse = {
            title: recordData.Title,
            description: recordData.Description,
            category: recordData.Category,
            status: recordData.Status,
            questions: questionData.map((question) => ({
                question: question.Question,
                answer: question.Answer,
                hint: question.Hint,
            })),
        }

        console.log('🧾 Record retrieved:', formattedResponse)

        // Send the formatted response
        res.status(200).json(formattedResponse)
    } catch (error) {
        console.error('❌ Error:', error.message)
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
