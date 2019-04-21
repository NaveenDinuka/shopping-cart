import Schemas from '../../../schemas';
import Logger from '../../../core/Logger';

let instance = null;
class ProductModel {
    static getInstance () {
        if (instance === null) {
            instance = new ProductModel();
        }

        return instance;
    }

    static formatProduct({ id, author, country, language, link, pages, title, qty, unitPrice, version }) {
        return { id, author, country, language, link, pages, title, qty, unitPrice, version };
    }

    /**
     * Fetch products by given criteria
     * @param Object:criteria
     * @return Object:result
     * */
    async fetchProducts(criteria) {
        const { Product } = Schemas.getInstance().models;
        try {
            const products = await Product.findAll(criteria);
            const formattedProducts = products.map(pr => ProductModel.formatProduct(pr));

            return { status: 'success', data: formattedProducts };
        } catch(error) {
            Logger.LOG_ERROR('ProductModel', { status: 'Error occurred while fetching products', error });
            return { status: 'error', error }
        }
    }
}

export default ProductModel;