import category from "../models/category";
import Product from "../models/Product";

export const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, _embed } = req.query;

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
        }
        let query = Product.find();
        if (_embed) {
            const embeds = _embed.parseInt(",");
            embeds.forEach(embed => {
                query = query.populate(embed);
            });
        }
        const result = await Product.paginate(query, options);
        const { docs, ...paginationData } = result; // Loại bỏ trường docs từ dữ liệu phân trang
        return res.status(200).json({
            products: docs,
            ...paginationData,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate("category");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({
            message: "Product find successfully",
            product
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Hàm để thêm một sản phẩm mới
export const createProduct = async (req, res) => {
    try {
        const { name, productAttributes, price, image_url, quantity, description, category, tags, sku, rating, reviews, status } = req.body;

        // Kiểm tra xem tất cả các trường cần thiết có tồn tại không
        if (!name || !price || !image_url || !sku || !category) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin cần thiết (name, price, image_url, sku)." });
        }

        // Kiểm tra xem sản phẩm với tên này đã tồn tại chưa
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ message: "Sản phẩm với tên này đã tồn tại" });
        }

        // Tìm các thuộc tính sản phẩm dựa trên danh sách ID
        let attributes = [];
        if (productAttributes && productAttributes.length > 0) {
            attributes = await Attribute.find({ _id: { $in: productAttributes } });
            // Kiểm tra xem tất cả các thuộc tính có tồn tại không
            if (attributes.length !== productAttributes.length) {
                return res.status(400).json({ message: "Một hoặc nhiều thuộc tính không tìm thấy" });
            }
        }

        // Tạo sản phẩm mới với dữ liệu từ request body
        const productData = {
            name,
            price,
            image_url,
            quantity: quantity || 1,  // Sử dụng giá trị mặc định nếu không có
            description,
            rating: rating || 0,       // Sử dụng giá trị mặc định
            reviews: reviews || 0,     // Sử dụng giá trị mặc định
            category,
            tags: tags || [],          // Sử dụng giá trị mặc định
            sku,
            status: status !== undefined ? status : true, // Sử dụng giá trị mặc định
            attributes,
        };
        // return res.status(200).json(productData);
        const product = await Product.create(productData);
        // Trả về phản hồi thành công với mã trạng thái 201 và dữ liệu sản phẩm mới
        return res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, productAttributes, price, image_url, quantity, description, rating, reviews, tags, sku, status } = req.body;
        if (!name || !price || !image_url || !sku || !category) {
            return res.status(400).json({ message: "Please provide all required fields (name, price, image_url, sku, category)." });
        }
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        let attributes = [];
        if (productAttributes && productAttributes.length > 0) {
            attributes = await Attribute.find({ _id: { $in: productAttributes } });
            if (attributes.length !== productAttributes.length) {
                return res.status(400).json({ message: "One or more attributes not found" });
            }
        }
        const productData = {
            name,
            price,
            image_url,
            quantity: quantity || 1,
            description,
            rating: rating || 0,
            reviews: reviews || 0,
            tags: tags || [],
            sku,
            status: status !== undefined ? status : true,
            attributes,
        };
        const product = await Product.findByIdAndUpdate(id, productData, { new: true });
        return res.status(200).json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id", id);

        if (!id) {
            return res.status(400).json({ message: "Product id is required" });
        }
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}