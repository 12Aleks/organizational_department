// module.exports = {
//     chainWebpack: config => {
//         config.module
//             .rule('downloads')
//             .test(/\.(pdf|docx?|xlsx?|csv|pptx?)(\?.*)?$/)
//             .use('file-loader')
//             .loader('file-loader')
//             .options({ name: 'downloads/[name].[hash:8].[ext]' })
//     }
// }
