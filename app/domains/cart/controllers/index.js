import CartModel from '../models';

const cartController = {
    addToCart: async (req, res) => {
        const cartModel = CartModel.getInstance();

        const { user, body } = req;
        const { productId, qty } = body;

        const data = { userId: user.id, productId, qty };
        const { status, error } = await cartModel.addToCart(data);

        if (status === 'error')
            return res.boom.badRequest(error !== null ? error : 'Something went wrong while adding item into your cart');

        res.boom.success('Item added into your cart successfully');
    },

    removeFromCart: async (req, res) => {
        const cartModel = CartModel.getInstance();

        const { user, body } = req;
        const { productId, qty } = body;

        const data = { userId: user.id, productId, qty };
        const { status, error } = await cartModel.removeFromCart(data);

        if (status === 'error')
            return res.boom.badRequest(error !== null ? error : 'Something went wrong while removing item from your cart');

        res.boom.success('Item removed from your cart successfully');
    },

    getCartInfo: async (req, res) => {
        const cartModel = CartModel.getInstance();
        const { user } = req;

        const { status, data } = await cartModel.fetchCartItems({ where: { userId: user.id } });
        res.boom.success('Cart items fetched successfully', data);
    }
};

export default cartController;