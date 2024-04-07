
# IRCTC (Railway Reseration System API)

The IRCTC (Railway Management System API) is designed to manage train bookings, allowing users to check train availability between stations, book seats, and manage train schedules. This API is built using Node.js and uses Supabase for PostgreSQL database management.

## Features

- User registration and authentication
- Role-based access control (Admins and regular users)
- Train management (Add, and check trains)
- Seat booking and availability checks
- Race condition handling using row versioning

## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Supabase account and project setup

### Setting Up the Environment

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/krishna-kudari/scalable-reservation-system.git
   ```

2. Install the necessary npm packages:

   ```
   cd scalable-reservation-system
   npm install
   ```

3. Set up your Supabase project and obtain the Supabase URL and Key. Update the `.env` file with your Supabase credentials and other environment variables:

   ```
   PORT=port
   ADMIN_API_KEY=random_string
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   JWT_SECRET=your_jwt_secret
   ```

### Running the API

Start the server with:

```
npm start
```

The API will be available at `http://localhost:{PORT}`.

## API Endpoints

### Users

- **POST /api/users/register**: Register a new user.
    - for registering a admin include the `ADMIN_API_KEY` in query params as `apiKey`
- **POST /api/users/login**: Log in a user.

` All the Train and Booking endpoints are protected, set the Authorization header = Bearer {Token sent while login} for accessing these endpoints.`

### Trains

- **POST /api/trains/add** (Admin only): Add a new train.
- **GET /api/trains/availability**: Check seat availability between two stations.

### Bookings

- **POST /api/bookings/book**: Book a seat on a train.
- **GET /api/bookings/details**: Get specific booking details.
- **GET /api/bookings/userBookings**: Get booking history of a user.

## Development

### Coding Style

My development style is research -> understand flow -> understand tradeoffs -> approach -> write code -> test -> repeat.

### How I Approached this task with my little knowledge of scalability ? 
checkout https://app.eraser.io/workspace/dkZRn70Tj6wbnshCrhXm 

## Acknowledgments

- web dev cody(youtube) for giving insights on race handling(I used my own approach got his approach gave an idea).

