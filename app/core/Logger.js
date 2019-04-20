import config from 'config';
import Bunyan from 'bunyan';
import PrettyStream from 'bunyan-prettystream';
import moment from 'moment';
import fs from 'fs';

const { path, info, error } = config.logs;
const prettyStream = new PrettyStream();
prettyStream.pipe(process.stdout);

let instance = null;
class Logger {
    constructor() {
        console.log('creating');
        fs.mkdirSync(path);
    }

    static getInstance () {
        if (instance === null) {
            instance = new Logger();
        }

        return instance;
    }

    static LOG_INFO(name, data) {
        const log = {
            loggedAt: moment().format(), data
        };

        const loggerOptions = {
            name,
            streams: [
                {
                    level: 'info',
                    path: `${ path }/sc-${ info }`
                }
            ]
        };

        const bunyan = Bunyan.createLogger(loggerOptions);
        bunyan.info(log);
    }

    static LOG_ERROR(name, data) {
        const log = {
            loggedAt: moment().format(), data
        };
        const loggerOptions = {
            name,
            streams: [
                {
                    level: 'error',
                    path: `${ path }/sc-${ error }`
                }
            ]
        };

        const bunyan = Bunyan.createLogger(loggerOptions);
        bunyan.error(log);
        
        if (process.env.NODE_ENV !== 'production') console.error(name, data);
    }
}

export default Logger;