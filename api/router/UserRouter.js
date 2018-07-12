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

            console.log(condition)

            sql[type]( condition, _Data => response.send(_Data) )
        });

        // get 请求
        app.get('/class',function(req,res) {
            var classId = `'${req.query.class}'`
            var condition = `select * from web where class=${classId}`;
            // console.log(req.query.class)
            // var url = req.query.url;
            // var name = req.query.name;
            // console.log(url, name);
            sql.select(condition, function(returnData){
                console.log(returnData)
                res.send(returnData);
            })
        });
    }


module.exports = {Register}