import request from 'axios'
/*
异常检测页面 API
*/

export function zhiboliebiao(query) {
    return request({
        url: '/api/manageWat/school/getLiveSchoolWatch',
        method: 'get',
        params: query
    })
}

export function zhiboliu(query) {
    return request({
        url: '/api/manageWat/school/getIoTLivePathWatch',
        method: 'get',
        params: query
    })
}

export function gongyingshangshu(query) {
    return request({
        url: '/api/manageWat/schooldetails/getSuppliersum',
        method: 'get',
        params: query
    })
}

export function gongyingshang(query) {
    return request({
        url: '/api/manageWat/statistics/getSupplierInformation',
        method: 'get',
        params: query
    })
}

export function zizhixinxi(query) {
    return request({
        url: '/api/manageWat/statistics/getSchoolQualification',
        method: 'get',
        params: query
    })
}

export function xuexiaoxinxi(query) {
    return request({
        url: '/api/manageWat/statistics/getSchoolInformation',
        method: 'get',
        params: query
    })
}


export function renyuanxinxi(query) {
    return request({
        url: '/api/manageWat/statistics/getPersonnelInformation',
        method: 'get',
        params: query
    })
}


export function shebeixinxi(query) {
    return request({
        url: '/api/manageWat/statistics/getDeviceInformation',
        method: 'get',
        params: query
    })
}

export function shicaixinxi(query) {
    return request({
        url: '/api/manageWat/statistics/getIngredientsInformation',
        method: 'get',
        params: query
    })
}

export function taizhangxinxi(query) {
    return request({
        url: '/api/manageWat/statistics/getAccount',
        method: 'get',
        params: query
    })
}

export function lishibaojing(query) {
    return request({
        url: '/api/manageWat/statistics/getHistoricalAlarm',
        method: 'get',
        params: query
    })
}

export function lishixiangqing(query) {
    return request({
        url: '/api/manageWat/statistics/getHistoryDetails',
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