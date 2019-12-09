import request from 'axios'
/*
异常检测页面 API
*/

export function yujingList(query) {
    console.log(query);

    return request({
        url: '/api/manageWat/statistics/getEarlywarningListYear',
        method: 'get',
        params: query
    })
}

export function baojingList(query) {
    return request({
        url: '/api/manageWat/statistics/getAlarmListYear',
        method: 'get',
        params: query
    })
}

export function baojingshuliang(query) {
    return request({
        url: '/api/manageWat/statistics/getAlarmsNumberByMonth',
        method: 'get',
        params: query
    })
}

export function baojingleibie(query) {
    return request({
        url: '/api/manageWat/statistics/getAlarmTotalByYear',
        method: 'get',
        params: query
    })
}

export function xuexiaobaojing(query) {
    return request({
        url: '/api/manageWat/statistics/getAlarmsArea',
        method: 'get',
        params: query
    })
}

export function quyubaojing(query) {
    return request({
        url: '/api/manageWat/statistics/getAlarmsAreaByRegion',
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