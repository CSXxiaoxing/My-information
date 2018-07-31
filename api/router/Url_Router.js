const Register = $ => {
        const [app, sql] = [$.app, $.sql];
        // post请求--用户
        app.post("/text_url", function(request, response){
            let url = request.route.path.slice(1);
            let [body, condition] = [request.body, null];
            let [keys, type] = [body.uid ? `WHERE uid = ${body.uid}` : '', body.type ? body.type : 'Select'];

            delete body.type;
            delete body.uid;

            if(type=="Select") // 查
                if(Object.keys(body).length == 0) condition = `select * from ${url} `+keys
                else for (let key in body)
                if (condition) condition += `and key = '${body[key]}'`
                else condition = `select * from ${url} `+keys;
            else{ // 改
                for (let key in body)
                if (condition) condition += `, ${key} = '${body[key]}'`
                else condition = `UPDATE ${url} SET ${key} = '${body[key]}' `;
                condition+=keys;
            }
            console.log(condition)
            sql[type]( condition, _Data => response.send(_Data) )
        });
    }


module.exports = {Register}