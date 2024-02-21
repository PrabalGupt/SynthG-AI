// // server.js
// const express = require('express');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const session = require('express-session');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Configure passport
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: 'http://localhost:5000/auth/google/callback',
// }, (accessToken, refreshToken, profile, done) => {
//     // Handle user data after successful authentication
//     return done(null, profile);
// }));

// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//     done(null, obj);
// });

// // Set up Express middleware
// app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Define your authentication routes
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/' }),
//     (req, res) => {
//         // Successful authentication, redirect to React app with user profile data
//         res.redirect(`http://localhost:3000/?profile=${JSON.stringify(req.user)}`);
//     });

// // Define the route for /auth-success
// app.get('/auth-success', (req, res) => {
//     // Render a page or send a response as needed
//     res.send('Authentication successful!'); // You can customize this response
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });




