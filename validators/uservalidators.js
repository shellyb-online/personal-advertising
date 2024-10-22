import Joi from "joi";

export const userRegisterValidator = Joi.object({
    firstname: Joi.String().required(),
    lastname: Joi.String().required(),
    email: Joi.String(),
    password: Joi.String(),
    role: Joi.String().required(),
});

export const userLoginValidator = Joi.object({
 emai: Joi.String(),
 password: Joi.String()
});