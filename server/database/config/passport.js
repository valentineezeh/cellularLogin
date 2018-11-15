import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import SocialAuthController from '../../controller/SocialAuthController';

dotenv.config();

passport.serializeUser((user, done) => {
    done(null, user.email);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

/**
 * configurations for social login
 * strategy takes in an object
 */

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.CALLBACK_URL,
}, SocialAuthController.passportCallback));

export default passport;