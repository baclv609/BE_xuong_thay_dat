import express from "express";
import cors from "cors";
import connectDB from "./src/config/connectDB";
import router from "./src/routes";


const app = express();

// Middleware
app.use(cors()); // cho phép các domain khác gọi API của bạn
app.use(express.json()); // sử dụng middleware để parse dữ liệu từ body của request
app.use(express.urlencoded({ extended: true })); // sử dụng middleware để parse dữ liệu từ form

connectDB();

app.use("/api", router);
const errorNotFound = (req, res, next) => {
    const error = new Error(`Not found`);
    error.status = 404;
    next(error);
};

const errorCommon = (err, req, res, next) => {
    return res.status(err.status || 500).json({
        message: err.message || "Loi server",
    });
};

app.use(errorNotFound, errorCommon);
export const viteNodeApp = app;