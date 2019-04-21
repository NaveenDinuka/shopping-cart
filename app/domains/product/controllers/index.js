import ProductModel from '../models';

const productController = {
    getProducts: async (req, res) => {
        const { status, data } = await ProductModel.getInstance().fetchProducts();
        if (status === 'error')
            return res.boom.badImplementation('Something went wrong while fetching products');

        res.boom.success('All products', data)
    }
};

export default productController;