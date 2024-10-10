import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import slugify from "slugify";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
});

// Middleware to create slug from name
CategorySchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});
CategorySchema.plugin(mongoosePaginate);
export default mongoose.model("Category", CategorySchema);