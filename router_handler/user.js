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
        console.log(results);
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
            taken: 'Bearer ' + tokenStr
        })
    })
}