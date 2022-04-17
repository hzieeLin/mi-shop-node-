const express = require('express')
const headerHander = require('../router_handler/header')
const expressJoi = require('@escook/express-joi')
const { pic_class_schema} = require('../schema/header')
const { category_class_schema} = require('../schema/header')
const router = express.Router()
router.get('/piclist/:pic_class',expressJoi(pic_class_schema), headerHander.getPicList)
router.get('/category/:category_class',expressJoi(category_class_schema), headerHander.getCategory)
module.exports=router