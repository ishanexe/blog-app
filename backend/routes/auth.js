const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SEC = "my-jwt-seckey";

// Route 1 -> Signup (POST: /api/auth/signup)
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Check if email already exists
        const isMail = await User.findOne({ email });
        if (isMail) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPass,
        });

        // Generate JWT token without expiration
        const payload = {
            myUser: {
                id: newUser._id,
            },
        };

        const jwtData = jwt.sign(payload, JWT_SEC); // No `expiresIn` set here

        res.json({
            message: "Signup successful",
            token: jwtData,
            user: newUser,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route 2 -> Login (POST: /api/auth/login)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Find user by email
        const curUser = await User.findOne({ email });
        if (!curUser) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Compare passwords
        const isPass = await bcrypt.compare(password, curUser.password);
        if (!isPass) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        // Generate JWT token without expiration
        const payload = {
            myUser: {
                id: curUser._id,
            },
        };

        const jwtData = jwt.sign(payload, JWT_SEC); // No `expiresIn` set here

        res.json({
            message: "Login successful",
            token: jwtData,
            user: curUser,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//get info about user
router.post('/getuser', fetchuser, async (req, res) => {  
    try {
        // Step 1: Extract the user ID from the JWT token (middleware sets it in req.user)
        let userId = req.user.id; // The ID of the logged-in user
        // console.log(userId);

        // Step 2: Fetch the user from the database using the user ID (excluding the password)
        const user = await User.findById(userId).select("-password"); // select("-password") removes the password field from the returned document

        // Step 3: Send the user data as a JSON response
        return res.json({ user });
    } catch (err) {
        // Handle errors if any occur
        return res.status(400).json({ error: err.message });
    }
});

module.exports = router;
