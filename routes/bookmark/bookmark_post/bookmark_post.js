const express = require('express')
const router = express.Router()
const { supabase } = require('../../../supabaseClient')
require('./swagger_bookmark_post') // Swagger documentation for POST

// POST route for creating a bookmark
router.post('/:user_id/:record_id', async (req, res) => {
    const { user_id, record_id } = req.params

    try {
        const { data, error } = await supabase
            .from('Bookmark')
            .insert([{ User_ID: user_id, Record_ID: record_id }])

        if (error) {
            return res.status(400).json({ error: error.message })
        }

        return res
            .status(200)
            .json({ message: 'Successfully added a Bookmark.' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

module.exports = router
