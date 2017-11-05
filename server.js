//http 모듈을 가져옴
//npm install시 기본적으로 제공하는 모듈이 있고 
//package.json에 설정하거나 npm install 명령어로 외부 모듈을 설치하여
//사용할 수 도 있다.
var http= require('http'); //모듈단위로 만들때  가져올 수 있는
console.log('Server openning');

//req 요청객체
//res 응답객체
http.createServer(function(req,res){ // 서버를 만든다. (요청객채, 응답객체) req는 요청이기때문에 내가 마음대로 할 수 없다. 나는 서버단이기때문에
    res.writeHead(200,{'content-Type':'text/plain'}); //
    res.end('Hello http');

}).listen(3000); //포트 3000,6000,8080 등등  
console.log('Server running');
