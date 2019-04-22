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

        const { status, data: items } = await cartModel.fetchCartItems({ where: { userId: user.id } });
        if (status === 'error')
            return res.boom.badRequest('Something went wrong while gathering your cart info');

        const total = items.reduce((total, item) => {
            const { qty, product: { unitPrice } } = item;
            const itemQty = Number(qty);
            const itemUnitPrice = Number(unitPrice);
            const itemTotal = (itemUnitPrice * itemQty).toFixed(2);

            item.total = Number(itemTotal);
            return total + item.total;
        }, 0);

        res.boom.success('Cart items fetched successfully', { total, items });
    }
};

export default cartController;