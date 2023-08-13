import {Router} from 'express';
import {AuthController} from '../../controllers';
import passport from 'passport';

export const auth = Router();
auth.post(
  '/login',
  passport.authenticate('local', {session: false}),
  AuthController.login
);
auth.post('/signup', AuthController.signUp);
