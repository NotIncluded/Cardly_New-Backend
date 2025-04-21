const express = require('express')
const router = express.Router()
const { supabase } = require('../../../supabaseClient')
const { v4: uuidv4 } = require('uuid')

require('./swagger_record_post')

router.post('/:user_id', async (req, res) => {
    const { user_id } = req.params
    const { title, description, category, status, questions } = req.body

    // Validate required fields
    if (!user_id) {
        return res.status(400).json({ error: 'User_ID is required in the URL' })
    }

    if (!title || !description || !category || !status || !questions) {
        return res.status(400).json({ error: 'Missing required fields' })
    }

    // Generate unique record ID
    const record_id = uuidv4()

    try {
        // Insert record into the database
        const { data: recordData, error: recordError } = await supabase
            .from('Record')
            .insert([
                {
                    Record_ID: record_id,
                    User_ID: user_id,
                    Title: title,
                    Description: description,
                    Category: category,
                    Status: status,
                },
            ])
            .single()

        if (recordError) {
            throw new Error(`Error inserting record: ${recordError.message}`)
        }

        console.log('🧾 Record added:', recordData)

        // Insert flashcards (questions)
        const { data: questionData, error: questionError } = await supabase
            .from('Flashcard')
            .insert(
                questions.map((question, index) => ({
                    Record_ID: record_id,
                    Flashcard_Num: index + 1,
                    Question: question.question,
                    Answer: question.answer,
                    Hint: question.hint,
                }))
            )

        if (questionError) {
            throw new Error(`Error adding flashcards: ${questionError.message}`)
        }

        console.log('🧾 Flashcards added:', questionData)

        // Return success response
        res.status(201).json({
            message: 'Successfully added new record and flashcards.',
            data: recordData,
            questionData: questionData,
        })
    } catch (error) {
        console.error('❌ Error:', error.message)
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
