import jwt from 'jsonwebtoken';
import UserModel from '../models';
import RedisCache from '../../../cache';
import Logger from '../../../core/Logger';

const authMiddleware = {
    async userAuth (req, res, next) {
        if (!req.headers || (req.headers && !req.headers.authorization))
            return res.boom.unauthorized('Authorization failed. Please signin and try again');

        try {
            const { authorization } = req.headers;
            const decodedJWT = jwt.decode(authorization, { complete: true });

            if (!decodedJWT)
                return res.boom.unauthorized('Invalid token provided. Please signin and try again');

            const { tokenKey } = decodedJWT.payload;
            const cachedUser = await RedisCache.getInstance().get(tokenKey);
            if (!cachedUser)
                return res.boom.unauthorized('Invalid token provided. Please signin and try again');

            /**
             * Find user by cached user id extracted from jwt
             * */
            const { status, data } = await UserModel.getInstance().findUser({ where: { id: cachedUser } });
            if (status === 'error' || !data)
                return res.boom.unauthorized('Invalid token provided. Please signin and try again');

            const user = UserModel.formatUser(data);
            if (user) {
                req.user = user;
                req.tokenKey = tokenKey;
                next();
            } else {
                return res.boom.unauthorized('Invalid token provided. Please signin and try again');
            }

        } catch (error) {
            Logger.LOG_ERROR('Auth Middleware', { status: 'Error occurred while authenticating user', error });
            return res.boom.unauthorized('Something went wrong while authorizing user. Please try again');
        }
    },
};

export default authMiddleware;
