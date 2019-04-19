import url from 'url';

const pathPrefix = '/:0.0.0';
let instance = null;
class Router {
    static getInstance() {
        if (instance === null) {
            instance = new Router();
        }

        return instance;
    }

    constructor() {
        this.routes = {
            GET: [],
            POST: [],
            PUT: [],
            DELETE: [],
        };
    }

    /**
     * Initialize HTTP routes
     * @param Object:req
     * @param Object:req
     * */
    initialize(req, res) {
        res.send = this.send;

        const { pathname } = url.parse(req.url, true, true);
        const method = req.method;

        this.routes[method].forEach(async ([route, ...rest]) => {
            const _route = `${ pathPrefix }${ route }`;

            if (pathname === _route) {
                for (let func of rest) {
                    if (res.finished)
                       return;

                    const prom = new Promise(resolve => res.resolve = resolve);
                    await func(req, res, () => { res.resolve() });
                    await prom;
                }
            }
        });
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
                res.resolve();
            }
        }
    }

    /**
     * Set `GET` route
     * @param Array:route
     * */
    get(...route) {
        this.routes.GET.push(route);
    }

    /**
     * Set `POST` route
     * @param Array:route
     * */
    post(...route) {
        this.routes.POST.push(route);
    }

    /**
     * Set `PUT` route
     * @param Array:route
     * */
    put(...route) {
        this.routes.PUT.push(route);
    }

    /**
     * Set `DELETE` route
     * @param Array:route
     * */
    delete(...route) {
        this.routes.DELETE.push(route);
    }
}

export default Router;