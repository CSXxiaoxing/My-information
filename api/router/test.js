var bodyparser = require("body-parser");
var db = require("../MySQL.js");


module.exports = {
    Register: function(app){
        // 接收json请求
        app.use(bodyparser.json());
        // 解析utf-8
        app.use(bodyparser.urlencoded({ extended: false }));


        // demo确认增add{id: 1, idx: value值, name: 名, price: 99 , number: 数量, allprice: 总价}
        app.post("/menuadd", function(request, response){
          
            db.add(`insert into menuadd (idx, name, price, number, allprice, url,h2id) values('${request.body.idx}', '${request.body.name}', '${request.body.price}' ,'${request.body.number}' , '${request.body.allprice}', '${request.body.url}', '${request.body.h2id}')` , function(result){
                console.log(result)
            })
        })
        // 查询
        app.post("/Select", function(request, response){
          
            db.select('select * from data ',function(returnData){
                 // console.log(returnData)
                 response.send(returnData);
             })
        })

        // 房号查询
        app.post("/roomNumber", function(request, response){
            db.select(`select * from data where fCard = '${request.body.val}'`,function(returnData){
                console.log(returnData[0])
                 if(returnData[0] == undefined){
                    response.send(false);
                 }else {
                    response.send(true);
                 }
                 // response.send(returnData);
             })
        })


        // post请求--查
        app.post("/sel", function(request, response){
            // select 查询， from 找哪个库, test 库名 ， limit 查找条数 10条
            db.select('select * from room',function(returnData){
                // console.log(returnData)
                response.send(returnData);
            })
        });


        // 删
        app.post("/del", function(request, response){

            db.delete(`delete from menuadd where idx='${request.body.idx}'`, function(result){
                console.log(result)
            })
        })
        

        // 改
        app.post("/update", function(request, response){
            db.update("update test s et cost='3' where name='csx'" , function(result){
                console.log(result)
            })
        });
        
    }

}