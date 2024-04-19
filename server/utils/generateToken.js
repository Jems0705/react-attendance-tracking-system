import jwt from "jsonwebtoken";

const generateToken = (payload, options) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: "12h",
    });

    return { accessToken };
};

export default generateToken;
