const express = require('express');
const router = express.Router();
const { supabase } = require('../../../supabaseClient');
const { supabaseAdmin } = require('../../../supabaseAdmin');

router.get('/bookmark/:user_id', async (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json({ error: 'User_ID is required in the URL' });
    }

    try {
        // Step 1: Get all bookmarked Record_IDs for this user
        const { data: bookmarks, error: bookmarkError } = await supabase
            .from('Bookmark')
            .select('Record_ID')
            .eq('User_ID', user_id);

        if (bookmarkError) {
            throw new Error(`Error fetching bookmarks: ${bookmarkError.message}`);
        }

        const recordIds = bookmarks.map(b => b.Record_ID);
        if (recordIds.length === 0) {
            return res.status(200).json([]); // No bookmarks
        }

        // Step 2: Get corresponding record data
        const { data: records, error: recordError } = await supabase
            .from('Record')
            .select('Record_ID, Title, Description, Category, User_ID')
            .in('Record_ID', recordIds);

        if (recordError) {
            throw new Error(`Error fetching record info: ${recordError.message}`);
        }

        // Step 3: Get all unique User_IDs from records
        const userIds = [...new Set(records.map(r => r.User_ID))];

        // Step 4: Fetch all user display names from auth.users
        const userNames = {};
        await Promise.all(userIds.map(async (uid) => {
            const { data: userData, error: userError } =
                await supabaseAdmin.auth.admin.getUserById(uid);

            userNames[uid] = userData?.user?.user_metadata?.display_name || 'Unknown';
        }));

        // Step 5: Format response
        const response = records.map(record => ({
            record_id: record.Record_ID,
            title: record.Title,
            description: record.Description,
            name: userNames[record.User_ID] || 'Unknown',
            category: record.Category
        }));

        console.log(`🔖 Bookmarked records for ${user_id}:`, response);
        res.status(200).json(response);
    } catch (error) {
        console.error('❌ Error fetching bookmarks:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
