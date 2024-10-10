import User from "../models/User";
import { generateToken } from "../utlis/jwt";
import { comparePassword, hashPassword } from "../utlis/password";

export const resgister = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const UserExit = await User.findOne({ email });
        if (UserExit) {
            return res.status(400).json({ message: "Email đã được sử dụng" });
        }
        // Kiểm tra xem có người dùng nào trong hệ thống chưa
        const userCount = await User.countDocuments({});
        // Nếu không có người dùng nào, đặt vai trò là admin, ngược lại là customer
        const role = userCount === 0 ? "admin" : "customer";

        const hashedPassword = await hashPassword(password);
        if (!hashedPassword) {
            return res.status(500).json({ message: "Lỗi mã hóa mật khẩu" });
        }
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
        });
        const user = await User.create(newUser);
        if (!user) {
            return res.status(400).json({ message: "Tạo tài khoản thất bại" });
        }
        user.password = undefined;

        return res.status(200).json({
            message: "Đăng ký thành công",
            user
        });
    } catch (error) {
        if (error.code === 11000) {
            // Lỗi trùng lặp username hoặc email
            const field = Object.keys(error.keyValue)[0]; // Xác định trường bị trùng lặp (username hoặc email)
            if (field === 'username') {
                return res.status(400).json({ message: 'Tên người dùng đã tồn tại, vui lòng chọn tên khác' });
            } else if (field === 'email') {
                return res.status(400).json({ message: 'Email đã được đăng ký, vui lòng sử dụng email khác' });
            }
        }
        return res.status(500).json({ message: error.message });
    }
};
export const login = async (req, res) => {
    try {
        //  nhận dữ liệu từ body
        const { email, password } = req.body;
        //  kiểm tra email có tồn tại ko
        const userExit = await User.findOne({ email })
        if (!userExit) {
            return res.status(400).json({ message: "Email chua duoc dang ky" });
        }
        //  kiểm tra mật khẩu có đúng ko
        const isMatch = await comparePassword(password, userExit.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu không chính xác" });
        }
        //  tạo token
        const token = await generateToken({ _id: userExit._id });
        userExit.password = undefined;

        const newUser = {
            username: userExit.username,
            email: userExit.email,
            role: userExit.role,
        }
        // trả về token
        return res.status(200).json({
            message: "Đăng nhập thành công",
            user: newUser,
            token
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users) {
            return res.status(400).json({ message: "Không tìm thấy user" });
        }
        const newUsers = users.map((user) => {
            user.password = undefined;
            return user;
        });
        return res.status(200).json({ users: newUsers });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: "Không tìm thấy user" });
        }
        user.password = undefined;

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, role, status } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: "Không tìm thấy user" });
        }
        user.username = username;
        user.email = email;
        user.role = role;
        user.status = status;
        await user.save();
        user.password = undefined;
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
