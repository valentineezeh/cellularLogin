import jwt from 'jsonwebtoken';
import db from '../database/models';

const secret = process.env.SECRET_KEY;
const { User } = db;

/**
 * @class SocialAuthController
 *
 */
class SocialAuthController {
    static modelQuery(user, done) {
        User.findOrCreate({
            where: {
                email: user.email
            },
            defaults: user,
        }).spread((foundOrCreated, created) => {
            const { id, email, socialLoginType } = foundOrCreated.dataValues;
            done(null, {
                email, id, socialLoginType, created
            });
        });
    }
    /**
         * @description response function
         * @static
         * @param {object} req
         * @param {object} res
         * @returns {json} json
         * @memberOf SocialAuthController
         */
    static response(req, res) {
        User.findOne({
            where: {
                email: req.user.email,
            }
        }).then((data) => {
            const user = {
                email: data.email,
                token: jwt.sign(
                    {
                        userId: data.id,
                        email: data.email,
                    }, secret, { expiresIn: '1d' }
                ),
            };
            if (req.user.created) {
                return res.status(201).json({
                    message: 'User successfully created', user
                });
            }
            return res.status(200).json({ message: 'authentication successful', user });
        }).catch(err => (err.message));
    }

    /**
           * @description - callback function for strategy
           * @static
           *
           * @param {object} accessToken
           * @param {object} refreshToken
           * @param {object} profile
           * @param {function} done
           *
           * @returns {json} json
           *
           * @memberof SocialAuthController
           *
           */
    static passportCallback(accessToken, refreshToken, profile, done) {
        const userProfile = {
            email: profile.emails[0].value,
            socialLoginType: profile.provider
        };
        SocialAuthController.modelQuery(userProfile, done);
    }
}

export default SocialAuthController;