import User from '../models/user.mjs'; // Import the User model

// Get all users
export const getUsers = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default values: page 1, 10 users per page

    try {
        const users = await User.find()
            .limit(limit * 1) // Convert `limit` to a number
            .skip((page - 1) * limit) // Skip users to get the current page
            .exec(); // Execute the query

        // Get the total number of documents in the User collection
        const count = await User.countDocuments();

        res.status(200).json({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    const { first_name, last_name, avatar, birthday, username, password, role } = req.body;

    const newUser = new User({
        first_name,
        last_name,
        avatar,
        birthday,
        username,
        password,
        role,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user by ID
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
