import authMiddleware from '../domains/user/middlewares/authMiddleware';
import healthController from '../controllers/healthController';

import userDomainRoutes from '../domains/user/routes';
import productDomainRoutes from '../domains/product/routes';
import cartDomainRoutes from '../domains/cart/routes';

export default function(route) {
    route.group('/api/v1', [], baseRoute => {
        baseRoute.get('/health-check', healthController.healthCheck);
        baseRoute.group('/user', [], userRoute => userDomainRoutes(userRoute));
        baseRoute.group('/product', [authMiddleware.userAuth], productRoute => productDomainRoutes(productRoute));
        baseRoute.group('/cart', [authMiddleware.userAuth], cartRoute => cartDomainRoutes(cartRoute));

    });
}
