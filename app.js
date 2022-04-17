const express = require('express')
const cors = require('cors')
const joi = require('joi')
//导入路由
const userRouter = require('./router/user')
const headerRouter = require('./router/header')
const goodsRouter = require('./router/goods')
const otherRouter = require('./router/other')
const cartRouter = require('./router/cart')
const app = express()
//通过如下的代码，配置解析 `application/x-www-form-urlencoded` 格式的表单数据的中间件：
app.use(express.urlencoded({ extended: false}))
const bodyParser = require('body-parser');
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
//组成成全局cors
app.use(cors())
//设置res.cc全局处理函数优化处理函数,必须在路由之前声明这个
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})
//必须在路由前配置解析Token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({secret: config.jwtSecretKey}).unless({path: [/^\/api/]}))
app.use('/api', userRouter)
app.use('/header',headerRouter)
app.use('/goods',goodsRouter)
app.use('/other', otherRouter)
app.use('/cart', cartRouter)
//在 `app.js` 的全局错误级别中间件中，捕获验证失败的错误，并把验证失败的结果响应给客户端：
app.use((err, req, res, next) => {
    if(err instanceof joi.ValidationError) return res.cc(err)
    res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
})

app.listen(3007,() => {
    console.log('api server running at http://127.0.0.1')
})