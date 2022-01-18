const joi = require('joi')

const username = joi.string().min(1).max(12).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

exports.reg_login_schema = {
    body: {
        username,
        password
    }
}