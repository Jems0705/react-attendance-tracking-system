import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Login user
// route    POST /auth/sign-in
// @access  public
const authLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const foundUser = await User.findOne({
            $or: [{ email: email }, { prn: email }],
        });

        if (!foundUser) {
            res.status(401);
            throw new Error("Invalid email or password.");
        }

        if (!(await foundUser.matchPassword(password))) {
            res.status(401);
            throw new Error("Invalid email or password.");
        }

        const { accessToken } = generateToken({
            user: { id: foundUser._id, email: foundUser.email },
        });

        res.status(200).json({ accessToken });
    } catch (error) {
        next(error);
    }
};

// @desc    Sign up user
// route    POST /auth/sign-up
// @access  public
const authSignUp = async (req, res, next) => {
    try {
        const { email, prn } = req.body;

        const emailExists = await User.findOne({ email });
        const prnExists = await User.findOne({ prn });

        if (emailExists) {
            res.status(400);
            throw new Error("Email already exists.");
        }

        if (prnExists) {
            res.status(400);
            throw new Error("PRN already exists.");
        }

        const user = await User.create({ ...req.body });

        if (!user) {
            res.status(400);
            throw new Error("Invalid user data.");
        }

        const { accessToken } = generateToken({
            user: { id: user._id, email: user.email },
        });

        res.status(200).json({ accessToken });
    } catch (error) {
        next(error);
    }
};

// @desc    Logout user
// route    POST /auth/logout
// @access  public
const authLogout = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204);

        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });

        res.status(200).json({ message: "Logout success." });
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch user profile
// route    GET /auth/me
// @access  private
const getProfile = async (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        next(error);
    }
};

export { authLogin, authSignUp, authLogout, getProfile };
