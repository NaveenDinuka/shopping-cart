import http from 'http';
import System from './core/System';

const system = new System();
const init = async () => {
    await system.initializeApp();
    const server = http.createServer((req, res) => { system.router.handleRoute(req, res) });
    server.listen('3000');

    return server;
};

export default init();