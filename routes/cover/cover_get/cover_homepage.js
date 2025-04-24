const express = require('express')
const router = express.Router()
const { supabase } = require('../../../supabaseClient')
const { supabaseAdmin } = require('../../../supabaseAdmin')

router.get('/homepage', async (req, res) => {
    try {
        // Step 1: Fetch public records
        const { data: records, error: recordError } = await supabase
            .from('Record')
            .select('Record_ID, Title, Description, Category, User_ID')
            .eq('Status', 'Public')
            .order('created', { ascending: false })
            .limit(4)

        if (recordError) {
            throw new Error(`Error fetching records: ${recordError.message}`)
        }

        // Step 2: Get all unique User_IDs
        const userIds = [...new Set(records.map(r => r.User_ID))]

        // Step 3: Fetch user info from auth.users via admin client
        const userFetches = await Promise.all(
            userIds.map(async (id) => {
                const { data, error } = await supabaseAdmin.auth.admin.getUserById(id)
                if (error) {
                    console.error(`⚠️ Failed to fetch user ${id}: ${error.message}`)
                    return { id, name: 'Unknown' }
                }
                const name = data?.user?.user_metadata?.display_name || 'Unknown'
                return { id, name }
            })
        )

        // Step 4: Map user IDs to names
        const userMap = Object.fromEntries(userFetches.map(u => [u.id, u.name]))

        // Step 5: Combine results
        const response = records.map(record => ({
            record_id: record.Record_ID,
            title: record.Title,
            description: record.Description,
            name: userMap[record.User_ID] || 'Unknown',
            category: record.Category,
        }))

        console.log('🏠 Homepage records:', response)
        res.status(200).json(response)
    } catch (error) {
        console.error('❌ Homepage fetch error:', error.message)
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
