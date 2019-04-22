import productsController from './controllers';
import { filterProduct } from './middlewares/apiDataValidator';

export default function(route) {
    route.get('/all', filterProduct, productsController.getProducts);
    route.get(null, filterProduct, productsController.getProduct);
}
