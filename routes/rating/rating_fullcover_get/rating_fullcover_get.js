const express = require('express')
const router = express.Router()
const { supabase } = require('../../../supabaseClient')

require('./swagger_rating_fullcover_get')

// Get the average rating of a record
router.get('/:record_id', async (req, res) => {
    const { record_id } = req.params

    try {
        const { data, error } = await supabase
            .from('Rating')
            .select('Rating')
            .eq('Record_ID', record_id)

        if (error) throw error

        if (!data || data.length === 0) {
            return res.status(404).json({
                message: `No ratings found for record ID ${record_id}`
            })
        }
        
        const ratings = data.map((r) => r.Rating)
        const average = ratings.length
            ? (ratings.reduce((a, b) => a + b) / ratings.length).toFixed(2)
            : 0

        res.status(200).json({
            average: parseFloat(average),
            count: ratings.length,
        })
    } catch (error) {
        console.error('❌ Error fetching rating:', error.message)
        res.status(500).json({ error: error.message })
    }
})

module.exports = router