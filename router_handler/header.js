const database = require('../database/index')
exports.getPicList = (req, res) => {
    const sql = 'select a.pic_class,a.pic_name, a.pic_url, a.pic_price, b.product_id from header_pics_class as a, path_info as b where a.pic_name = b.p_name and a.pic_class = ?'
    database.query(sql,req.params.pic_class, (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
            message: '获得隐藏产品列表成功！',
            data: results
        })
    })
}
exports.getCategory = (req, res) => {
	const sql = 'select a.category_name, a.category_url, a.category_class, p.product_id from category a,path_info p where a.category_class = ? and a.category_name = p.p_name '
	database.query(sql, req.params.category_class, (err, results) => {
		if(err) return res.cc(err)
		res.send({
		    status: 200,
		    message: '获得category列表成功！',
		    data: results
		})
	})
}