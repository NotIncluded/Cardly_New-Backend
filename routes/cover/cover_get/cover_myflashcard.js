const express = require('express')
const router = express.Router()
const { supabase } = require('../../../supabaseClient')
const { supabaseAdmin } = require('../../../supabaseAdmin')

router.get('/myflashcard/:user_id', async (req, res) => {
    const { user_id } = req.params

    if (!user_id) {
        return res.status(400).json({ error: 'User_ID is required in the URL' })
    }

    try {
        // Step 1: Fetch user's display name from auth.users
        const { data: user, error: userError } = await supabaseAdmin.auth.admin.getUserById(user_id)

        if (userError) throw userError
        if (!user || !user.user) {
            return res.status(404).json({ error: `User with ID ${user_id} not found` })
        }

        const displayName = user.user.user_metadata?.display_name || 'Unknown'

        // Step 2: Fetch all records by this user
        const { data: records, error: recordError } = await supabase
            .from('Record')
            .select('Record_ID, Title, Description, Category, Status')
            .eq('User_ID', user_id)
            .order('Record_ID', { ascending: false })

        if (recordError) {
            throw new Error(`Error fetching user's records: ${recordError.message}`)
        }

        // Step 3: Format response with display name
        const response = {
            records: records.map(record => ({
                record_id: record.Record_ID,
                title: record.Title,
                description: record.Description,
                name: displayName,
                category: record.Category,
                status: record.Status
            }))
        }

        console.log(`📄 Records for user ${user_id} (${displayName}):`, response)
        res.status(200).json(response)
    } catch (err) {
        console.error('❌ Error fetching my flashcards:', err.message)
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
