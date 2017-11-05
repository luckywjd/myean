//해당 폴더에 설치 되어 있는 express모듈을 가져옴
const express=require('express');
const port=80;
const mysql=require('mysql');
const dbInfo=require('./db_info.js');
const bdParse = require('body-parser');

var con=mysql.createConnection(dbInfo);

var expApp=express();
expApp.set("port",port);
expApp.use(bdParse.urlencoded({extended:false}));
expApp.use(bdParse.json());

expApp.get("/",function(req,res){ // get은 너가 요청한 주소, 요청한 주소의 응답값 두가지를 가지고있음 "/"이후에느 어떠한 응답값도 가지지 않음
    var id = req.query.id;
    console.log(id+' 를 요청하셨군요');
    res.send('안녕하세요~ ' + id + '님');
    //res.send('hello expree');

})
// var func1 =function(req,res){ 위에부분을 이렇게 사용할 수 있음
//     res.send('hell express');
// }
// expApp.get("/",func1);

expApp.get("/test",function(req,res){ // "/"는 루트 디렉토리
    res.send('나에게 테스트를 주었구나~?');
})
//expApp.get('/user',function(req,res){
    // con.query('select * from user_info',function(err,rows){
    //     if(err) throw err;
    //     console.log(rows);
    //     var resText="<table border='1'>";
    //     for(var key in rows){
    //         resText+="<tr>";
    //         var row=rows[key];
    //         for(var col in row){
    //             resText += "<td>"+col+":"+row[col]+"</td>";
    //         }
    //         resText +="</tr>";           
    //     }
    //     resText +="</table>";
    //     res.send(resText);        
    // })
//});

var urlForUserSerach="/user";
    // var userId=req.query.id;
    // if(!userId){
    //     res.send("검색할 유저 아이디를 입력해주세요.");
    // }else{
    // var sql='select * from user_info where userId=?';
    // var values=[userId];
var funcForUserList = function(req, res){
        var userId=req.query.id;
        var userPwd=req.query.pwd;
        var resText="";
        if(!userId){
            res.send("유저아이디를 입력해주세요");
        }else if(!userPwd){
            res.send("비밀번호를 입력해주세요");
        }else{
            var sql='select * from user_info where userId=?';
            var values=[userId];
            con.query(sql,values,function(err,rows){
                if(err)throw err;
                if(rows.length==0){
                    resText="입력하신 id:" +userId;
                    resText+="와 일치하는 id가 없습니다.";
                }else{
                    if(userPwd!=rows[0].userPwd){
                        resText="입력하신 비밀번호가 틀렸습니다.";
                    }else{
                        resText += userId+"님 환영합니다.";
                    }                   
                }
                if(err)throw err;
                res.send(resText);
            })
        }
   // } 
}
expApp.get(urlForUserSerach, funcForUserList);
expApp.post(urlForUserSerach, funcForUserList);
expApp.listen(expApp.get("port"));
