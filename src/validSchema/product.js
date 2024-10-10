import joi from "joi";
import category from "../models/category";

export const productSchema = joi.object({
    name: joi.string().required().messages({
        "any.required": "Tên sản phẩm không được để trống",
        "string.base": "Tên sản phẩm phải là một chuỗi",
        "string.empty": "Tên sản phẩm không được để trống",
    }),
    price: joi.number().required().messages({
        "any.required": "Giá sản phẩm không được để trống",
        "number.base": "Giá sản phẩm phải là một số",
        "number.empty": "Giá sản phẩm không được để trống",
    }),
    image_url: joi.string().required().messages({
        "any.required": "Link ảnh sản phẩm không được để trống",
        "string.base": "Link ảnh sản phẩm phải là một chuỗi",
        "string.empty": "Link ảnh sản phẩm không được để trống",
    }),
    quantity: joi.number().required().messages({
        "any.required": "Số lượng sản phẩm không được để trống",
        "number.base": "Số lượng sản phẩm phải là một số",
        "number.empty": "Số lượng sản phẩm không được để trống",
    }),
    description: joi.string().required().messages({
        "any.required": "Mô tả sản phẩm không được để trống",
        "string.base": "Mô tả sản phẩm phải là một chuỗi",
        "string.empty": "Mô tả sản phẩm không được để trống",
    }),
    rating: joi.number().messages({
        "number.base": "Rating sản phẩm phải là một số",
    }),
    reviews: joi.number().messages({
        "number.base": "Reviews sản phẩm phải là một số",
    }),
    tags: joi.array().messages({
        "array.base": "Tags sản phẩm phải là một mảng",
    }),
    sku: joi.string().required().messages({
        "any.required": "SKU sản phẩm không được để trống",
        "string.base": "SKU sản phẩm phải là một chuỗi",
        "string.empty": "SKU sản phẩm không được để trống",
    }),
    status: joi.boolean().messages({
        "boolean.base": "Trạng thái sản phẩm phải là một boolean",
    }),
    category: joi.string().required().messages({
        "any.required": "Danh mục sản phẩm không được để trống",
        "string.base": "Danh mục sản phẩm phải là một chuỗi",
        "string.empty": "Danh mục sản phẩm không được để trống",
    }),
});