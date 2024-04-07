const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

/**
 * @description the followinf function creates a supabase client for interacting with our postgresql database.
 * @param {supabaseUrl} url generated in supabase project settings.
 * @param {supabaseKey} anon_key gennerated in supabase project settings.
 */
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };
