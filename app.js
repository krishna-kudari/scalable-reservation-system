const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();


const userRouter = require('./src/routes/userRouter');
const trainRouter = require('./src/routes/trainRouter');
const bookingRouter = require('./src/routes/bookingRouter');


const app = express();

// middlewares
app.use(express.json()); // for parsing application/json
app.use(cors()); // to enable CORS
app.use(helmet()); // for securing HTTP headers
app.use(morgan('dev')); // for logging HTTP requests
app.use(compression()); // for compressing response bodies

// Routes
app.use('/api/users', userRouter);
app.use('/api/trains', trainRouter);
app.use('/api/bookings', bookingRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
