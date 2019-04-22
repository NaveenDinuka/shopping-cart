import Joi from 'joi';
import Logger from '../../../core/Logger';

const filterProductSchema = Joi.object().keys({
    id: Joi.string().optional(),
    author: Joi.string().optional(),
    country: Joi.string().optional(),
    language: Joi.string().optional(),
    link: Joi.string().optional(),
    pages: Joi.string().optional(),
});

const filterProduct = (req, res, next) => {
    const result = Joi.validate(req.query, filterProductSchema);
    const { error } = result;

    if (error) {
        res.boom.badRequest('Data validation error');
        Logger.LOG_ERROR(error);
    }

    next();
};

export { filterProduct };