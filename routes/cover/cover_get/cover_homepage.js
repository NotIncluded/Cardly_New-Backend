const express = require('express')
const router = express.Router()
const { supabase } = require('../../../supabaseClient')

router.get('/homepage', async (req, res) => {
    try {
        // Step 1: Fetch public records
        const { data: records, error: recordError } = await supabase
            .from('Record')
            .select('Record_ID, Title, Description, Category, User_ID')
            .eq('Status', 'Public')
            .order('Record_ID', { ascending: false })

        if (recordError) {
            throw new Error(`Error fetching records: ${recordError.message}`)
        }

        // Step 2: Get all unique User_IDs
        const userIds = [...new Set(records.map(r => r.User_ID))]

        // Step 3: Fetch user names
        const { data: users, error: userError } = await supabase
            .from('User')
            .select('user_id, name')
            .in('user_id', userIds)

        if (userError) {
            throw new Error(`Error fetching users: ${userError.message}`)
        }

        // Step 4: Map users by ID for quick lookup
        const userMap = Object.fromEntries(users.map(u => [u.user_id, u.name]))

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
