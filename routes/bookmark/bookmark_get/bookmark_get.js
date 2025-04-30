const express = require('express')
const router = express.Router()
const { supabase } = require('../../../supabaseClient')
require('./swagger_bookmark_get') // Swagger documentation for GET

// GET route for fetching a bookmark by user_id and record_id
router.get('/:user_id/:record_id', async (req, res) => {
    const { user_id, record_id } = req.params

    try {
        const { data, error } = await supabase
            .from('Bookmark')
            .select('Bookmark_ID, Record_ID, User_ID')
            .eq('User_ID', user_id)
            .eq('Record_ID', record_id)
            .single()

        if (error && error.code !== 'PGRST116') {
            console.error('❌ Supabase error:', error.message)
            return res.status(500).json({ error: error.message })
        }

        const exists = !!data

        if (!exists) {
            return res.status(404).json({
                exists: false,
                message: 'Bookmark Not Found',
            })
        }

        return res.status(200).json({
            exists: true,
            message: 'Bookmark Exists',
        })
    } catch (error) {
        console.error('❌ Server error:', error.message)
        return res.status(500).json({ error: error.message })
    }
})

module.exports = router
