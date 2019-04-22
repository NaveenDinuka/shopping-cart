import config from 'config';
import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import Logger from "../core/Logger";

let instance = null;
class SequelizeModel {
    static getInstance () {
        if (instance === null) {
            instance = new SequelizeModel();
        }

        return instance;
    }

    async connectPostgreSQL() {
        const { dialect, host, port, username, password, database } = config.database.pgsql;
        try {
            const sequelize = new Sequelize(database, username, password, {
                host: process.env.DB_HOST || host, dialect, port,
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                }
            });

            await sequelize.authenticate();
            Logger.LOG_INFO('PgSQL',  { status: 'Connected to Database Successfully' });

            this.sequelize = sequelize;
            this.importSchemas();

            return { status: 'success' };
        } catch (error) {
            Logger.LOG_ERROR('PgSQL',  { status: 'Error Occurred while Connecting to Database',  error });
            return { status: 'error' };
        }
    }

    importSchemas() {
        const { sequelize } = this;
        const db = {};
        const dir = fs.readdirSync(__dirname);
        const models = dir.filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'));

        models.forEach((file) => {
            const _path = path.join(__dirname, file);
            const model = sequelize.import(_path);
            db[model.name] = model;
        });

        Object.keys(db).forEach(modelName => {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        });

        db.sequelize = sequelize;
        db.Sequelize = Sequelize;
        this.db = db;
    }

    get models() {
        const { db } = this;
        db.Op = Sequelize.Op;
        return db;
    }
}

export default SequelizeModel;
