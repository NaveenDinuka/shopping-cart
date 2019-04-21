import chaiHttp from 'chai-http';
import superTest from 'supertest';
import server from '../index';
import chai from 'chai';

import { testUser } from './constants';
import UserModel from '../domains/user/models';

chai.use(chaiHttp);
let instance = null;
class TestUtil {
    static getInstance() {
        if (instance === null) {
            instance = new TestUtil();
        }

        return instance;
    }

    async getClient() {
        const app = await server;
        const client = superTest.agent(app);

        return client;
    }

    get expect() {
        return chai.expect;
    }

    get destruct() {
        return {
            deleteTestUser: async () => {
                const userModel = UserModel.getInstance();
                await userModel.deleteUser({ where: { email: testUser.email } });
            }
        }
    }

}

export default TestUtil;