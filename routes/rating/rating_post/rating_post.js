const express = require('express')
const router = express.Router()
const { supabase } = require('../../../supabaseClient')
const { v4: uuidv4 } = require('uuid')

require('./swagger_rating_post')

// Create a rating for a record
router.post('/:user_id/:record_id', async (req, res) => {
    const { user_id, record_id } = req.params
    const { rating } = req.body

    if (!user_id || !record_id) {
        return res
            .status(400)
            .json({ error: 'User_ID and Record_ID are required in the URL' })
    }

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' })
    }

    try {
        const { data, error } = await supabase
            .from('Rating')
            .upsert(
                [{
                    User_ID: user_id,
                    Record_ID: record_id,
                    Rating: rating,
                }],
                {
                    onConflict: ['User_ID', 'Record_ID'], // Ensure this matches your unique constraint
                }
            )

        if (error) throw error

        res.status(200).json({ message: 'Rating saved successfully', data })
    } catch (error) {
        console.error('❌ Error posting rating:', error.message)
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
