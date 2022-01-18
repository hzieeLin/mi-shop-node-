const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const { reg_login_schema} = require('../schema/user')
const userHander = require('../router_handler/user')
router.post('/reguser',expressJoi(reg_login_schema), userHander.reg_User)
router.post('/login',expressJoi(reg_login_schema), userHander.login_User)



module.exports = router