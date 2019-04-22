import TestUtil from '../TestUtil';
import { apiPrefix } from '../constants';

let client = null;
let expect = null;
let token = null;

describe('CartController Test Scenario', () => {
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

    describe('cart test -- ', () => {

        it('fetch my cart', (done) => {
            client.get(`${ apiPrefix }/cart`)
                .set('Authorization', token)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('data');
                    expect(res.body.status).to.equal('OK');
                    expect(res.body.message).to.equal('Cart items fetched successfully');
                    expect(res.body.data).to.be.an('array');
                    done();
                });
        });

        it('add item to cart - demo(product 4)', (done) => {
            client.post(`${ apiPrefix }/cart`)
                .set('Authorization', token)
                .send({ productId: 4, qty: 2 })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('message');
                    expect(res.body.status).to.equal('OK');
                    expect(res.body.message).to.equal('Item added into your cart successfully');
                    done();
                });
        });

        it('remove item from cart - demo(product 4)', (done) => {
            client.put(`${ apiPrefix }/cart`)
                .set('Authorization', token)
                .send({ productId: 4, qty: 2 })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('message');
                    expect(res.body.status).to.equal('OK');
                    expect(res.body.message).to.equal('Item removed from your cart successfully');
                    done();
                });
        });

    });
});
