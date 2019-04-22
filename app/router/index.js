import url from 'url';
import Boom from '../boom';

let instance = null;
class Router {
    static getInstance() {
        if (instance === null) {
            instance = new Router();
        }

        return instance;
    }

    constructor() {
        this.middlewares = [];
        this.routes = {
            GET: [],
            POST: [],
            PUT: [],
            DELETE: [],
        };
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }


    /**
     * Initialize HTTP routes
     * @param Object:req
     * @param Object:req
     * */
    handleRoute(req, res) {
        res.send = this.send;
        res.boom = new Boom(res);

        const { pathname, query } = url.parse(req.url, true, true);
        const method = req.method;
        req.query = query;

        let hasRoute = false;
        this.routes[method].forEach(async ([ route, ...rest ]) => {
            if (pathname === route) {
                hasRoute = true;

                for (let func of rest) {
                    if (res.finished)
                        return;

                    try {
                        const prom = new Promise(resolve => res.resolve = resolve);
                        await func(req, res, () => { res.resolve() });
                        await prom;
                    } catch (e) {
                        res.boom.badImplementation();
                    }
                }
            }
        });

        if (!hasRoute) {
            res.send(404).json({ message: 'not found' });
        }
    }

    /**
     * Send HTTP Response
     * @param int:statusCode
     * @return Object { func }
     * */
    send(statusCode) {
        const res = this;
        res.statusCode = statusCode;

        return {
            json: (data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));

                if (res.resolve)
                    res.resolve();
            }
        }
    }
}

export default Router;