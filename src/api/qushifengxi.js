import request from 'axios'
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

export function xuexiaotongji() {
    let token = localStorage.getItem('token');
    return request({
        url: '/api/manageWat/school/getAnalysisSchoolData',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}
export function shitangxinxi() {
    let token = localStorage.getItem('token');
    return request({
        url: '/api/manageWat/school/getMesshallMessageByArea',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + token
        }
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

// export function baojingList(query) {
//     return request({
//         url: '/api/baojingList',
//         method: 'get',
//         params: query
//     })
// }