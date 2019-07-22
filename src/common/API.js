// var baseUrl = '/api'
var baseUrl = ''

// 登录
var login = baseUrl+'/login'

// 添加管理员
var addManage = baseUrl+'/addManage'
// 查询管理员
var findManage = baseUrl +'/findManage '
// 删除管理员
var delManage = baseUrl+'/delManage'
// 修改管理员
var updateManage  = baseUrl +'/updateManage'

// 添加用户
var addUser  = baseUrl+'/addUser'
// 查询用户
var findUser = baseUrl +'/findUser'
// 删除用户
var delUser = baseUrl+'/delUser'
// 修改用户
var updateUser  = baseUrl +'/updateUser'

// 添加通知
var addNews = baseUrl + '/addNews'
// 查询通知
var findNews = baseUrl +'/findNews'
// 删除通知
var delNews = baseUrl+'/delNews'
// 修改通知
var updateNews  = baseUrl +'/updateNews'

// 添加设备
var addDevice = baseUrl + '/addDevice'
// 查询设备
var findDevice = baseUrl +'/findDevice'
// 删除设备
var delDevice = baseUrl+'/delDevice'
// 修改设备
var updateDevice  = baseUrl +'/updateDevice'

// 退出登录
var exit = baseUrl +'/exit'
export default {
    login,
    addManage,
    findManage,
    delManage,
    updateManage,
    addUser,
    findUser,
    delUser,
    updateUser,
    addNews,
    findNews,
    delNews,
    updateNews,
    addDevice,
    findDevice,
    delDevice,
    updateDevice,
    exit
}