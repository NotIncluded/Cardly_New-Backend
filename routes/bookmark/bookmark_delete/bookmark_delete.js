const express = require('express')
const router = express.Router()
const { supabase } = require('../../../supabaseClient')
require('./swagger_bookmark_delete') // Swagger documentation for DELETE

// DELETE route for deleting a bookmark by user_id and record_id
router.delete('/:user_id/:record_id', async (req, res) => {
    const { user_id, record_id } = req.params

    if (!user_id || !record_id) {
        return res
            .status(400)
            .json({ error: 'User_ID and Record_ID are required in the URL' })
    }

    try {
        const { data, error } = await supabase
            .from('Bookmark')
            .delete()
            .eq('User_ID', user_id)
            .eq('Record_ID', record_id)
            .select()

        if (error) {
            return res.status(400).json({ error: error.message })
        }

        // Check if any row was actually deleted
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'Bookmark not found.' })
        }

        return res
            .status(200)
            .json({ message: 'Successfully deleted a Bookmark.' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

module.exports = router
