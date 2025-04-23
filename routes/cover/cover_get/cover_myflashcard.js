const express = require('express')
const router = express.Router()
const { supabase } = require('../../../supabaseClient')

router.get('/myflashcard/:user_id', async (req, res) => {
    const { user_id } = req.params

    if (!user_id) {
        return res.status(400).json({ error: 'User_ID is required in the URL' })
    }

    try {
        // Fetch all records by the user
        const { data: records, error } = await supabase
            .from('Record')
            .select('Record_ID, Title, Description, Category, Status')
            .eq('User_ID', user_id)
            .order('Record_ID', { ascending: false })

        if (error) {
            throw new Error(`Error fetching user's records: ${error.message}`)
        }

        // Format response
        const response = records.map(record => ({
            record_id: record.Record_ID,
            title: record.Title,
            description: record.Description,
            category: record.Category,
            status: record.Status
        }))

        console.log(`📄 Records for user ${user_id}:`, response)
        res.status(200).json(response)
    } catch (err) {
        console.error('❌ Error fetching my flashcards:', err.message)
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
