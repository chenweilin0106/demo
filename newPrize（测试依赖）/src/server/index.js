// 主要分四步：
// 引入-cors解决跨域-引入并发送数据-设置监听端口
var express = require("express"); //首先引入express模块，不了解去看nodejs教程 安装：npm install express 
var app = express();
var fs = require("fs"); // 文件系统，用于引入user.json的数据 也可以自己随便写个数据 ;
var cors = require("cors");// 这个比较重要，解决跨域问题.npm install cors 装一下
// 引入body参数解析工具
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(cors({
//     origin: ['http://localhost:8080', 'http://127.0.0.1:8080'], // 这是本地的默认地址和端口，vue启动的项目就是在这里，这样保证了等会我们在浏览器能访问服务器的数据（user.json）
//     methods: ["GET", "POST"],
//     alloweHeaders: ["Content-Type", "Authorization"]
// }))

app.use(cors());
// 获取请求地址中的/user并匹配，可以添加多个 

// 获取首页数据
app.post("/actserver/vip-day/home", async (req, res) => { //"/receiveAward" 是自定义的，用于显示在地址栏
    console.log(req.body);
    let { mark } = req.body
    let newjson
    if (mark == 5) {
        fs.readFile('./goodGift.json', (err, data) => {
            if (err) throw err;
            newjson = JSON.parse(data);
            console.log(newjson);
            res.send(newjson)
        });
    } else {
        console.log(mark);
    }
    // 定义一个变量接收数据
    // fs模块读取json数据
});

// 抽取神秘惊喜
app.post("/draw", async (req, res) => { //"/receiveAward" 是自定义的，用于显示在地址栏
    // 解析请求参数
    let { num } = req.body
    // 定义一个变量接收数据
    let newjson
    // fs模块读取json数据
    fs.readFile('./goodGift.json', (err, data) => {
        if (err) throw err;
        newjson = JSON.parse(data);
        // 解构赋值
        let { surpriseGiftList } = newjson.data
        let award = []
        if (num == 1) {
            let i = draw()
            award.push(surpriseGiftList[i])
            res.send(award)
        }
        if (num == 5) {
            for (let index = 0; index < 5; index++) {
                let i = draw()
                award.push(surpriseGiftList[i])
            }
            res.send(award)
        }
    });
});

// 领取奖励接口
app.post("/receiveAward", async (req, res) => { //"/receiveAward" 是自定义的，用于显示在地址栏
    // 解析请求参数
    let { flag, id } = req.body
    // 定义一个变量接收数据
    let newjson
    // fs模块读取json数据
    fs.readFile('./pageData.json', (err, data) => {
        if (err) throw err;
        newjson = JSON.parse(data);
        // 解构赋值
        let { heroGiftBagList, skillGiftBagList, roleGiftBagList } = newjson.data
        // 更新数组
        if (flag == 0) {
            changeList(heroGiftBagList, id)
            newjson.data.heroGiftBagList = heroGiftBagList
        }
        if (flag == 1) {
            changeList(skillGiftBagList, id)
            newjson.data.skillGiftBagList = skillGiftBagList
        }
        if (flag == 2) {
            changeList(roleGiftBagList, id)
            newjson.data.roleGiftBagList = roleGiftBagList
        }
        // 更新json文件
        fs.writeFile('./pageData.json', JSON.stringify(newjson), (err) => {
            if (err) throw err;
            console.log('Successfully written JSON data to file!');
            // 返回数据给前端
            res.send(newjson)
        });
    });
});



function changeList(list, id) {
    for (var item in list) {
        if (list[item].id == id) {
            list[item].hasright = 2
            break;
        }
    }
}
// 抽奖
function draw() {
    var num = Math.floor(Math.random() * (100 - 1) + 1)
    if (num <= 25) {
        return 0
    }
    if (num <= 30 && num > 25) {
        return 1
    }
    if (num <= 40 && num > 30) {
        return 2
    }
    if (num <= 50 && num > 40) {
        return 3
    }
    if (num <= 55 && num > 50) {
        return 4
    }
    if (num <= 70 && num > 55) {
        return 5
    }
    if (num <= 85 && num > 70) {
        return 6
    }
    if (num <= 100 && num > 85) {
        return 7
    }
}

// 监听请求地址的对应端口
var server = app.listen(3000, function () { // 设置服务端端口为3000,即：http://127.0.0.1:3000
    console.log('Server started on port 3000');
})