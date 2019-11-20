import request from 'axios'
/*
异常检测页面 API
*/

export function xuexiaotongji(query) {
    return request({
        url: '/api/schoolMan/trendanalysis/getSchoolStatistics',
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