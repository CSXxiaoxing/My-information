var mysql = require('mysql');
// 连接数据库
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'csx'
});

module.exports = {
    // 增
    Insert: function(tsql, collback){
        pool.query(tsql, function(error, result){
            if (error) throw error;
            callback(result)
        })
    },
    // 删
    delete: function(tsql, callback){
        pool.query(tsql, function(error, result){
            if (error) throw error;
            callback(result)
        })
    },
    // 查
    Select: function(tsql, callback){
        pool.query(tsql, function(error, _data){
            if (error) throw error;
            callback(_data)
        })
    },
    // 改
    Update: function(tsql, callback){
        pool.query(tsql, function(error, result){
            try {
                console.log(error)
                if (error) throw error
                else callback(true);
            } catch(e) {
                console.log(2)
                callback(false)
            }
        })
        // pool.query(tsql, function(error, result){
        //     if (error) throw error
        //     else callback(true);
        // })
    }
}

// pool.connect();
// //查询
// pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//     if (err) throw err;
//     console.log('The solution is: ', rows[0].solution);
// });
// //关闭连接
// pool.end();