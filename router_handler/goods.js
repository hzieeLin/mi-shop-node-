const database = require('../database/index')
exports.getHomeGoods = (req, res) => {
    const sql = 'select goods_id, goods_name, goods_item_title, goods_url, goods_remarks, goods_price from goods where goods_class = ? and goods_item_title = ?'
    database.query(sql,[req.params.goods_class, req.params.goods_item_title],(err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
		    message: '获得homegoods列表成功！',
		    data: results
        })
    })
}
exports.getHomeGoodsImg = (req, res) => {
    const sql = 'select goods_url from goods_left_img where goods_class = ?'
    database.query(sql, req.params.goods_class, (err, results) => {
        if(err) return res.cc(err)
       res.send({
        status: 200,
        message: '获得图片列表成功！',
        data: results
    })
    })
}
exports.getHomeGoodsTitle = (req, res) => {
    const sql = 'select goods_id, goods_item_title from goods where goods_class = ? group by goods_item_title'
    database.query(sql,req.params.goods_class,(err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
		    message: '获得homegoods列表成功！',
		    data: results
        })
    })
}
exports.getSlideList = (req, res) => {
    const sql = 'select slide_url from slide_list where slide_name = (select p_name from path_info where product_id = ?)'
    database.query(sql, req.params.product_id, (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
		    message: '获得轮播图列表成功！',
		    data: results
        })
    })
}
exports.getDetail = (req, res) => {
    const sql = 'select * from goods_details where d_name = (select p_name from path_info where product_id = ?)'
    database.query(sql, req.params.product_id, (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
		    message: '获得商品描述信息成功！',
		    data: results
        })
    })
}
exports.getEditions = (req, res) => {
    const sql = 'select a.sale_goods_id, a.sale_small_logo, a.sale_name, a.sale_edition, a.sale_price, b.color_color from sale_info as a, sale_info_color as b where a.sale_name = b.color_name and a.sale_name = (select p_name from path_info where product_id = ?) GROUP BY a.sale_price '
    database.query(sql, req.params.product_id, (err,results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
		    message: '获得商品具体配置信息成功！',
		    data: results
        })
    })
}
exports.getColors = (req, res) => {
    const sql = 'select a.sale_name, a.sale_edition, a.sale_price, b.color_color from sale_info as a, sale_info_color as b where a.sale_name = b.color_name and a.sale_name = (select p.p_name from path_info p where p.product_id = ?) GROUP BY b.color_color '
    database.query(sql, req.params.product_id, (err,results) => {
        console.log(results);
        if(err) return res.cc(err)
        res.send({
            status: 200,
		    message: '获得商品具体颜色信息成功！',
		    data: results
        })
    })
}
exports.getPrice = (req, res) => {
    const sql = 'select sale_price,sale_old_price from sale_info where sale_name = ? and sale_edition = ?';
    database.query(sql, [req.params.s_name,req.params.s_edition], (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
		    message: '获得商品价格信息成功！',
		    data: results
        })
    })
}
exports.getServiceList = (req, res) => {
    const sql = 'select m.s_con1 ,m.s_con2, m.s_save, m.s_icon, m.s_price, m.s_type from miservice m, product_miservice p where (m.s_type_id = p.product_service1 or m.s_type_id = p.product_service2 or m.s_type_id = p.product_service3 or m.s_type_id = p.product_service4 or m.s_type_id = p.product_service5) and p.product_id = ? and m.s_type = ?'
    database.query(sql, [req.params.product_id ,req.params.s_type], (err,results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
		    message: '获得商品服务信息成功！',
		    data: results
        })
    })
}
exports.getServiceType = (req, res) => {
    const sql = 'select DISTINCT m.s_type from miservice m, product_miservice p where (m.s_type_id = p.product_service1 or m.s_type_id = p.product_service2 or m.s_type_id = p.product_service3 or m.s_type_id = p.product_service4 or m.s_type_id = p.product_service5) and p.product_id = ? ORDER BY m.s_type DESC';
    database.query(sql, [req.params.product_id], (err,results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
		    message: '获得商品服务类型成功！',
		    data: results
        })
    })
}
exports.getCheckMiServiceList = (req, res) => {
    const sql = 'select * from miservice where s_price = ? and s_con1 = ?'
    database.query(sql, [req.params.price, req.params.name], (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
		    message: '获得商品在购物车勾选的服务信息成功！',
		    data: results
        })
    })
}