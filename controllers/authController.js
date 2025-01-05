const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//Generate jwt
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});
};

//register user
const register = async (req, res) => {
    const {first_name, last_name, role, username, email, password, address} = req.body

    try {
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({message: 'user sudah terdaftar'});

        const profilePicPath = req.file ? `/uploads/profile_pics/${req.file.filename}` : null; // Path file
        const user = await User.create({first_name, last_name, role, username, email, password, address, profilePic: profilePicPath});
        if(user){
            res.status(201).json({
                _id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                username: user.username,
                email: user.email,
                password: user.password,
                address: user.address,
                profilePic: user.profilePic,
                token: generateToken(user.id)
            });
        }
    } catch (error) {
        res.status(400).json({message: 'Selamat Datang!'})
    }
}

// Login User
const login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if(user && (await bcrypt.compare(password, user.password))) {
            user.session = generateToken(user.id);
            await user.save();
            res.json({
                _id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                username: user.username,
                email: user.email,
                password: user.password,
                address: user.address,
                profilePic: user.profilePic,
                token: user.session,
            });
        }else {
            res.status(401).json({ message: 'Gak beres jir' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error logging in' });
    }
}

module.exports = { register, login}