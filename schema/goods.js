const joi = require('joi')

const goods_class = joi.string().required()
const goods_item_title = joi.string().required()
const slide_name = joi.string().required()
const d_name = joi.string().required()
exports.goods_class_schema = {
    params: {
        goods_class,
    }
}

exports.goods_item_schema = {
    params: {
        goods_class,
        goods_item_title
    }
}
exports.slide_name_schema = {
    params: {
        slide_name
    }
}
exports.detail_name_schma = {
    params: {
        d_name
    }
}