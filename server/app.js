const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const app = express();

// Session setup
app.use(session({
  secret: process.env.secret, 
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport with Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.Client_ID,
    clientSecret: process.env.Client_secret,
    callbackURL: 'http://localhost:5000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});


passport.deserializeUser((obj, done) => {
  done(null, obj);
});


app.get('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});