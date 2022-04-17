const database = require('../database/index')
exports.getToolbar = (req, res) => {
    const sql = "select * from tool_bar"
    database.query(sql,(err, results) => {
        if(err) return res.cc (err) 
        res.send({
            status: 200,
		    message: '获得侧边栏信息成功！',
		    data: results
        })
    })
}