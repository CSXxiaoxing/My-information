// 关于用户信息的ajax请求：中间件
let http = $Csx.http;

const Request = data => new Promise((resolve, reject) => {
    let param = {
        type: !data ? "Select" : "Update",
        uid : Request.prototype.uid
    }
    if (data) for(var tem in data) param[tem] = data[tem];
    
    http.post('/user', param).then( res => {
        if (res instanceof Array)
            if (res!=null && res.length>1) resolve(res)
            else resolve(res[0])
        else resolve(res)
    })
})

export default Request