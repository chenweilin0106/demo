const apiArr = [
    // {
    //   name: "test", // 接口调用方法名
    //   path: '/api/test', // 后端路径
    //   method: "POST", // 默认POST
    //   headers: {"token": 123}, // 自定义单个接口的请求头
    //   desc: "登录接口", // 接口描述
    // }
    // 首页
    {
        name: "home",
        path: '/actserver/newer-prize/home',
        desc: "进入活动页",
    },
    {
        name: "signin",
        path: '/actserver/newer-prize/signin',
        desc: "领取签到奖励",
    },
    {
        name: "receive",
        path: '/actserver/newer-prize/rev-gift',
        desc: "领取礼包",
    },
]

export default apiArr;
