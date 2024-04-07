const { supabase } = require('../config/supabaseClient');

/**
 * @description the followinf function will add a train between a source and a destination 
 * @param {express request} req coming from client for adding a train.
 * @param {express response} res response object that will be sent back.
 * @returns an object containing train details if creation successfull.
 */
exports.addTrain = async (req, res) => {
    const { trainNumber, source, destination, totalSeats } = req.body;
    try {
        const { data, error } = await supabase
            .from('trains')
            .insert([{ train_number: trainNumber, source, destination, total_seats: totalSeats, available_seats: totalSeats,version: 0 }]).select();
        
        if (error) throw error;
        
        res.status(201).json({"message": "Train created successfully","data" : data});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add train' });
    }
};

/**
 * @description the following function will get all the trains available between a source and a destination.
 * @param {express request} req coming from client for data of available trains between a source and destination.
 * @param {express response} res response object that will be sent back.
 * @returns an array of train details between source and destination.
 */
exports.getSeatAvailability = async (req, res) => {
    const { source, destination } = req.query;
    try {
        const { data, error } = await supabase
            .from('trains')
            .select('*')
            .eq('source', source)
            .eq('destination', destination);

        if (error) throw error;
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch seat availability' });
    }
};
