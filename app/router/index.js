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

    group(prefix, middlewares, cb) {
        if (!prefix) prefix = '/';
        if (!middlewares) middlewares = [];

        const routeGroup = this;
        routeGroup.prefix = routeGroup.prefix ? `${ routeGroup.prefix }${ prefix }` : prefix;
        routeGroup.middlewares = this.middlewares ? [ ...routeGroup.middlewares, ...middlewares ] : middlewares;

        cb(routeGroup);
    }

    /**
     * Initialize HTTP routes
     * @param Object:req
     * @param Object:req
     * */
    handleRoute(req, res) {
        res.send = this.send;
        res.boom = new Boom(res);

        const { pathname } = url.parse(req.url, true, true);
        const method = req.method;

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

    makeRoute(path, middlewares) {
        const _path = this.prefix ? `${ this.prefix }${ path }` : path;
        const _middlewares = this.middlewares ? [ ...this.middlewares, ...middlewares ] : middlewares;

        const route = [ _path, ..._middlewares ];
        return route;
    }

    /**
     * Set `GET` route
     * @param Array:route
     * */
    get(path, ...rest) {
        const { GET } = this.routes;
        GET.push( this.makeRoute(path, rest) );
    }

    /**
     * Set `POST` route
     * @param Array:route
     * */
    post(path, ...rest) {
        const { POST } = this.routes;
        POST.push( this.makeRoute(path, rest) );
    }

    /**
     * Set `PUT` route
     * @param Array:route
     * */
    put(path, ...rest) {
        const { PUT } = this.routes;
        PUT.push( this.makeRoute(path, rest) );
    }

    /**
     * Set `DELETE` route
     * @param Array:route
     * */
    delete(path, ...rest) {
        const { DELETE } = this.routes;
        DELETE.push( this.makeRoute(path, rest) );
    }
}

export default Router;