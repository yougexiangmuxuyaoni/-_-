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

export function jianguanxidajilu(query) {
    return request({
        url: '/api/manageWat/supervision/findPageForOp',
        method: 'get',
        params: query
    })
}

export function tongzhigonggao(query) {
    return request({
        url: '/api/manageWat/supervision/findPage',
        method: 'get',
        params: query
    })
}

export function xiaoxitingxin(query) {
    return request({
        url: '/api/manageWat/supervision/findPage',
        method: 'get',
        params: query
    })
}

export function bjjieshou(query) {
    return request({
        url: '/api/manageWat/statistics/getDoneAlarms',
        method: 'get',
        params: query
    })
}


export function bjweijieshou(query) {
    return request({
        url: '/api/manageWat/statistics/getUpcomingAlarms',
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