import TestUtil from '../TestUtil';
import { apiPrefix, testUser } from '../constants';

let client = null;
let expect = null;
let token = null;

describe('UserController Test Scenario', () => {
    before(async () => {
        const { construct, getClient, expect: _expect } = TestUtil.getInstance();
        client = await getClient();
        expect = _expect;

        await construct.createTestUser();
    });

    after(async () => {
        const { destruct } = TestUtil.getInstance();
        await destruct.deleteTestUser();
    });

    beforeEach((done) => {
        done();
    });

    afterEach((done) => {
        done();
    });

    describe('user sign-out test -- ', () => {

        it('sign-in user', (done) => {
            const { email, password } = testUser;

            client.post(`${ apiPrefix }/user/signin`)
                .send({ email, password })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.property('token');
                    expect(res.body.status).to.equal('OK');
                    expect(res.body.message).to.equal('Sign-in successful');

                    token = res.body.data.token;
                    done();
                });
        });

        it('sign-out user', (done) => {
            const { email, password } = testUser;

            client.post(`${ apiPrefix }/user/auth/signout`)
                .set('Authorization', token)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('message');
                    expect(res.body.status).to.equal('OK');
                    expect(res.body.message).to.equal('Sign-out successful');
                    done();
                });
        });
    });
});
