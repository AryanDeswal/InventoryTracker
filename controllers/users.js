const path = require('path');
const User = require('../models/Users.js');
const Product = require('../models/Products.js');
const bcrypt = require('bcrypt');

module.exports.getHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/home.html"));
};

module.exports.getRegister = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/register.html"));
};

module.exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            existingUser.password = password;
            await existingUser.save();
            return res.redirect('/login');
        }

        const newUser = new User({ username, password });

        await newUser.save();

        req.session.username = username;
        req.session.password = password;

        res.status(201).redirect("/products");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.getLogin = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
};

module.exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).redirect('/register');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).redirect('/login');
        }

        req.session.username = username;
        req.session.password = password;

        res.status(201).redirect("/products");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Error destroying session");
        }
        res.clearCookie(req.sessionID);
        res.status(201).redirect("/");
    });
};

module.exports.getAddProduct = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/addProduct.html"));
}

module.exports.getProducts = async (req, res) => {
    try {
        const objectOfProducts = await Product.find();
        const products = Object.keys(objectOfProducts).map((key) => {
            return objectOfProducts[key];
        });
        res.render(path.join(__dirname, "../views/products.ejs"), { products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.products = async (req, res) => {
    try {
        const { productID } = req.body;
        await Product.updateOne(
            { productID: productID },
            { $set: req.body },
            { upsert: true }
        );
        res.status(201).redirect("/products");
    } catch (error) {
        res.status(400).redirect('/products');
    }
};

module.exports.getUpdateProduct = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/updateProduct.html"));
};

module.exports.updateProduct = async (req, res) => {
    try {
        const { productID } = req.body;
        await Product.updateOne(
            { productID: productID },
            { $set: req.body },
            { upsert: true }
        );
        res.status(201).redirect("/products");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports.getDeleteProduct = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/deleteProduct.html"));
};

module.exports.deleteProduct = async (req, res) => {
    try {
        const { productID } = req.body;
        await Product.deleteOne({ productID: productID });
        res.status(201).redirect("/products");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports.featuredProduct = async (req, res) => {
    try {
        const objectOfProducts = await Product.find({ featured: true });
        const products = Object.keys(objectOfProducts).map((key) => {
            return objectOfProducts[key];
        });
        res.render(path.join(__dirname, "../views/products.ejs"), { products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getLessProduct = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/lessProduct.html"));
};

module.exports.lessProduct = async (req, res) => {
    try {
        const objectOfProducts = await Product.find({
            price: { $lt: req.body.value },
        });
        const products = Object.keys(objectOfProducts).map((key) => {
            return objectOfProducts[key];
        });
        res.render(path.join(__dirname, "../views/products.ejs"), { products });
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getGreaterProduct = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/greaterProduct.html"));
};

module.exports.greaterProduct = async (req, res) => {
    try {
        const objectOfProducts = await Product.find({
            price: { $gt: req.body.value },
        });
        const products = Object.keys(objectOfProducts).map((key) => {
            return objectOfProducts[key];
        });
        res.render(path.join(__dirname, "../views/products.ejs"), { products });
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
};