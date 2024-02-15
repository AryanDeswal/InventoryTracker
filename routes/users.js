const router = require('express').Router();
const { authenticate } = require('../utils/authenticate.js');
const { getGreaterProduct, greaterProduct, lessProduct, getLessProduct, featuredProduct, deleteProduct, getDeleteProduct, updateProduct, getUpdateProduct, getHomePage, getRegister, register, getLogin, login, logout, getAddProduct, getProducts, products } = require('../controllers/users.js')

router.route('/').get(getHomePage);

router.route('/register')
    .get(getRegister)
    .post(register);

router.route('/login')
    .get(getLogin)
    .post(login);

router.route("/logout").get(logout);

router.route('/addProduct').get(authenticate, getAddProduct);

router.route('/products')
    .get(authenticate, getProducts)
    .post(authenticate, products);

router.route('/updateProduct')
    .get(authenticate, getUpdateProduct)
    .post(authenticate, updateProduct);

router.route('/deleteProduct')
    .get(authenticate, getDeleteProduct)
    .post(authenticate, deleteProduct);

router.route('/featuredProduct').get(authenticate, featuredProduct);

router.route('/lessProduct')
    .get(authenticate, getLessProduct)
    .post(authenticate, lessProduct);

router.route('/greaterProduct')
    .get(authenticate, getGreaterProduct)
    .post(authenticate, greaterProduct);

module.exports = router;