import joi from "joi";

export const categorySchema = joi.object({
    "name": joi.string().required().messages({
        "any.required": "Tên danh mục không được để trống",
        "string.base": "Tên danh mục phải là một chuỗi",
        "string.empty": "Tên danh mục không được để trống",
    })
});