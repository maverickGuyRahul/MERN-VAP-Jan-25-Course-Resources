import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import UserProfile from './models/UserProfile.js';

// For ESM __dirname and __filename emulation
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/ProfileInfo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });

// 2. Middleware: parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Set EJS as our view engine
app.set('view engine', 'ejs');

// 4. Serve static files (CSS, images, etc.) from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// 5. Basic Route: Home page (list all user profiles)
app.get('/', async (req, res) => {
  try {
    const profiles = await UserProfile.find({});
    // Render 'index.ejs' with an array of profiles
    res.render('index', { profiles });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 6. Create (push) a new user profile
app.post('/users', async (req, res) => {
  try {
    const newUser = await UserProfile.create(req.body);
    // Redirect back to home page or return JSON
    res.redirect('/');
  } catch (error) {
    res.status(400).send(`Error creating user: ${error.message}`);
  }
});

// 7. Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
