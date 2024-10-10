import jwt from "jsonwebtoken";

export const generateToken = (payload, expiresIn = "3d") => {
    return jwt.sign(payload, "baclv", { expiresIn });
}
export const verifyToken = (token) => {
    return jwt.verify(token, "baclv");
};