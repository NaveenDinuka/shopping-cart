import config from 'config';
import jwt from 'jsonwebtoken';
import UserModel from '../models';
import UtilsHelper from '../../../helpers/UtilsHelper';
import UUID from '../../../core/UUID';
import RedisCache from '../../../cache';

const { secretOrKey } = config.auth;
const userController = {
    signup: async (req, res) => {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword)
            return res.boom.badRequest('Password and confirm password should be identical');


        const dataset = { firstName, lastName, email, password };

        /**
         * Validate user email
         * */
        const { status: findUserStatus, data: user } = await UserModel.getInstance().findUser({ where: { email } });
        if (findUserStatus === 'error')
            return res.boom.badImplementation('Something went wrong while verifying user email');
        else if (findUserStatus === 'success' && user)
            return res.boom.badRequest('Sorry, the email you entered is already taken by another profile. Please try again with another email');

        /**
         * Create user with the provided data
         * */
        const { status: createUserStatus } = await UserModel.getInstance().createUser(dataset);
        if (createUserStatus === 'error')
            return res.boom.badImplementation('Something went wrong while creating the user account');

        res.boom.success('Your account is created successfully')
    },

    signin: async (req, res) => {
        const userModel = UserModel.getInstance();
        const cache = RedisCache.getInstance();

        const { email, password } = req.body;
        const { status: userStatus, data: user } = await userModel.findUser({ where: { email } });

        if (userStatus == 'error' || !user)
            return res.boom.unauthorized('Invalid email or password');

        /**
         * Compare user API password with DB password of the particular user
         * */
        const { status: passwordStatus, data: compareResult } = await UtilsHelper.COMPARE_PASSWORD(password, user.password);
        if (passwordStatus == 'error' || !compareResult)
            return res.boom.unauthorized('Invalid email or password');

        /**
         * Generate user json web token and store token key in redis cache
         * */
        const tokenKey = UUID.timeStampUUID();
        const payload = { tokenKey };
        const token = jwt.sign(payload, secretOrKey);
        cache.set(tokenKey, user.id);

        const formattedUser = UserModel.formatUser(user);
        res.boom.success('Sign-in successful', { user: formattedUser, token });
    },

    signout: async (req, res) => {
        const { tokenKey } = req;
        const cache = RedisCache.getInstance();

        cache.del(tokenKey);
        res.boom.success('Sign-out successful');
    },

    updateUser: async (req, res) => {
        const { user, body } = req;
        const userModel = UserModel.getInstance();

        const { status } = await userModel.updateUser({ where: { id: user.id } }, body);
        if (status == 'error')
            return res.boom.unauthorized('Something went wrong while updating user');

        res.boom.success('User data updated successfully');
    }
};

export default userController;