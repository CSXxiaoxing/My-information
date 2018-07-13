// 关于用户信息的ajax请求：中间件
import http from '../../utils/httpClient';

const Request = data => new Promise((resolve, reject) => {
    let param = {
        type: !data ? "Select" : "Update",
        uid : Request.prototype.uid
    }
    if (data) for(var tem in data) param[tem] = data[tem];
    
    
    
    console.log(param)

    http.post('/user', param).then( res => {
        console.log(res)
        if(res!=null && res.length>1) resolve(res)
        else resolve(res[0])
    })
})

export default Request