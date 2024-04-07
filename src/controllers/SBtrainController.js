const { supabase } = require('../config/supabaseClient');

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
