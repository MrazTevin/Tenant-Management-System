const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Define CRUD APIs here
app.get('/properties', async (req, res) => {
  const result = await pool.query('SELECT * FROM properties');
  res.json(result.rows);
});

app.post('/properties', async (req, res) => {
  const { type, bedrooms, status, image_url } = req.body;
  const result = await pool.query(
    'INSERT INTO properties (type, bedrooms, status, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
    [type, bedrooms, status, image_url]
  );
  res.json(result.rows[0]);
});

// Similar routes for tenants and bookings...

// Script to create sample listings
const listings = [
  {
    type: 'Apartment',
    bedrooms: 2,
    status: 'For Sale',
    image_url: 'https://example.com/image1.jpg',
  },
  {
    type: 'House',
    bedrooms: 3,
    status: 'For Rent',
    image_url: 'https://example.com/image2.jpg',
  },
  {
    type: 'Condo',
    bedrooms: 1,
    status: 'For Sale',
    image_url: 'https://example.com/image3.jpg',
  },
  {
    type: 'Townhouse',
    bedrooms: 4,
    status: 'For Rent',
    image_url: 'https://example.com/image4.jpg',
  },
  {
    type: 'Studio',
    bedrooms: 0,
    status: 'For Sale',
    image_url: 'https://example.com/image5.jpg',
  },
];

async function createListings() {
  for (const listing of listings) {
    try {
      const response = await axios.post(`http://localhost:${port}/properties`, listing);
      console.log('Listing created:', response.data);
    } catch (error) {
      console.error('Error creating listing:', error.message);
    }
  }
}

// Uncomment the line below to execute the script
// createListings();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
