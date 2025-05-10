const express = require('express')
const router = express.Router()
const { supabase } = require('../../../supabaseClient')

require('./swagger_rating_get')

// Get the rating given by a specific user to a specific record
router.get('/:record_id/:user_id', async (req, res) => {
    const { record_id, user_id } = req.params

    try {
        const { data, error } = await supabase
            .from('Rating')
            .select('Rating')
            .eq('Record_ID', record_id)
            .eq('User_ID', user_id)
            .single() // Expect only one record
            
            if (!data) {
                return res.status(200).json({
                    message: `No rating found for record ID ${record_id} by user ${user_id}`,
                    rating: 0,
                })
            }

        if (error) throw error

        res.status(200).json({
            record_id,
            user_id,
            rating: data.Rating,
        })
    } catch (error) {
        console.error('❌ Error fetching specific rating:', error.message)
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
