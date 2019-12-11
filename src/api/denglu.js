import request from 'axios'
/*
登录 API
*/

export function xiugaimima(query) {
    console.log(query);

    return request({
        url: "/api/manageWat/statistics/upPasswordByid",
        method: 'get',
        params: query
    })
}


const scope = 'server'
export function denglu(userInfo) {
    const user = encryption({
        data: userInfo,
        key: 'thanks,pig4cloud',
        param: ['password']
    })
    const grant_type = 'password'
    return request({
        url: '/api/auth/oauth/token',
        method: 'post',
        headers: {
            isToken: false,
            'Authorization': 'Basic cGlnOnBpZw=='
        },
        params: { username: user.username, password: user.password, randomStr: user.randomStr, code: user.code, grant_type, scope }
    })
}

export const getUserInfo = () => {
    let token = localStorage.getItem('token');
    return request({
        url: '/api/admin/user/getUserInfo',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

/*加密
*/
function encryption(params) {
    let {
        data,
        type,
        param,
        key
    } = params
    const result = JSON.parse(JSON.stringify(data))
    if (type === 'Base64') {
        param.forEach(ele => {
            result[ele] = btoa(result[ele])
        })
    } else {
        param.forEach(ele => {
            var data = result[ele]
            key = CryptoJS.enc.Latin1.parse(key)
            var iv = key
            // 加密
            var encrypted = CryptoJS.AES.encrypt(
                data,
                key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.ZeroPadding
            })
            result[ele] = encrypted.toString()
        })
    }
    return result
}
