// import { getSession } from '@/utils';

const config = {
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 15000,
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    // 自定义全局请求头
    // headerHandlers: [
    //   () => new Promise((resolve) => {
    //     const userInfo = getSession('userInfo');
    //     resolve({'session': userInfo ? userInfo.session : ''});
    //   })
    // ],
}

export default config;
