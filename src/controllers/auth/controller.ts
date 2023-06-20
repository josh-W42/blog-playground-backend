import {Response} from 'express';
import {RequestWithBody} from '../../models/types';
import {userModel} from '../../models';
import {logger} from '../../logger';
import passport from 'passport';

export class AuthController {
  public static login = async (req: RequestWithBody, res: Response) => {
    res.status(200).json({
      message: 'Login Successful',
    });
  };

  public static signUp = async (req: RequestWithBody, res: Response) => {
    const name = req.body?.name;
    const password = req.body?.password;
    if (!name || !password) {
      logger.warn('Problem During Signup Process: Inputs Missing');
      return res.status(400).json({
        message: 'Name or Password Missing',
      });
    }

    // Check if user exists already
    try {
      const user = await userModel.findOne({name});
      if (user) {
        logger.warn(
          'Problem Occurred During Signup: User Name Already Exists.'
        );
        return res.status(500).json({
          message:
            'The Provided User Name Cannot Be Used, Please Choose Another Name.',
        });
      }
    } catch (error) {
      logger.error('Error Occurred During Signup: DB Lookup FAILURE: ', error);
      return res.status(500).json({
        message:
          'An Internal Server Error Has Occurred, Please Try Again Later.',
      });
    }

    const newUser = new userModel({name});

    try {
      const user = await userModel.register(newUser, password);
      passport.authenticate('local');
      await user.save();

      return res.status(200).json({
        message: 'User Signup Successful.',
        user,
      });
    } catch (error) {
      logger.error(
        'Error Occurred During Sign Up: Authentication FAILURE: ',
        error
      );
      return res.status(500).json({
        message: "Error During Signup: Couldn't Create New User.",
      });
    }
  };
}
