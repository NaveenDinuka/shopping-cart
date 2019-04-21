import TestUtil from '../TestUtil';
import { apiPrefix, testUser } from '../constants';

let client = null;
let expect = null;

describe('UserController Test Scenario', () => {
    before(async () => {
        const { getClient, expect: _expect } = TestUtil.getInstance();
        client = await getClient();
        expect = _expect;
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

    describe('user sign-up test -- ', () => {
        it('sign-up user with bad data (error expected)', (done) => {
            const { firstName, lastName, email, password } = testUser;

            client.post(`${ apiPrefix }/user/signup`)
                .send({ firstName, lastName, email, password })
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

        it('sign-up user', (done) => {
            client.post(`${ apiPrefix }/user/signup`)
                .send(testUser)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('message');
                    expect(res.body.status).to.equal('OK');
                    expect(res.body.message).to.equal('Your account is created successfully');
                    done();
                });
        });

        it('validate user email existence', (done) => {
            client.post(`${ apiPrefix }/user/signup`)
                .send(testUser)
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('message');
                    expect(res.body.status).to.equal('Bad Request');
                    expect(res.body.message).to.equal('Sorry, the email you entered is already taken by another profile. Please try again with another email');
                    done();
                });
        });
    });
});
