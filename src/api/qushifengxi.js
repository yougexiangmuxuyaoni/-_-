import request from 'axios'
// import request from './index.js';
/*
异常检测页面 API
*/
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
        url: '/api/manageWat/school/getSchoolData',
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

export function chengshiweizhi(query) {
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