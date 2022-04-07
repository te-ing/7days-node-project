const mongoose = require("mongoose");
/** 여러 개의 데이터 베이스로 연결 할 시
const mongoose = require("mongoose");
const conn1 = mongoose.createConnection('mongodb://localhost/mydb1');
const conn2 = mongoose.createConnection('mongodb://localhost/mydb2');
*/
const connect = () => {
  if (process.env.NODE_ENV !== 'production') { // 운영 환경이 아닌 개발 환경일 때만
    mongoose.set('debug', true); // 콘솔에서 쿼리 내용을 확인할 수 있도록 디버그 모드 활성화
  }

  // mongodb: // [사용자이름]:[비밀번호]@호스트:포트번호/데이터베이스
  mongoose.connect('mongodb://root:1234@localhost:27017/admin', {
    dbName: 'dev'
  }, (error) => {
    if (error) {
      console.error('MongoDB 연결 에러', error);
    } else {
      console.log('MongoDB 연결 성공', 'localhost:27017/admin')
    }
  });
};

mongoose.connection.on('error', (error) => { // MongoDB 연결 시 에러가 있을 떄 발생하는 이벤트에 대한 리스너
  console.error('MongoDB 연결 에러', error);
})

mongoose.connection.on('disconnected', (error) => { // MongoDB 연결종료 시 발생하는 이벤트에 대한 리스너
  console.error('MongoDB 연결이 종료되어 연결을 재시도합니다.');
  connect();
})

module.exports = {
  connect
};