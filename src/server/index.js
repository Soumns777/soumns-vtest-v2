// 导入 express模块
const express = require('express')

// 导入加密模块
const md5 = require('js-md5')

// 读取文件
const fs = require('fs')

// 创建 web服务器
const app = express()

// var multiparty = require('multiparty')

// 允许跨域资源共享
const cors = require('cors')

app.use(cors())

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3002', 'http://localhost:8081', 'http://localhost:8082'] // web前端服务器地址
  })
)

//配置解析 application/json 格式数据的内置中间件
app.use(express.json())

//配置中间件解析post application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// Login
app.get('/mock', (req, res) => {
  res.send({
    status: 200,
    msg: '登录成功'
  })
})

// 启动服务器
app.listen(3002, () => {
  console.log('💙💛 服务在3001端口启动')
})
