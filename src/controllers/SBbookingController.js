const { supabase } = require("../config/supabaseClient");

exports.bookSeat = async (req, res) => {
  const { trainId } = req.body;
  const { userId } = req.user;

  try {
    // fetch the available seats and version of the database row at the time of read
    const { data: train, error: trainError } = await supabase
      .from("trains")
      .select(`available_seats,version`)
      .eq("id", trainId)
      .single();
    console.log(train);
    if (trainError) throw trainError;
    // check if seats are available for booking
    if (train.available_seats < 1) {
      return res.status(400).json({ message: "No available seats" });
    }
    
    // reserve a seat if there were no updations in the timeframe between read and write
    const { data: updatedTrain, error: updateError } = await supabase
      .from("trains")
      .update({
        available_seats: train.available_seats - 1,
        version: train.version + 1,
      })
      .eq("id", trainId)
      .eq("version", train.version)
      .select();
    if (!updatedTrain) {
      return res.status(400).json({ message: "No available seats" });
    }
    const { data: bookingData, error: bookingError } = await supabase
      .from("bookings")
      .insert([{ user_id: userId, train_id: trainId }]).select();
    if (bookingError) {
      return res.status(500).json({ message: "Booking failed" });
    }

    res.status(201).json({ message: "Booking successful",bookingData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to book seat" });
  }
};


exports.getUserBookingsDetails = async (req, res) => {
  const { userId } = req.user;
  try {
    const { data, error } = await supabase.from("bookings").select("*").eq("user_id", userId).order('boking_date', { ascending : false});

    if (error) {
      return res.status(500).json({ message: "Error fetching Bookings" });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while fetching booking details");
  }
};


exports.getBookingDetails = async (req, res) => {
  const { bookingId } = req.query;
  console.log(typeof +bookingId);
  try {
    const { data, error } = await supabase.from("bookings").select("*").eq("id", +bookingId).single();
    if (error) {
      return res.status(500).json({ message: "Error fetching Booking Details" });
    }
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while fetching booking details");
  }
};
