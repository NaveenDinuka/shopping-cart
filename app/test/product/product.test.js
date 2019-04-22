import TestUtil from '../TestUtil';
import { apiPrefix, testUser } from '../constants';

let client = null;
let expect = null;
let token = null;

describe('ProductController Test Scenario', () => {
    before(async () => {
        const { getClient, expect: _expect, construct } = TestUtil.getInstance();
        client = await getClient();
        expect = _expect;

        await construct.createTestUser();
        token = await construct.signIn();
    });

    after(async () => {
        const { destruct } = TestUtil.getInstance();
        await destruct.signOut(token);
        await destruct.deleteTestUser();
    });

    beforeEach((done) => {
        done();
    });

    afterEach((done) => {
        done();
    });

    describe('product test -- ', () => {

        it('fetch all products (without filter)', (done) => {
            client.get(`${ apiPrefix }/product/all`)
                .set('Authorization', token)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('data');
                    expect(res.body.status).to.equal('OK');
                    expect(res.body.message).to.equal('All products');
                    expect(res.body.data).to.be.an('array');
                    done();
                });
        });

        it('fetch all products (with filter)', (done) => {
            client.get(`${ apiPrefix }/product/all`)
                .set('Authorization', token)
                .query({ country: 'United Kingdom' })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('data');
                    expect(res.body.status).to.equal('OK');
                    expect(res.body.message).to.equal('All products');
                    expect(res.body.data).to.be.an('array');
                    done();
                });
        });

        it('find product', (done) => {
            client.get(`${ apiPrefix }/product`)
                .set('Authorization', token)
                .query({ id: 2 })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('data');
                    expect(res.body.status).to.equal('OK');
                    expect(res.body.message).to.equal('Filtered Product');
                    expect(res.body.data).to.be.an('object');
                    done();
                });
        });

    });
});
