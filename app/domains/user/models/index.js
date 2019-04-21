import Schemas from '../../../schemas';
import Logger from '../../../core/Logger';
import UtilsHelper from '../../../helpers/UtilsHelper';

let instance = null;
class UserModel {
    static getInstance () {
        if (instance === null) {
            instance = new UserModel();
        }

        return instance;
    }

    static formatUser({ firstName, lastName, email }) {
        return { firstName, lastName, email };
    }

    /**
     * Create user in DB
     * @param Object:data user's data
     * @return Object:result
     * */
    async createUser(dataset) {
        const { User } = Schemas.getInstance().models;

        const { status: passwordStatus, data: passwordHash } = await UtilsHelper.GEN_PASSWORD_HASH(dataset.password);
        if (passwordStatus === 'error')
            return { status: 'error' };

        try {
            const user = await User.create({ ...dataset, password: passwordHash });
            return { status: 'success', data: user };
        } catch(error) {
            Logger.LOG_ERROR('UserModel', { status: 'Error occurred while creating user', error });
            return { status: 'error', error }
        }
    }

    /**
     * Fetch a particular user by criteria
     * @param Object:criteria
     * @return Object:result
     * */
    async findUser(criteria) {
        const { User } = Schemas.getInstance().models;
        try {
            const user = await User.findOne(criteria);
            return { status: 'success', data: user };
        } catch(error) {
            Logger.LOG_ERROR('UserModel', { status: 'Error occurred while finding user', error });
            return { status: 'error', error }
        }
    }

    /**
     * Delete user by criteria
     * @param Object:criteria
     * @return Object:result
     * */
    async deleteUser(criteria) {
        const { User } = Schemas.getInstance().models;
        try {
            await User.destroy(criteria);
            return { status: 'success' };
        } catch(error) {
            Logger.LOG_ERROR('UserModel', { status: 'Error occurred while deleting user', error });
            return { status: 'error', error }
        }
    }
}

export default UserModel;