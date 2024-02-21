const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const { generate_keywords } = require('./test')

const app = express();
const port = 5000;
app.use(cors());

app.use(express.json());


const openai = new OpenAI({ 'apiKey': process.env.OPENAI_API_KEY });

// Configure passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    // Handle user data after successful authentication
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Set up Express middleware
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Define your authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect to React app with user profile data
        res.redirect(`http://localhost:3000/?profile=${JSON.stringify(req.user)}`);
    });

// Define the route for /auth-success
app.get('/auth-success', (req, res) => {
    // Render a page or send a response as needed
    res.send('Authentication successful!'); // You can customize this response
});




app.post('/youtube/recommend-videos', async (req, res) => {
    const prompt = req.body.prompt;

    const response = await generate_keywords(prompt);
    res.send(response)
});


app.get('/', (req, res) => res.send('yt-video-recommender working!'));
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));