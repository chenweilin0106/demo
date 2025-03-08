# server使用方法介绍

# 引入依赖
npm i express (express框架，作用是搭建server)
npm i cors    (cors解决跨域问题)
npm i body-parser  (body-parser作用是解析请求的body参数)

# 启动server
在当前目录下打开终端执行命令行
    node .\index.js

# 本地更换接口路径
在.env.development文件中更改路径为：
VUE_APP_BASE_API = http://127.0.0.1:3000 


# 定义基础数据
在server文件夹中新建需要的json文件，定义需要mock的数据以及对应的数据结构

# 编写接口
app.post("/receiveAward", async (req, res) => { //"/receiveAward" 是自定义的，用于显示在地址栏
    // 解析请求参数
    let { flag, id } = req.body
});

# fs模块读取json文件
    <!-- 读取出来的json数据需要解析 JSON.parse(data) -->
    fs.readFile('./pageData.json', (err, data) => {

    });

# fs模块写入json文件
    <!-- 将数据写入json文件需要转换为json -->
    <!--  JSON.stringify(newjson)-->
    fs.writeFile('./pageData.json', JSON.stringify(newjson), (err) => {
        if (err) throw err;
        console.log('Successfully written JSON data to file!');
    });

# 返回数据给前端
    res.send(newjson)

