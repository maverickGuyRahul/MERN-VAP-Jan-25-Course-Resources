import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import UserProfileSchema from './models/UserProfile.js';

// For ESM __dirname and __filename emulation
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// -- 1. Connect to MongoDB with async/await
async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/ProfileInfo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('Connection error:', err);
    // Exit process on DB connection failure, or handle it according to your needs
    process.exit(1);
  }
}
// Call the connection function
connectDB();

// 2. Middleware: parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Set EJS as our view engine
app.set('view engine', 'ejs');

// 4. Serve static files (CSS, images, etc.) from "public" folder
app.use(express.static('public'));

// 5. Basic Route: Home page (list all user profiles)
app.get('/', async (req, res) => {
  try {
    const profiles = await UserProfileSchema.find({});
    // Render 'index.ejs' with an array of profiles
    // res.render('index', { profiles });
    res.json(profiles);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// app.get('/updateuser', (req, res) => {
//   res.render('UpdateForm');
// });

// 6. Create (push) a new user profile
app.post('/users', async (req, res) => {
  try {
    const newUser = await UserProfileSchema.create(req.body);
    // Redirect back to home page or return JSON
    // res.redirect('/');
    res.send('<h1> Data Saved Successfully </h1>');
  } catch (error) {
    res.status(400).send(`Error creating user: ${error.message}`);
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    // If you want to use auto-incremented user_id, do findOneAndReplace({ user_id: req.params.id }, ...)
    const updatedUser = await UserProfileSchema.findOneAndReplace(
      { user_id: req.params.id },
      req.body,
      { new: true, overwrite: true } // overwrite = true ensures a full replacement
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User replaced successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 7. Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
