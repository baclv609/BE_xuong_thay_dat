
import { Router } from "express";
import { createCategory, deleteCategory, getCategoryById, getCategories, updateCategory } from "../controllers/category";
import { validBodyRequest } from "../middleware/validBodyRequest";
import { categorySchema } from "../validSchema/category";

const categoryRouter = Router();

categoryRouter.get("/", getCategories); // get all
categoryRouter.get("/:id", getCategoryById); // get by id

categoryRouter.post("/", validBodyRequest(categorySchema), createCategory); // add
categoryRouter.put("/:id", validBodyRequest(categorySchema), updateCategory); // update

categoryRouter.delete("/:id", deleteCategory); // delete

export default categoryRouter;