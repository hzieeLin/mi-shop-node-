const express = require('express')
const router = express.Router()
const otherHander = require('../router_handler/other')
router.get('/toolbar', otherHander.getToolbar)
module.exports = router