import healthController from '../controllers/healthController';

export default function(route) {
    route.group('/api/v1', [], r => {
        r.get('/health-check', healthController.healthCheck);
    });
}
