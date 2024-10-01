import User from '../models/user.mjs'; // Import the User model
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"; // For hashing passwords

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, role, password: hashedPassword });
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login a user
export const loginUser = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const token = jwt.sign({
            userId: user._id,
            role: user.role
        }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
        res.json({token});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// Get current user
export const getCurrentUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
        if (!token) return res.status(401).json({error: 'No token provided'});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) return res.status(404).json({error: 'User not found'});

        res.json(user);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};