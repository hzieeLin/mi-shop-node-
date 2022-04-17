const database = require('../database/index')
exports.getCartList = (req, res) => {
    const sql = "select * from cart"
    database.query(sql,(err, results) => {
        if(err) return res.cc (err) 
        res.send({
            status: 200,
		    message: '获得临时购物车信息成功！',
		    data: results
        })
    })
}
exports.changeGoodsState =(req, res) => {
    const sql = 'update cart set c_state = !c_state where c_name = ? and c_id = ?'
    database.query(sql, [req.params.c_name, req.params.c_id], (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('更新状态失败！')
        res.send({
            status: 200,
		    message: '更改商品状态成功！',
        })
    })
}
exports.getGoodsState = (req, res) => {
    const sql = 'select c_state from cart'
    database.query(sql, (err, results) => {
        if(err) return res.cc (err) 
        res.send({
            status: 200,
		    message: '获得所有商品状态成功！',
		    data: results
        })
    })
}
exports.getPriceList = (req, res) => {
    const sql = 'select c_price, c_number from cart where c_state = 1'
    database.query(sql, (err, results) => {
        if(err) return res.cc (err) 
        res.send({
            status: 200,
		    message: '获得已勾选商品信息成功！',
		    data: results
        })
    })
}
exports.changeGoodsNum = (req, res) => {
    const sql = 'update cart set c_number = ? where  c_id = ? and c_name = ?'
    database.query(sql, [req.params.c_number,req.params.c_id,req.params.c_name], (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('更新状态失败！')
        res.send({
            status: 200,
		    message: '更改商品状态成功！',
        })
    })
}
exports.deleteGoodsRow =(req, res) => {
    const sql = 'delete from cart where c_id = ? and c_name = ?'
    database.query(sql, [req.params.c_id, req.params.c_name] ,(err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
            message: '删除临时商品行成功！'
        })
    })
}