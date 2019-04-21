import TestUtil from '../TestUtil';
import { apiPrefix, testUser } from '../constants';

let client = null;
let expect = null;

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

    describe('user signin test -- ', () => {
        it('signin user with bad data (error expected)', (done) => {
            const { email } = testUser;

            client.post(`${ apiPrefix }/user/signin`)
                .send({ email })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('message');
                    expect(res.body.status).to.equal('Bad Request');
                    expect(res.body.message).to.equal('Data validation error');
                    done();
                });
        });

        it('signin user with incorrect credentials', (done) => {
            const { email } = testUser;

            client.post(`${ apiPrefix }/user/signin`)
                .send({ email, password: 'invalidPW@123' })
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('message');
                    expect(res.body.status).to.equal('Unauthorized');
                    expect(res.body.message).to.equal('Invalid email or password');
                    done();
                });
        });

        it('signin user', (done) => {
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
                    expect(res.body.message).to.equal('Login successful');
                    done();
                });
        });
    });
});
