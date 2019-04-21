import Joi from 'joi';
import Logger from '../../../core/Logger';

const signupSchema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required(),
    confirmPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required(),
});

const signinSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required(),
});

const signup = (req, res, next) => {
    const result = Joi.validate(req.body, signupSchema);
    const { error } = result;

    if (error) {
        res.boom.badRequest('Data validation error');
        Logger.LOG_ERROR(error);
    }

    next();
};

const signin = (req, res, next) => {
    const result = Joi.validate(req.body, signinSchema);
    const { error } = result;

    if (error) {
        res.boom.badRequest('Data validation error');
        Logger.LOG_ERROR(error);
    }

    next();
};

export { signup, signin };