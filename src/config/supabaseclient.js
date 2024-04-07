const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// create a supabaseClient connection
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };
