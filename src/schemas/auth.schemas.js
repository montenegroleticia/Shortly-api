import joi from "joi";

export const singUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
  confirmPassword: joi
    .string()
    .valid(joi.ref("password"))
    .equal(joi.ref("password"))
    .required(),
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
