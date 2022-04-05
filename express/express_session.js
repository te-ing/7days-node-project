// 세션 정보 파일에 저장 npm i session-file-store
const express = require('express');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const app = express();

app.use(session({
  secret: 'secret key',// 암호화 할 때 쓰이는 키
  resave: false, // 변경사항이 없어도 항상 다시 저장할 지 여부
  saveUninitialized: true, // 초기화되지 않은 세션을 스토어에 강제로 저장할 지 여부
  cookie: { // 세션 쿠키 설정
    httpOnly: true, // true 설정 시  자바스크립트에서 document.cookie로 쿠키 정보를 볼 수 없음
    secure: true, // true 이면 https 환경에서만 쿠키 정보를 주고 받도록 처리
    maxAge: 60000 // 쿠키가 유지되는 시간 (ms)
  },
  store: new fileStore() // 세션 저장소로 fileStore 사용
}));

app.listen(3000, () => {
  console.log('3000번 포트로 서버를 실행했습니다.')
})

// 세션 정보 출력
app.get('/', (req, res, next) => {
  console.log(req.session);
  res.send(req.session);
});

// 로그인 요청 시 사용자 정보 확인 후 세션에 사용자 정보 저장
app.post('/login', (req, res, next) => {
  const { email, pw } = req.body.param;
  // 데이터베이스의 사용자 테이블에서 로그인 인증 처리 코드 작성
  // 사용자가 존재하면(로그인 성공 시)
  req.session.email = email; // 세션에 이메일 저장
  req.session.is_logined = true; // 세션에 로그인 여부 저장
  req.session.save(err => { // 세션 저장
    if (err) throw err;
    res.redirect('/home'); // 로그인 후 홈화면 이동  
  });
});

// 로그아웃 시 세션 삭제
app.post('/logout', (req, res, next) => {
  req.session.destroy(); // destroy() 함수를 사용하여 세션 삭제
  res.redirect('/login'); // 로그인 페이지로 이동
});

/* 서버 메모리에 세션 저장 npm i express-session
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'secret key',// 암호화 할 때 쓰이는 키
  resave: false, // 변경사항이 없어도 항상 다시 저장할 지 여부
  saveUninitialized: true, // 초기화되지 않은 세션을 스토어에 강제로 저장할 지 여부
  cookie: { // 세션 쿠키 설정
    httpOnly: true, // true 설정 시  자바스크립트에서 document.cookie로 쿠키 정보를 볼 수 없음
    secure: true, // true 이면 https 환경에서만 쿠키 정보를 주고 받도록 처리
    maxAge: 60000 // 쿠키가 유지되는 시간 (ms)
  }
}));

app.listen(3000, () => {
  console.log('3000번 포트로 서버를 실행했습니다.')
})
*/
