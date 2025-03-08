// 主要分四步：
// 引入-cors解决跨域-引入并发送数据-设置监听端口
const express = require('express') // 首先引入express模块，不了解去看nodejs教程 安装：npm install express
const app = express()
const fs = require('fs') // 文件系统，用于引入user.json的数据 也可以自己随便写个数据 ;
const cors = require('cors') // 这个比较重要，解决跨域问题.npm install cors 装一下
// 引入body参数解析工具
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(cors({
//     origin: ['http://localhost:8080', 'http://127.0.0.1:8080'], // 这是本地的默认地址和端口，vue启动的项目就是在这里，这样保证了等会我们在浏览器能访问服务器的数据（user.json）
//     methods: ["GET", "POST"],
//     alloweHeaders: ["Content-Type", "Authorization"]
// }))

app.use(cors())
// 获取请求地址中的/user并匹配，可以添加多个

// 获取首页数据
app.post('/actserver/template2/receive', async (req, res) => {
  // "/receiveAward" 是自定义的，用于显示在地址栏
  // 解析请求参数
  const { body } = req
  // 定义一个变量接收数据
  let newjson
  // fs模块读取json数据
  fs.readFile('./mockData.json', (err, data) => {
    if (err) throw err
    newjson = JSON.parse(data)
    if (body.type === 'tab' && body.mark === 'm3') {
      res.send(newjson)
    }
    if (body.type === 'present_contact_rev' && body.mark) {
      const { award_list } = newjson.data
      const result = award_list.find((item) => item.key == body.mark)
      const resultJson = {
        errno: 0,
        errmsg: '获取成功',
        data: {
          award: result
        }
      }
      res.send(resultJson)
    }
  })
})

// 监听请求地址的对应端口
app.listen(3000, function () {
  // 设置服务端端口为3000,即：http://127.0.0.1:3000
  console.log('Server started on port 3000')
})
