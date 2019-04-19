import http from 'http';
import Router from './router';
import systemRoutes from './router/systemRoutes';

const router = Router.getInstance();
const server = http.createServer((req, res) => { router.initialize(req, res) });
systemRoutes(router);

server.listen('3000');