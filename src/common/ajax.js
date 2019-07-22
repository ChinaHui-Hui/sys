//  封装   ajax
//  在最后要记得导出它

import Axios from 'axios'
// 当用 'POST'方式传参的时候，前端传参数了，但是后端可能接收不到---->解决的bug
// 首先安装 'qs'模块  npm i qs
// 然后使用  import qs from 'qs'  再然后通过  qs.stringify()转换它
import qs from 'qs'

function ajax(obj,url,method,params,success,error) {
    // obj: 因为是封装的函数，所以会改变this的指向，所以首先要传一个Vue对象

    // 有可能调接口的时候是"get",也有可能是"post",所以这个params是变量
    var requestParams = 'params';
    if(method.toUpperCase()=='POST'){ // 有可能写的时候是小写的post,为了以防万一通过这个方式都改成大写的
        requestParams='data'

        params = qs.stringify(params)
    }
    Axios({
        url:url,
        method:method,
        [requestParams]:params, // json中涉及到变量，要用[]表示，如果不这样，就会认为这个json中的key值就是requestParams，但其实他只是一个变量
    }).then(d=>{
        console.log('=============="+url+"===================')
        console.log(d)
        if(d.data.code == -1){  // 当未登录的时候的处理或者是手动清除了数据或者掉线了
            obj.$message({
                message:d.data.info,
                type:'warning'
            })
            obj.$router.replace('/login')
        }
        if(d.data.isok){  // 调用接口成功以后要做的事情----->一个函数
            success(d)
        }else{
            // 失败要做的事情--->一个函数
            error(d)
        }
    })
}

export default ajax