class Boom {
    constructor(res) {
        this.res = res;
    }

    makeJson(statusCode, message, data) {
       const codes = {
           200: 'OK',

           400: 'Bad Request',
           401: 'Unauthorized',
           403: 'Forbidden',
           404: 'Not Found',

           500: 'Internal Server Error',
           501: 'Not Implemented',
           502: 'Bad Gateway',
       };

        return {
            status: codes[statusCode], message, data
        }
    }

    success(message, data) {
        const { res, makeJson } = this;
        res.send(200).json(makeJson(200, message, data));
    }

    badRequest(message) {
        const { res, makeJson } = this;
        res.send(400).json(makeJson(400, message));
    }

    badImplementation(message) {
        const { res, makeJson } = this;
        res.send(500).json(makeJson(500, message));
    }
}

export default Boom;