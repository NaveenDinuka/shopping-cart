/**
 * Module Imports
 * */
import config from 'config';

import Router from '../router';
import Sequelize from '../schemas/index';
import RedisCache from '../cache';

import systemRoutes from '../router/systemRoutes';
import userDomain from '../domains/user/routes';

class System {
    constructor() {
        this.initializeApp();
    }
    
    async initializeApp() {
        //- Initializing app router
        this.router = Router.getInstance();

        //- Connect to PostgreSQL
        const sequelize = Sequelize.getInstance();
        await sequelize.connectPostgreSQL();

        //- Connect to Redis Cache
        const redisClient = RedisCache.getInstance();
        await redisClient.initializeRedis();

        //- Domain Routes
        systemRoutes(this.router);
        // userDomain(this.router);
    }
}

export default System;
