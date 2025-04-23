const express = require('express')
const router = express.Router()
const { supabase } = require('../../../supabaseClient')
const { supabaseAdmin } = require('../../../supabaseAdmin')

require('./swagger_rating_fullcover_get')

// Get full info and average rating for a record
router.get('/full/:record_id', async (req, res) => {
    const { record_id } = req.params

    try {
        // Step 1: Fetch record metadata
        const { data: record, error: recordError } = await supabase
            .from('Record')
            .select('User_ID, Title, Description, Category')
            .eq('Record_ID', record_id)
            .single()

        if (recordError) throw recordError
        if (!record) {
            return res.status(404).json({
                message: `Record with ID ${record_id} not found`,
            })
        }

        // Step 2: Fetch user info from auth.users using admin client
        const { data: user, error: userError } =
            await supabaseAdmin.auth.admin.getUserById(record.User_ID)

        if (userError) throw userError

        const userName = user?.user?.user_metadata?.display_name || 'Unknown'

        if (userError) throw userError
        if (!user) {
            return res.status(404).json({
                message: `User with ID ${record.User_ID} not found`,
            })
        }

        if (userError) throw userError

        // Step 3: Fetch all ratings
        const { data: ratingsData, error: ratingError } = await supabase
            .from('Rating')
            .select('Rating')
            .eq('Record_ID', record_id)

        if (ratingError) throw ratingError

        const ratings = ratingsData.map((r) => r.Rating)
        const rating_avg = ratings.length
            ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
            : 0

        // Final response with user name from auth.users
        res.status(200).json({
            record_id,
            user_id: record.User_ID,
            title: record.Title,
            description: record.Description,
            name: userName,
            category: record.Category,
            rating_avg: parseFloat(rating_avg),
        })
    } catch (error) {
        console.error('❌ Error fetching rating full cover:', error.message)
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
