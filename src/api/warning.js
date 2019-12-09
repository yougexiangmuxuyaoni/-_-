import request from 'axios'
/*
预警列表 API
*/

export function yujingshu(query) {
    return request({
        url: '/api/manageWat/statistics/getWarningType',
        method: 'get',
        params: query
    })
}

export function yujingliebiao(query) {
    console.log(query);

    return request({
        url: '/api/manageWat/statistics/getWarnings',
        method: 'get',
        params: query
    })
}

export function baojingshu(query) {
    return request({
        url: '/api/manageWat/statistics/getAlarmType',
        method: 'get',
        params: query
    })
}

export function baojingliebiao(query) {
    console.log(query);
    
    return request({
        url: '/api/manageWat/statistics/getAlarms',
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