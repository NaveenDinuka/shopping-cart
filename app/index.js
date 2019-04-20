import http from 'http';
import System from './core/System';

const { router } = new System();
const server = http.createServer((req, res) => { router.handleRoute(req, res) });

server.listen('3000');