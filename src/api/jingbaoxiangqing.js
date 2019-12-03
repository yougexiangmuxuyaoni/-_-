import request from 'axios'
/*
预警报警详情页面 API
*/

export function lishixiangqing(query) {
    return request({
        url: '/api/manageWat/statistics/getHistoryDetails',
        method: 'get',
        params: query
    })
}

export function renyuanxiangqing(query) {
    return request({
        url: '/api/manageWat/statistics/getHistoryMan',
        method: 'get',
        params: query
    })
}
export function shicaixiangqing(query) {
    return request({
        url: '/api/manageWat/statistics/getHistoryFood',
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