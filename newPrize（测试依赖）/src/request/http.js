import axios from 'axios';
import axiosConfig from './config'; // axios请求配置
import apiArr from './api'; // 用户请求集合
import qs from 'qs';
import { Toast } from 'vant';

// 创建axios实例
const service = axios.create({
    baseURL: axiosConfig.baseURL,
    timeout: axiosConfig.timeout,
    headers: axiosConfig.headers
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    //  promise动态添加请求头，加完之后再return出config继续请求
    const headerHandlers = (axiosConfig.headerHandlers || []).map(handler => {
        return handler(config).then((mixHeaders) => Object.assign(config.headers || {}, mixHeaders))
    });
    return Promise.all(headerHandlers).then(() => config);
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    Toast(error.message);
    return Promise.reject(error);
});

// 创建请求
const USE_DATA_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];
const createRequest = () => {
    const hostApi = {};
    apiArr.forEach(api => {
        hostApi[api.name] = (params) => {
            // 解析路径参数并合并到params中去
            params = Object.assign(qs.parse(window.location.search.substring(1)), params);
            const method = api.method || "POST";
            const requestParams = USE_DATA_METHODS.includes(method) ? { data: qs.stringify(params) } : { params: params };
            return service({
                url: api.path,
                method,
                headers: {
                    ...api.headers
                },
                ...requestParams,
            })
        }
    });
    return hostApi;
}
const apis = createRequest();

export default apis;
