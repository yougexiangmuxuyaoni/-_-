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
                // target: 'http://192.168.10.47:9998', //崔
                // target: 'http://192.168.10.46:9998', //徐
                // target: 'http://192.168.10.49:9998', //阳
                target: 'http://112.125.25.93:9998', //服务器API服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            // }, '/index': {
            //     target: 'http://localhost:8863', //本地API服务器的地址--崔
            //     //target: 'http://172.31.9.138:9998', //本地API服务器的地址--谢
            //     // target: 'http://112.125.25.93:9998', //服务器API服务器的地址
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/index': ''
            //     }
            }
        }
    }
}