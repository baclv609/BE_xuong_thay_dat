import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().min(3).required().messages({
        "string.min": "Tên người dùng phải có ít nhất 3 ký tự",
        "any.required": "Tên người dùng không được để trống",
        "string.base": "Tên người dùng phải là một chuỗi",
        "string.max": "Tên người dùng không được quá 255 ký tự",

    }),
    email: Joi.string().email().required().messages({
        "string.email": "Vui lòng cung cấp một địa chỉ email",
        "any.required": "Email không được để trống",
        "string.base": "Email phải là một chuỗi",
        "string.empty": "Email không được để trống",
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
        "any.required": "Mật khẩu không được để trống",
        "string.base": "Mật khẩu phải là một chuỗi",
        "string.max": "Mật khẩu không được quá 255 ký tự",
        "string.empty": "Mật khẩu không được để trống",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "confirmPassword không khớp",
        "any.required": "confirmPassword không được để trống",
        "string.base": "confirmPassword phải là một chuỗi",
        "string.empty": "confirmPassword không được để trống",
    }),

})

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Vui lòng cung cấp một địa chỉ email",
        "any.required": "Email không được để trống",
        "string.base": "Email phải là một chuỗi",
        "string.empty": "Email không được để trống",
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
        "any.required": "Mật khẩu không được để trống",
        "string.base": "Mật khẩu phải là một chuỗi",
        "string.max": "Mật khẩu không được quá 255 ký tự",
        "string.empty": "Mật khẩu không được để trống",
    }),
});