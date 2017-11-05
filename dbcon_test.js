const mysql = require('mysql');

const dbInfo={
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database:'ang2'
}
var connection=mysql.createConnection(dbInfo);
console.log("디비 접속 시작");
connection.connect(); //연결해서 요청한것

console.log("user_info select");
var id='ttt2';
var pwd='1';
var sql = "select * from user_info";
//sql += " where userid='" + id + "'"; 보안문제로 이렇게 사용하진 않음
sql += " where userid=? and userpwd=?"; //?표 값을 쓴만큼  밑에 파라메터 값을 추가해줘야 정상적으로 나옴
var values=[id,pwd];
// connection.query(sql,values,function(err, rows, fields){
//     if(!err){ 
//         console.log(rows);
//      }else{
//          console.log(err);
//      }
// });

sql="SELECT UI.*, UH.USERDATA";
sql+=" FROM USER_INFO AS UI,";
sql+=" USER_HIS AS UH";
sql+=" WHERE UI.USERNO=UH.USERNO";

var printRows = function(rows){
    if(rows.length==0){
        console.log("검색된 데이터가 없습니다");
    }else{
        for(var key in rows){
            var row=rows[key];
            for(var col in row){
                console.log("컬럼명:",col);
                console.log("데이터:",row[col]);
            }
            console.log("row=>"+row);
        }        
    }
}
connection.query(sql,function(err, rows, fields){
    if(!err){ 
        printRows(rows);
     }else{
         console.log(err);
     }
});


console.log("디비 종료");
connection.end();//연결 종료