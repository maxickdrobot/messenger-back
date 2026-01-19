import bcrypt from "bcrypt";
import * as usersService from "./users.service.js";
import { ErrorCodes } from "../../../constants/errorCodes.js";
import { generateEmailToken } from "../../../utils/jwt.util.js";
import { sendVerificationEmail } from "../../../utils/resend.util.js";
import jwt from "jsonwebtoken";

// export const registrationRequest = async (req, res) => {
//     const { email, password, username, message = "" } = req.body;

//     try {
//         const hash = await bcrypt.hash(password, 10);
//         const newRequest = await usersService.createRegistrationRequest({
//             username,
//             email,
//             password: hash,
//             message,
//         });

//         return res.status(201).json({
//             message: "Request submitted, wait for admin approval",
//         });
//     } catch (error) {
//         return res.status(500).json({
//             error: {
//                 code: ErrorCodes.INTERNAL_SERVER_ERROR,
//                 message: "Failed to submit request",
//             },
//         });
//     }
// };

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    const newUser = await usersService.createUser({
      username,
      email,
      password: hash,
      isVerified: false,
    });

    const token = generateEmailToken(newUser._id);

    await sendVerificationEmail(newUser.email, token);

    return res.status(201).json({
      message: "Registration successful. Check your email to verify account.",
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        code: ErrorCodes.INTERNAL_SERVER_ERROR,
        message: "Failed to register",
      },
    });
  }
};

export const verifyEmail = async (req, res) => {
  const token = req.token;

  try {
    const payload = jwt.verify(token, process.env.EMAIL_VERIFY_SECRET);

    const user = await usersService.getUserById(payload.userId);

    if (user.isVerified) {
      return res.status(400).json({
        error: {
          code: ErrorCodes.ALREADY_VERIFIED,
          message: "Email already verified",
        },
      });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(400).json({
        error: {
          code: ErrorCodes.TOKEN_EXPIRED,
          message: "Verification link expired",
        },
      });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(400).json({
        error: {
          code: ErrorCodes.INVALID_TOKEN,
          message: "Invalid verification link",
        },
      });
    }

    return res.status(500).json({
      error: {
        code: ErrorCodes.INTERNAL_SERVER_ERROR,
        message: "Failed to verify email",
      },
    });
  }
};

export const login = (req, res) => {
  const { user } = req;

  res.status(200).json({
    message: "Login successful",
    user: { id: user._id, role: user.role, username: user.username },
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

export const getCurrentUser = (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ id: user._id, role: user.role, username: user.username });
  } catch (error) {
    return res.status(500).json({
      error: {
        code: ErrorCodes.INTERNAL_SERVER_ERROR,
        message: "Failed to fetch current user",
      },
    });
  }
};
