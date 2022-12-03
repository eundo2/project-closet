// 안씀
const express = require("express");
const router = express.Router();
var connection = require("./db");

// app.post("/", function (req, res) {
//     console.log(req.body);
  
//     let sql = "SELECT memberPW FROM members WHERE memberID=?";
//     connection.query(sql, req.body.username, function (err, results, fields) { 
//         if (err) {
//           console.log(err);
//           alert('에러');
//           throw err;
//         } else if(results[0].memberPW == req.body.password) {
//           console.log(results);
//           //토큰 어쩌구 인증 저쩌구
//           res.redirect("/closet");
//         }
//     });
// });
  
//   // 옷 등록(서버분이 추가수정)
//   app.post("/cloth/add", multer(multerConfig).single("img"), function (req, res) {
//     console.log(req.body);
//     // this.state = {
//     //   id: null,
//     //   category: '', //아우터 긴팔 반팔 긴바지 반바지 치마
//     //   color: '',
//     //   PicturePreview: '',
//     //   pictureAsFile: '',
  
//     //   submitted: false,
//     // };
//     console.log("received the request");
   
//   // 타입+컬러+패턴으로 올탑/바텀에서 옷코드 찾기
//   // >[있으면] 멤버코드(+상의라면 탑소트)+옷코드+타입+색상+패턴+이미지 insert into mycloth
//   // >[없으면] 타입+색상+패턴 insert into alltop/bottom 하고 옷코드 받아서 위와 동일
//   // 쿼리 밖으로 값 못들고 나오는것 같은데 안에서 쿼리안의 쿼리 해야할듯...
//     let sql;
//     let category = req.body.category;
//     if (category == "아우터"||category == "긴팔"||category == "반팔") {
//       sql = "SELECT * FROM alltops WHERE topType=? AND topColor=? AND topPattern=?";
//     } else { // 긴바지 반바지 치마
//       sql = "SELECT * FROM allbottoms WHERE bottomType=? AND bottomColor=? AND bottomPattern=?";
//     }
//     connection.query(sql, [req.body.category, req.body.color, req.body.pictureAsFile], function (err, results, fields) { 
//       if (err) {
//         console.log(err); // 조회결과가 없는건 에러가 아니란다
//         throw err;
//       } else if (results==[]){ // 그런옷 없다 찍어보면 []인데 왜 true가 아닌지... 여기 고쳐야함
//         console.log(results);
//         sql = "insert into cloths(topCode, topSort, topColor, topImage) values (?, ?, ?, ?);";
//       } else { // 에러 안나고 옷도 있음
//         console.log(results);
//     }});
//     res.send(req.body); // 문제 없으면 20n 보내?
//   });
  
//   // async function addCloth(){
//   //   let sql = "SELECT * FROM mycloth WHERE memberCode=? AND topSort='outer'"; // ??
//   //     connection.query(sql, req.id ,function(err, results, fields) { 
//   //       if (err) {
//   //         console.log(err);
//   //         throw err;
//   //       } else {
//   //         console.log(results);
//   //       }
//   // })}
  
  
//   // 옷(아우터,상의,하의) 조회 id필요
//   app.get("/cloth/outers", (req, res) => {
//     console.log(req.body);
  
//     var resCloth = [];
//     for (var i in req) {
//       let sql = "SELECT * FROM mycloth WHERE memberCode=? AND topSort='outer'"; // ??
//       connection.query(sql, req.id ,function(err, results, fields) { 
//         if (err) {
//           console.log(err);
//           throw err;
//         }
//         console.log(results);
//         resCloth[i] = {
//           id: results[i].memberCode,
//           category: results[i].topType,
//           color: results[i].topColor,
//           pictureAsFile: results[i].topPattern,
//         }
//       });
//     }
    
//     res.send(resCloth);
//   });
//   app.get("/cloth/tops", (req, res) => {
//     console.log(req.body);
    
//     var resCloth = [];
//     for (var i in req) {
//       let sql = "SELECT * FROM mycloth WHERE memberCode=? AND topSort='top'";
//       connection.query(sql, req.id ,function(err, results, fields) { 
//         if (err) {
//           console.log(err);
//           throw err;
//         }
//         console.log(results);
//         resCloth[i] = {
//           id: results[i].memberCode,
//           category: results[i].topType,
//           color: results[i].topColor,
//           pictureAsFile: results[i].topPattern,
//         }
//       });
//     }
    
//     res.send(resCloth);
//   });
//   app.get("/cloth/bottoms", (req, res) => {
//     console.log(req.body);
    
//     var resCloth = [];
//     for (var i in req) {
//       let sql = "SELECT * FROM mycloth WHERE memberCode=? AND bottomCode is not null";
//       connection.query(sql, req.id ,function(err, results, fields) { 
//         if (err) {
//           console.log(err);
//           throw err;
//         }
//         console.log(results);
//         resCloth[i] = {
//           id: results[i].memberCode,
//           category: results[i].topType,
//           color: results[i].topColor,
//           pictureAsFile: results[i].topPattern,
//         }
//       });
//     }
    
//     res.send(resCloth);
//   });
  
//   // 옷(아우터,상의,하의) 삭제 !리스트!로 들어온다
//   //deleteList는
//   // ['test-4', 'test-5']
//   // 이런식으로 삭제할 아이템의 아이디가 들어있는 배열임
//   // 현재 문제: 같은 옷이 여러벌이면 하나만날려도 다 삭제된다 어캄?
//   app.delete("/cloth/outers/:delete", (req, res) => {
//     console.log(req.body);
    
//     for (var i in req.body) {
//       tmp = [req.body.memberID, req.body.topCode];
//       let sql = "DELETE FROM mycloth WHERE memberCode=? AND topCode=?";
//       connection.query(sql, tmp, function (err, results, fields) { 
//           if (err) {
//               console.log(err);
//               throw err;
//           }
//           console.log(results);
//       });
//     }
  
//     res.send(req.body);
//   });
//   app.delete("/cloth/tops/:delete", (req, res) => {
//     console.log(req.body);
    
//     for (var i in req) {
//       tmp = [req.body.memberID, req.body.topCode];
//       let sql = "DELETE FROM mycloth WHERE memberCode=? AND topCode=?";
//       connection.query(sql, tmp, function (err, results, fields) { 
//           if (err) {
//               console.log(err);
//               throw err;
//             }
//           console.log(results);
//       });
//     }
    
//     res.send(req.body);
//   });
//   app.delete("/cloth/bottoms/:delete", (req, res) => {
//     console.log(req.body);
    
//     for (var i in req) {
//       tmp = [req.body.memberID, req.body.bottomCode];
//       let sql = "DELETE FROM mycloth WHERE memberCode=? AND bottomCode=?";
//       connection.query(sql, tmp, function (err, results, fields) { 
//           if (err) {
//               console.log(err);
//               throw err;
//           }
//           console.log(results);
//       });
//     }
    
//     res.send(req.body);
//   });

module.exports = router