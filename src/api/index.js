import request from 'axios'

// 获取CancelToken
request.interceptors.request.use((config) => {
    config.cancelToken = new request.CancelToken(cancel => {
        window._cancel.push({ cancel })
    })
    // 在发送请求之前做些什么，例如加入token
    // config.headers['Authorization'] = "ASJID231";
    return config;

}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});