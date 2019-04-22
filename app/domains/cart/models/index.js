import Schemas from '../../../schemas';
import Logger from '../../../core/Logger';
import ProductModel from '../../product/models';

let instance = null;
class CartModel {
    static getInstance () {
        if (instance === null) {
            instance = new CartModel();
        }

        return instance;
    }

    static formatCartItem(cartItem) {
        const { id, userId, productId, qty, product } = cartItem;
        const formattedProduct = ProductModel.formatProduct(product);

        return {
            id, userId, productId, qty,
            product: { ...formattedProduct }
        };
    }

    /**
     * Add data to cart
     * @param Object:data
     * @return Object:result
     * */
    addToCart(data) {
        const { sequelize, models: { Product, Cart } } = Schemas.getInstance();

        const { userId, productId, qty } = data;

        return sequelize.transaction(transaction => {

            return Product.findOne({ where : {  id: productId } }, { transaction })
                .then(product => {
                    if (product.qty <= 0) throw new Error('Sorry, requested quantity of products not available in the stock');

                    const productQty = Number(product.qty) - Number(qty);
                    return product.update({ qty: productQty }, { transaction })
                        .then(() => {

                            return Cart.findOne({ where: { id: 1 } }, { transaction })
                                .then(cartItem => {
                                    if (cartItem === null) {
                                        return Cart.create({ userId, productId, qty }, { transaction });
                                    } else {
                                        const itemQty = Number(cartItem.qty) + Number(qty);
                                        return cartItem.update({ qty: itemQty }, { transaction });
                                    }
                                });
                        });
                });
        })
            .then(() => {
                return { status: 'success' };
            })
            .catch(error => {
                Logger.LOG_ERROR('CartModel', { status: 'Error occurred while adding item to cart', error });
                return { status: 'error', error: error.message };
            });
    }

    /**
     * Find user cart
     * @param Object:criteria
     * @return Object:result
     * */
    async removeFromCart(data) {
        const { sequelize, models: { Product, Cart } } = Schemas.getInstance();

        const { userId, productId, qty } = data;

        return sequelize.transaction(transaction => {
            return Cart.findOne({ where: {userId, productId  } })
                .then(cartItem => {
                    if (cartItem === null)
                        throw Error('Sorry, cart item could not be found');

                    if (qty > cartItem.qty)
                        throw Error('Sorry, invalid item quantity to remove');

                    const itemQty = Number(cartItem.qty) - Number(qty);

                    if (itemQty === 0) {
                        return cartItem.destroy();
                    } else {
                        return cartItem.update({ qty: itemQty }, { transaction })
                            .then(() => {

                                return Product.findOne({ where : {  id: productId } }, { transaction })
                                    .then(product => {
                                        const productQty = Number(product.qty) + Number(qty);
                                        return product.update({ qty: productQty }, { transaction })
                                    });
                            });
                    }
                });
        })
            .then(() => {
                return { status: 'success' };
            })
            .catch(error => {
                Logger.LOG_ERROR('CartModel', { status: 'Error occurred while removing item from cart', error });
                return { status: 'error', error: error.message };
            });
    }

    /**
     * Fetch cart items by given criteria
     * @param Object:criteria
     * @return Object:result
     * */
    async fetchCartItems(criteria) {
        const { Cart, Product } = Schemas.getInstance().models;
        try {
            const cartItems = await Cart.findAll({
                ...criteria,
                include: [{ model: Product, as: 'product' }]
            });

            const formattedCartItems = cartItems.map(ci => CartModel.formatCartItem(ci));
            return { status: 'success', data: formattedCartItems };
        } catch(error) {
            Logger.LOG_ERROR('CartModel', { status: 'Error occurred while fetching cart items', error });
            return { status: 'error', error }
        }
    }
}

export default CartModel;