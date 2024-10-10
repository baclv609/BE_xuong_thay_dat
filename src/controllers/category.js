import category from "../models/category";
import slugify from "slugify";

export const getCategories = async (req, res) => {
    try {
        const categories = await category.find();
        return res.status(200).json({
            message: "Categories fetched successfully",
            categories
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const slug = slugify(name, { lower: true });

        const existingCategory = await category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Danh mục này đã tồn tại" });
        }

        const newCategory = await category.create({ name, slug });

        return res.status(201).json({
            message: "Category created successfully",
            category: newCategory
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
};
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const exitCategory = await category.findById(id);
        if (!exitCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({
            message: "Category fetched successfully",
            category: exitCategory
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
};
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const slug = slugify(name, { lower: true });

        const existingCategory = await category.findById(id);
        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        const updatedCategory = await category.findByIdAndUpdate(id, { name, slug }, { new: true });
        return res.status(200).json({
            message: "Category updated successfully",
            category: updatedCategory
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Category id is required" });
        }
        const existingCategory = await category.findById(id);
        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        await category.findByIdAndDelete(id);
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};