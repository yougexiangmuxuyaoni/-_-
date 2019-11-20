import request from 'axios'
/*
头部通知 API
*/

export function xinxiaoxi(query) {
    return request({
        url: '/api/manageWat/supervision/findForStatus',
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

// export function baojingList(query) {
//     return request({
//         url: '/api/baojingList',
//         method: 'get',
//         params: query
//     })
// }