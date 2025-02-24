import Joi from "joi";

const userAuthValidator = Joi.object({
    username: Joi.string().required().messages({
        "string.empty": "Введіть будь ласка ваш логін",
    }),
    password: Joi.string().required().messages({
        "string.empty": "Введіть будь ласка ваш пароль"
    })
})

export default userAuthValidator;