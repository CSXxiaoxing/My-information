const Register = $ => {
        const [app, sql] = [$.app, $.sql];
        // post请求--用户
        app.post("/user", function(request, response){
            let [body, condition] = [request.body, null];
            let [keys, type] = [`WHERE uid = ${body.uid}`, body.type];

            delete body.type;
            delete body.uid;

            if(type=="Select") // 查
                if(Object.keys(body).length == 0) condition = `select * from user `+keys
                else for (let key in body)
                if (condition) condition += `and key=${body[key]}`
                else condition = `select * from user `+keys;
            else{ // 改
                for (let key in body)
                if (condition) condition += `, ${key} = ${body[key]}`
                else condition = `UPDATE user SET ${key} = ${body[key]} `;
                condition+=keys;
            }

            sql[type]( condition, _Data => response.send(_Data) )
        });
    }


module.exports = {Register}