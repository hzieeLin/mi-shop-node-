const joi = require('joi')

const pic_class = joi.string().required()

const category_class = joi.string().required()
exports.pic_class_schema = {
    params: {
        pic_class
    }
}

exports.category_class_schema = {
    params: {
        category_class
    }
}