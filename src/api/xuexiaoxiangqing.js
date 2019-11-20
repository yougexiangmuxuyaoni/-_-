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
        url: '/api/manageWat/schooldetails/getSupplierInformation',
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