import chaiHttp from 'chai-http';
import superTest from 'supertest';
import server from '../index';
import chai from 'chai';

import { apiPrefix, testUser } from './constants';
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

    get construct() {
        return {
            createTestUser: async () => {
                const userModel = UserModel.getInstance();
                await userModel.createUser(testUser);
            },
            signIn: async () => {
                const { email, password } = testUser;
                const client = await this.getClient();

                return new Promise(resolve => {
                    client.post(`${ apiPrefix }/user/signin`)
                        .send({ email, password })
                        .end((err, res) => {
                            const { token } = res.body.data;
                            resolve(token);
                        });
                });
            }
        }
    }

    get destruct() {
        return {
            deleteTestUser: async () => {
                const userModel = UserModel.getInstance();
                await userModel.deleteUser({ where: { email: testUser.email } });
            },
            signOut: async (token) => {
                const client = await this.getClient();
                return new Promise(resolve => {
                    client.post(`${ apiPrefix }/user/auth/signout`)
                        .set('Authorization', token)
                        .end(() => {
                            resolve()
                        });
                });
            }
        }
    }

}

export default TestUtil;