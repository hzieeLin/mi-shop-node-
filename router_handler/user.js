const database = require('../database/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.reg_User = (req, res) => {
    const sql = 'select * from user where username = ?'
    database.query(sql, req.body.username, (err, results) => {
        if(err) return res.cc(err)
        if(results.length > 0) return res.cc('用户名已经被占用了')
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const sql = 'insert into user set ?'
        database.query(sql, {username: req.body.username, password: req.body.password}, (err, results) => {
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('用户名注册失败')
            res.send({
                status: 200,
                message: '用户名注册成功！'
            })
        })
    })
}
exports.login_User = (req, res) => {
    console.log(req.body.username);
    const sql = 'select * from user where username = ?'
    database.query(sql, req.body.username, (err, results) => {
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('登录失败！')
        const compareResult = bcrypt.compareSync(req.body.password, results[0].password)
        if(!compareResult) {
            return res.cc('密码错误！')
        }
        const user = {...results[0], password: ''}
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: '10h'})
        res.send({
            status: 200,
            message: '用户登录成功！',
            token: 'Bearer ' + tokenStr
        })
    })
}
exports.getUserInfo = (req, res) => {
    console.log( req.params);
    const sql = 'select uid ,username, u_name from user where username = ?'
    database.query(sql, req.params.username, (err, results) => {
     if(err) return res.cc (err) 
     res.send({
         status: 200,
         message: '获得用户昵称信息成功！',
         data: results
        })
    })
 }
exports.getAddress = (req, res) => {
    const sql = 'select u_pro, u_city, u_dis, u_details from user_addr where username = ?'
    database.query(sql, req.params.username, (err, results) => {
        console.log(results);
        if(err) return res.cc (err) 
        res.send({
            status: 200,
		    message: '获得用户地址信息成功！',
		    data: results
        })
    })
}
exports.getProvince = (req, res) => {
    const sql = 'select pro_name from t_province'
    database.query(sql, (err, results) => {
        if(err) return res.cc (err) 
        res.send({
            status: 200,
		    message: '获得省份或直辖市信息成功！',
		    data: results
        })
    })
}
exports.getCityList = (req, res) => {
    const sql = 'select city_name from t_city where pro_id = (select pro_id from t_province where pro_name = ?)';
    database.query(sql, req.params.pro_name, (err, results) => {
        if(err) return res.cc (err)
        res.send({
            status: 200,
		    message: '获得相关市信息成功！',
		    data: results
        })
    })
}
exports.getDisList = (req, res) => {
    const sql = 'select dis_name from t_district where city_id = (select city_id from t_city where city_name = ?)'
    database.query(sql, req.params.city_name, (err, results) => {
        if(err) return res.cc (err)
        res.send({
            status: 200,
		    message: '获得相关区县信息成功！',
		    data: results
        })
    })
}