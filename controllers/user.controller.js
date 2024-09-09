import User from "../models/user.models.js";
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
// import { sendWelcomeEmail } from '../services/email.service.js';

export const register = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userData = req.body;

        const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
        console.log("checking the result", existingUser);
        if (!existingUser) {
            userData.password = await bcrypt.hash(userData.password, 10);
            await User.create(userData);
            // sendWelcomeEmail(userData.email, userData.name);
            res.status(201).send({ status: true, message: 'Successfully registered!' });
        } else {
            res.status(409).send({ status: false, message: "User already exists!" });
        }
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send({ status: false, message: 'Server error during registration' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email: email.toLowerCase() }).select('+password');

        console.log("User data login:", userData);

        if (!userData) {
            res.status(401).send({ status: false, message: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            res.status(401).send({ status: false, message: 'Invalid credentials' });
            return;
        }

        const jwtToken = await userData.generateJWTToken();

        res.cookie('token', jwtToken, {
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
        });

        res.status(200).send({
            token: jwtToken,
            status: true,
            message: "Successfully logged in!"
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ status: false, message: 'Server error during login' });
    }
};

export const getProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).send({ status: false, message: 'Unauthorized: No user is logged in' });
        }
        const userId = req.user.id;
        console.log("User ID in getProfile:", userId);
        const userDetail = await User.findById(userId);

        if (!userDetail) {
            res.status(404).send({ status: false, message: 'User not found' });
        }

        res.status(200).send({ status: true, message: userDetail });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).send({ status: false, message: 'Server error fetching profile' });
    }
};

export const logout = async (req, res) => {
    try {
        // Clear the token from the cookies
        res.clearCookie('token');

        // Send a success response
        res.status(200).send({
            status: true,
            message: "Successfully logged out!"
        });

        console.log("Successfully logged out");
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).send({ status: false, message: 'Server error during logout' });
    }
};

