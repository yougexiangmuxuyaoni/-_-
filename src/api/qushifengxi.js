import request from 'axios'
/*
异常检测页面 API
*/


request.interceptors.request.use((config) => {
    // 在发送请求之前做些什么，例如加入token
    // config.headers['Authorization'] = "ASJID231";
if(true){
    console.log(this)
}
    return config;

}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export function xuexiaoyujingpaiming(query) {
    return request({
        url: '/api/manageWat/statistics/getEarlyWarningRank',
        method: 'get',
        params: query
    })
}

export function xuexiaobaojingpaiming(query) {
    return request({
        url: '/api/manageWat/statistics/getEarlyAlarmRank',
        method: 'get',
        params: query
    })
}

export function yujinghuanjie(query) {
    return request({
        url: '/api/manageWat/statistics/getEarlyTotalContrast',
        method: 'get',
        params: query
    })
}

export function baojinghuanjie(query) {
    return request({
        url: '/api/manageWat/statistics/getAlarmTotalContrast',
        method: 'get',
        params: query
    })
}

export function xuexiaotongji(query) {
    return request({
        url: '/api/manageWat/school/getAnalysisSchoolData',
        method: 'get',
        params: query
    })
}
export function shitangxinxi(query) {
    return request({
        url: '/api/manageWat/school/getMesshallMessageByArea',
        method: 'get',
        params: query
    })
}

export function baojingshu(query) {
    return request({
        url: '/api/manageWat/statistics/getWarnAlarmTotalContrast',
        method: 'get',
        params: query

    })
}


export function zhengzhaolv(query) {
    return request({
        url: '/api/manageWat/statistics/getPercentage',
        method: 'get',
        params: query

    })
}

export function quyuma(query) {
    return request({
        url: '/api/manageWat/statistics/getCode',
        method: 'get',
        params: query

    })
}

export function xiazuan(query) {
    return request({
        url: '/api/manageWat/statistics/getcity',
        method: 'get',
        params: query

    })
}

export function sanjiliandong(query) {
    return request({
        url: '/api/schoolMan/trendAnalysis/getAllCities',
        method: 'get',
        params: query

    })
}

export function mohusousuo(query) {
    return request({
        url: '/api/manageWat/statistics/findSchName',
        method: 'get',
        params: query

    })
}
// export function baojingList(query) {
//     return request({
//         url: '/api/baojingList',
//         method: 'get',
//         params: query
//     })
// }