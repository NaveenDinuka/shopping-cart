import productsController from './controllers';

export default function(route) {
    route.get('/all', productsController.getProducts);
}
