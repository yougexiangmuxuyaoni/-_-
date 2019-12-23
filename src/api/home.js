import request from 'axios'
/*
头部通知 API
*/
window._cancel = [];
// 获取CancelToken
request.interceptors.request.use((config) => {
    config.cancelToken = new request.CancelToken(cancel => {
        window._cancel.push({ cancel })
    })
    // 在发送请求之前做些什么，例如加入token
    // config.headers['Authorization'] = "ASJID231";
    return config;

}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

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

export function gaibianTZzhuangtai(query) {
    return request({
        url: '/api/manageWat/supervision/updateAnnouncement',
        method: 'get',
        params: query
    })
}


export function gaibianJGzhuangtai(query) {
    return request({
        url: '/api/manageWat/supervision/updateopinion',
        method: 'get',
        params: query
    })
}

export function allSchools(query) {
    return request({
        url: '/api/manageWat/supervision/getSchoolName',
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