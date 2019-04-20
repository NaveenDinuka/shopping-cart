import healthController from '../controllers/healthController';
import userDomainRoutes from '../domains/user/routes';

export default function(route) {
    route.group('/api/v1', [], baseRoute => {
        baseRoute.get('/health-check', healthController.healthCheck);
        baseRoute.group('/user', [], userRoute => userDomainRoutes(userRoute))
    });
}
