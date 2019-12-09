module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "0.0.0.0",
        disableHostCheck: true,
        port: '8863',
        https: false,   //是否使用https协议
        hotOnly: true, //是否开启热更新
        proxy: {
            '/api': {
                // target: 'http://172.31.15.115:9998', //徐
                target: 'http://112.125.25.93:9998', //航信服务器的地址
                // target: 'http://47.93.216.51:9998', //四川服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }, '/map': {
                target: 'https://geo.datav.aliyun.com', //地图
                changeOrigin: true,
                pathRewrite: {
                    '^/map': ''
                }
            }
        }
    }
}