const mysql = require('mysql');  // mysql 모듈 로드 
//const { useCallback } = require('react');
//커넥션풀과 이거중에서 고민해보기 이것도 잘도는데...
const conn = {  // mysql 접속 설정
    host: 'localhost',
    // port: '3306',
    user: 'root',
    password: '135135',
    database: 'database_development'
};

// const pool = mysql.createPool({
//   connectionLimit: 10, // connection이 10개이하로 이루어질떄 pool에있는 connection을 a api이용할때 connection사용 b api 이용할때 2번째 connection 이용하고 1번째 connection반남
//   host: "localhost",
//   port: '3306',
//   user: "root",
//   password: "135135",
//   database: "database_development",
// });
// 
// function getConnection(callback) {
//     pool.getConnection(function (err, conn) {
//         if(!err){
//             useCallback(conn);
//         }
//     });
// }

let connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect(); //end가 어디에도 없는디 이게 왜 되지...? 안닫아도 돼?

module.exports = connection;
// module.exports = getConnection;
