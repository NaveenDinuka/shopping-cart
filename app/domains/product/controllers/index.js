import ProductModel from '../models';

const productController = {
    getProducts: async (req, res) => {
        const { query } = req;
        const { status, data } = await ProductModel.getInstance().fetchProducts({ where: { ...query } });
        if (status === 'error')
            return res.boom.badImplementation('Something went wrong while fetching products');

        res.boom.success('All products', data);
    },

    getProduct: async (req, res) => {
        const { query } = req;
        const { status, data } = await ProductModel.getInstance().findProduct({ where: { ...query } });

        if (status === 'error' || !data)
            return res.boom.badImplementation('Something went wrong while finding product');

        const product = ProductModel.formatProduct(data);
        res.boom.success('Filtered Product', { product });
    }
};

export default productController;