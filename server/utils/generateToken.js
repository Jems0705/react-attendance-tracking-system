import jwt from "jsonwebtoken";

const generateToken = (res, payload, options) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });

    if (options?.onlyAccessToken) {
        return { accessToken };
    }
    const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {
            expiresIn: "1d",
        }
    );

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
};

export default generateToken;
