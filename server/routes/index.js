import passport from 'passport';
import express from 'express';
import path from 'path';
import UserInputValidation from '../middleware/UserInputValidate';
import UserController from '../controller/UserController';
import SocialAuthController from '../controller/SocialAuthController';


const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.sendFile(path.resolve('client/index.html'));
});

// Login route
router.post(
  '/api/user/login',
  UserInputValidation.loginInputValidation,
  UserController.loginUser
);

router.get('/api/user/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));


router.get('/api/user/login/google/callback', passport.authenticate('google'),
  SocialAuthController.response);


export default router;
