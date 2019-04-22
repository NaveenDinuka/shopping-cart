import config from 'config';
import Bunyan from 'bunyan';
import PrettyStream from 'bunyan-prettystream';
import moment from 'moment';
import fs from 'fs';

const { path, info, error } = config.logs;
const prettyStream = new PrettyStream();
prettyStream.pipe(process.stdout);

class Logger {
    constructor() {
        fs.mkdirSync(path);
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
