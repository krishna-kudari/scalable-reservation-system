const { supabase } = require('../config/supabaseClient');

const createUser = async (username, hashedPassword, role = 'user') => {
    const { data, error } = await supabase
        .from('users')
        .insert([{ username, password: hashedPassword, role }]).select();
    if (error) throw error;
    return data;
};

const findUserByUsername = async (username) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();
    if (error && error.message !== "No rows found") throw error;
    return data;
};

module.exports = { createUser, findUserByUsername };
