import healthController from '../controllers/healthController';

export default function(route) {
    route.get('/api/v1/health-check', healthController.healthCheck);
}
