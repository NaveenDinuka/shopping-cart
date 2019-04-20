import UserModel from '../models';

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
    }
};

export default userController;