var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.json());
var msdata = require('./key.js');

var sql = require('mssql');
var config = {
    user: msdata.user,
    password: msdata.password,
    server: msdata.server,
    database: msdata.database,
    requestTimeout: 100000,
    port: msdata.port,
    options:{
        encrypt:false,
        enableArithAbort:true
    },
}

app.listen(1750,function(){
    console.log("API START");
});
//일반 쿼리 사용법
app.get('/tae/UserID=:id',function(req,res){
    var userID = req.params.id;
    sql.connect(config, err => {
        // ... error checks
       if(err){
         console.log(err);
       }
         //일반쿼리 사용법
         new sql.Request()
         .query("select * from Content where UserID="+userID, (err, result) => {
           // ... error checks
           if(err){
             console.log(err);
           }else{
             res.json(result.recordset);
           }
       })
    }); 
})

//저장프로시저
// app.get('/tae/UserID=:userID&Name=:name&Email=:email',function(req,res){
//     var userID = req.params.userID;
//     var name = req.params.name;
//     var email = req.params.email;
//     //null값이면은 URL오류나오니까 문자열null을 집어넣어서 null로 변환시킴
//     if(email=='null'){
//         email = null;
//     }
//     sql.connect(config, err => {
//         // ... error checks
//        if(err){
//          console.log(err);
//        }else{
//           //일반쿼리 사용법
//          let request = new sql.Request()
//          .input('TuserID',sql.NVarChar(10),userID)
//          .input('TName',sql.NVarChar(20),name)
//          .input('TEmail',sql.NVarChar(50),email)
//          .execute('SP_I_User',(err,result)=>{
//             // ... error checks
//             if(err){
//               return res.json(err)
//             }else{
//             return res.json(result.recordset)
//             }
//          })
//        } 
//     }); 
// });

app.post('/content',function(req,res){
    res.send("성공");
    console.log(req.body.userID);
    console.log(req.body.name);
    console.log(req.body.email);  
    sql.connect(config, err => {
        // ... error checks
       if(err){
         console.log(err);
       }else{
          //일반쿼리 사용법
         let request = new sql.Request()
         .input('TuserID',sql.NVarChar(10),req.body.userID)
         .input('TName',sql.NVarChar(20),req.body.name)
         .input('TEmail',sql.NVarChar(50),req.body.email)
         .execute('SP_I_User',(err,result)=>{
            // ... error checks
            if(err){
              console.log(err)
            }else{
            console.log(result.recordset)
            }
         })
       } 
    }); 
});