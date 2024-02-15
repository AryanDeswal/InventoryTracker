const User = require("../models/Users.js");
const bcrypt = require("bcrypt");

module.exports.authenticate = async (req, res, next) => {
    const { username, password } = req.session;

    try {
        if (typeof username === 'undefined' || typeof password === 'undefined') return res.redirect('/login');
        const user = await User.findOne({ username });
        if (!user)
            return res.status(401).redirect('/login');
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(401).redirect('/login');
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: "Something went wrong with the server." });
    }
}