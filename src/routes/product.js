import { Router } from "express";
import { createProduct, deleteProducts, getProductById, getProducts, updateProduct } from "../controllers/product";
import { validBodyRequest } from "../middleware/validBodyRequest";
import { productSchema } from "../validSchema/product";

const productRouter = Router();

productRouter.get("/", getProducts);// get all
productRouter.get("/:id", getProductById);// get by id

productRouter.post("/", validBodyRequest(productSchema), createProduct);// add
productRouter.put("/:id", validBodyRequest(productSchema), updateProduct);// update

productRouter.delete("/:id", deleteProducts);// delete

export default productRouter;