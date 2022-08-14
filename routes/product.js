const express = require('express')
const { addProduct, listAllProduct, updateProduct, getProduct, deleteProduct } = require('../controllers/product')
const Router = express.Router()

Router.route('/').post(addProduct).put(updateProduct).get(listAllProduct)
Router.route('/:productId').get(getProduct).delete(deleteProduct)

module.exports = Router