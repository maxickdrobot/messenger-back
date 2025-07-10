import bcrypt from "bcrypt";
import * as usersService from "./users.service.js";
import { ErrorCodes } from "../../../constants/errorCodes.js";

export const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);
        const newUser = await usersService.addUser({
            username,
            email,
            password: hash,
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            error: {
                code: ErrorCodes.INTERNAL_SERVER_ERROR,
                message: "Failed to register user",
            },
        });
    }
};

export const login = (req, res) => {
    const { user } = req;

    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    });
};

export const logout = (req, res) => {
    try {
        return req.logout((error) => {
            if (error) {
                return res.status(500).json({
                    error: {
                        code: ErrorCodes.INTERNAL_SERVER_ERROR,
                        message: "Logout failed",
                    },
                });
            }

            return res.status(200).json({
                message: "Logout successful",
            });
        });
    } catch (error) {
        return res.status(500).json({
            error: {
                code: ErrorCodes.INTERNAL_SERVER_ERROR,
                message: "Unexpected error during logout",
            },
        });
    }
};
