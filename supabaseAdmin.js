const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
        auth: { autoRefreshToken: false, persistSession: false },
    }
)

module.exports = { supabaseAdmin }
