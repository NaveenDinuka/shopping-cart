/**
 * Module Imports
 * */
import config from 'config';
import bodyParser from 'body-parser';

import Router from '../router';
import Sequelize from '../schemas/index';
import RedisCache from '../cache';

import systemRoutes from '../router/systemRoutes';
class System {
    async initializeApp() {
        //- Initializing app router
        this.router = Router.getInstance();
        this.router.use(bodyParser.json({ limit: "100mb" }));
        this.router.use(bodyParser.urlencoded({ extended: false }));

        //- Connect to PostgreSQL
        const sequelize = Sequelize.getInstance();
        await sequelize.connectPostgreSQL();

        //- Connect to Redis Cache
        const redisClient = RedisCache.getInstance();
        await redisClient.initializeRedis();

        //- System Routes
        systemRoutes(this.router);
    }
}

export default System;
