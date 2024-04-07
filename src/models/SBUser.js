const { supabase } = require('../config/supabaseClient');

/**
 * 
 * @param {string} username 
 * @param {string} hashedPassword
 * @param {string} role 
 * @returns return an object of user details if successfully created a user.
 */
const createUser = async (username, hashedPassword, role = 'user') => {
    const { data, error } = await supabase
        .from('users')
        .insert([{ username, password: hashedPassword, role }]).select();
    if (error) throw error;
    return data;
};

/**
 * @description the following function fetches teh details of a user with username
 * @param {string} username
 * @returns an object of user details if present in the database;
 */
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
