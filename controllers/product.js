const uuid = require('uuid');
const { sendResponse } = require('../utils');
const PRODUCTS = [];
const PRODUCT_TYPE_ENUM = ['electronic', 'jewellery', 'clothing', 'footwear', 'accessories', 'furniture', 'groceries']

const isProductIdExists = productId => {
  return PRODUCTS.findIndex(element => {
    return element.productId === productId && !element.isDeleted
  })
}
const validateParams = (fields, body) => {
  for (let field of fields) {
    switch(field) {
      case 'productId':
        return (!body[field] || typeof body[field] != 'string' || !body[field].trim().length)? field: false
      case 'name':
        return (!body[field] || typeof body[field] != 'string' || !body[field].trim().length)? field: false
      case 'type':
        return (!body[field] || typeof body[field] != 'string' || !PRODUCT_TYPE_ENUM.includes(body[field]))? field: false
      case 'price':
        return (!body[field] || isNaN(body[field]) || body[field] > 0)? field: false
      case 'availability':
        return (!body[field] || typeof body[field] != 'boolean')? field: false
      default :
        return 'params'
    }
  }
  return true
}
const createNewProduct = (product) => {
  const {
    name,
    type,
    price,
    availability
  } = product
  return {
    productId: uuid.v4(),
    name,
    type,
    price,
    availability,
    isDeleted: false
  }
}
const insertProduct = (products) => {
  const productList = []
  if (Array.isArray(products) && products.length) {
    for (const eachProduct of products) {
      const newProduct = createNewProduct(eachProduct)
      productList.push(newProduct)
      PRODUCTS.push(newProduct)
    }
  } else {
    const {
      name = null,
      type = null,
      price = 0,
      availability = null
    } = req.body
    const newProduct = {
      productId: uuid.v4(),
      name,
      type,
      price,
      availability,
      isDeleted: false
    }
    createNewProduct(eachProduct)
    productList.push(newProduct)
    PRODUCTS.push(newProduct)
  }
  return productList
}
const addProduct = (req, res) => {
  const requiredParams = ['name', 'type', 'price', 'availability']
  if (Array.isArray(req.body) && req.body.length) {
    for (const eachProduct of req.body) {
      const isInvalid = validateParams(requiredParams, eachProduct)
      if (isInvalid) return sendResponse(res, 400, `invalid ${isInvalid}`)
    }
  } else {
    const isInvalid = validateParams(requiredParams, req.body)
    if (isInvalid) return sendResponse(res, 400, `invalid ${isInvalid}`)
  }
  const newProducts = insertProduct(req.body)
  return sendResponse(res, 200, 'product added successfully', newProducts)
}
const updateProduct = (req, res) => {
  const requiredParams = ['productId', 'name', 'type', 'price', 'availability']
  const isInvalid = validateParams(requiredParams, req.body)
  if (isInvalid) return sendResponse(res, 400, `invalid ${isInvalid}`)
  const index = isProductIdExists(req.body.productId)
  if (index < 0) return sendResponse(res, 400, `productId not found`)
  PRODUCTS[index] = req.body
  return sendResponse(res, 200, 'product updated successfully', PRODUCTS[index])
}
const listAllProduct = (req, res) => {
  const filteredProductsDetail = PRODUCTS.filter(e=> !e.isDeleted)
  const productsDetail = [...filteredProductsDetail]
  const msg = productsDetail.length? 'product fetched successfully': 'no product found'
  let {
    sortBy = null,
    sortOrder = null,
    page,
    limit,
  } = req.query
  if (sortBy && sortOrder) {
    if (['asc', 'desc'].includes(sortOrder)) {
      if ('asc' === sortOrder)
        productsDetail.sort((obj1, obj2) => obj1[sortBy] - obj2[sortBy])
      else
        productsDetail.sort((obj1, obj2) => obj2[sortBy] - obj1[sortBy])
    }
  }
  if (!limit || isNaN(limit)) limit = 5
  if (!page || isNaN(page)) page = 1
  console.log((page-1)*limit, page*limit, productsDetail.length)
  return sendResponse(res, 200, msg, {
    total: filteredProductsDetail.length,
    products: productsDetail.slice((page-1)*limit, page*limit),
    page,
    limit
  })
}
const getProduct = (req, res) => {
  console.log(req.params)
  const requiredParams = ['productId']
  const isInvalid = validateParams(requiredParams, req.params)
  if (isInvalid) return sendResponse(res, 400, `invalid ${isInvalid}`)
  const index = isProductIdExists(req.params.productId)
  console.log(index, req.params.productId)
  if (index < 0) return sendResponse(res, 400, `productId not found`)
  return sendResponse(res, 200, 'product fetched successfully', PRODUCTS[index])
}
const deleteProduct = (req, res) => {
  const requiredParams = ['productId']
  const isInvalid = validateParams(requiredParams, req.params)
  if (isInvalid) return sendResponse(res, 400, `invalid ${isInvalid}`)
  const index = isProductIdExists(req.params.productId)
  if (index < 0) return sendResponse(res, 400, `productId not found`)
  PRODUCTS[index].isDeleted = true
  return sendResponse(res, 200, 'product deleted successfully', PRODUCTS[index].productId)
}

module.exports = {
  addProduct,
  updateProduct,
  listAllProduct,
  getProduct,
  deleteProduct
}