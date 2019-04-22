import Router from './index';
class Route {
    constructor() {
        this.middlewares = Router.getInstance().middlewares;
    }

    group(prefix, middlewares, cb) {
        if (!prefix) prefix = '/';
        if (!middlewares) middlewares = [];

        const routeGroup = new Route();
        routeGroup.prefix = this.prefix ? `${ this.prefix }${ prefix }` : prefix;
        routeGroup.middlewares = this.middlewares ? [ ...this.middlewares, ...middlewares ] : middlewares;

        cb(routeGroup);
    }

    makeRoute(path, middlewares) {
        const _path = this.prefix && path ? `${ this.prefix }${ path }` : this.prefix ? this.prefix : path;
        const _middlewares = this.middlewares ? [ ...this.middlewares, ...middlewares ] : middlewares;

        const route = [ _path, ..._middlewares ];
        return route;
    }

    /**
     * Set `GET` route
     * @param Array:route
     * */
    get(path, ...rest) {
        const { GET } = Router.getInstance().routes;
        GET.push( this.makeRoute(path, rest) );
    }

    /**
     * Set `POST` route
     * @param Array:route
     * */
    post(path, ...rest) {
        const { POST } = Router.getInstance().routes;
        POST.push( this.makeRoute(path, rest) );
    }

    /**
     * Set `PUT` route
     * @param Array:route
     * */
    put(path, ...rest) {
        const { PUT } = Router.getInstance().routes;
        PUT.push( this.makeRoute(path, rest) );
    }

    /**
     * Set `DELETE` route
     * @param Array:route
     * */
    delete(path, ...rest) {
        const { DELETE } = Router.getInstance().routes;
        DELETE.push( this.makeRoute(path, rest) );
    }
}

export default Route;